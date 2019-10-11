/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {ActivityIndicator, Image, RefreshControl, View} from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
import StickyContainer from 'recyclerlistview/sticky';
import {CMSServices, LimitTimeBuyServices} from "@services";
import {bannerLimitTimeBuy} from "@const/resources";
import TabBar from "./TabBar";
import Timer from "./Timer";
import styles from "./LimitTimeBuyScene.styles";
import theme from "@theme";
import {LimitTimeBuyStatus, Product} from "@components/business/Content/typings";
import {Global, Native} from "@utils";
import ProductLimitTimeBuy from "@components/business/ProductLimitTimeBuy";
import isEqual from 'lodash/isEqual'
import { Tab } from "./Typings";

const WindowWidth = Global.WindowWidth
const BannerHeight = WindowWidth * 150 / 375

const ProductItem = React.memo(ProductLimitTimeBuy, isEqual)

enum ViewTypes {
  Banner = 'banner',
  Tab = 'tab',
  Timer = 'timer',
  Product = 'product',
}

interface Props {
  paddingTop?: number
  shopCode: string // 门店编码
  afterAddCart?: (count: number) => void
  onAllExpired?: () => void // 所有活动均结束
}

interface State {
  tabs: Tab[] // 限时活动场次列表
  products: Product[][] // 每个场次下的活动商品列表，下标关联到 tab
  loading: boolean
  dataProvider: DataProvider
  currentTabIndex: number
  productCountInCart: {
    [code: string]: number
  }
}

export default class LimitTimeBuyScene extends React.Component<Props, State> {
  static defaultProps = {
    paddingTop: 0,
  }

  state = {
    loading: false,
    tabs: [],
    products: [],
    dataProvider: new DataProvider((r1, r2) => r1 !== r2)
      .cloneWithRows([ {type: ViewTypes.Banner} ]),
    currentTabIndex: 0,
    productCountInCart: {},
  }

  layoutProvider = new LayoutProvider(
    index => {
      switch (index) {
        case 0:
          return ViewTypes.Banner
        case 1:
          return ViewTypes.Tab
        case 2:
          return ViewTypes.Timer
        default:
          return ViewTypes.Product
      }
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.Banner:
          dim.width = WindowWidth
          dim.height = BannerHeight
          break
        case ViewTypes.Tab:
          dim.width = WindowWidth
          dim.height = 55
          break
        case ViewTypes.Timer:
          dim.width = WindowWidth
          dim.height = 62
          break
        case ViewTypes.Product:
        default:
          dim.width = WindowWidth
          dim.height = 125
          break
      }
    }
  )
  timer = null // 计时器
  removeCartChangeListener: Function

  async componentDidMount() {
    const { shopCode } = this.props
    if (shopCode) {
      this.init(shopCode)
    }

    this.removeCartChangeListener = Native.onNativeEvent(
      'notifyRefreshCartNum',
      () => this.init(shopCode)
    )
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (nextProps.shopCode !== this.props.shopCode) {
      this.init(nextProps.shopCode)
    }
  }

  componentWillUnmount(): void {
    if (this.timer) clearInterval(this.timer)
    this.removeCartChangeListener()
  }

  init = async (shopCode) => {
    const [tabs, productsUnderEachTab] = await this.requestActivityList(shopCode)
    const d = tabs.length === 0
      ? [ null ]
      : [ null, { tabs, currentActiveIndex: 0 }, { start: tabs[0].start, end: tabs[0].end }, ...(productsUnderEachTab[0] || []) ]
    const productCountInCart = productsUnderEachTab.reduce((acc, cur) => ({
      ...acc,
      ...cur.map(ele => ({ [ele.code]: ele.count }))
    }), {})

    this.setState(({dataProvider}) => ({
      tabs,
      currentTabIndex: 0,
      products: productsUnderEachTab,
      dataProvider: dataProvider.cloneWithRows(d),
      productCountInCart,
    }))

    if (tabs.findIndex(ele => ele.status !== LimitTimeBuyStatus.Expired) > -1) {
      this.startTimer()
    } else {
      this.props.onAllExpired && this.props.onAllExpired()
    }
  }

  // 获取活动数据并格式化返回数据
  requestActivityList = async (shopCode: string):Promise<[Tab[], Product[][]]> => {
    this.setState({ loading: true })
    let res
    try {
      res = await LimitTimeBuyServices.getActivityList(shopCode)
    } finally {
      this.setState({ loading: false })
    }
    const { result = [] } = res
    const now = Date.now()
    // 格式化返回的数据：[场次列表, 每个场次下的商品列表]，[[tabObj, tabObj, ...], [[productObj, productObj, ...], ...]]
    return result.reduce(([tabs, productsUnderTab], cur) => {
      const start = Number(cur.activityBeginTime)
      const end = Number(cur.activityEndTime)
      const status =
        now < start ? LimitTimeBuyStatus.Pending
        : now < end ? LimitTimeBuyStatus.Progressing
        : LimitTimeBuyStatus.Expired

      return [
        [...tabs, { start, end, status, }],
        [...productsUnderTab, cur.products.map(product => {
          const remarkOptions = (product.resProdcutNoteNewVO || { noteContentName: [] }).noteContentName
          const remarks = remarkOptions.sort((a, b) => a.isDefault ? -1 : 1).map(ele => ele.name)
          const [priceTags, productTags] = CMSServices.groupTags(product.labelList || [])

          return {
            cartId: product.cartId,
            code: product.productCode,
            thumbnail: product.productPic,
            name: product.productName,
            desc: product.subTitle,
            productTags,
            priceTags,
            spec: product.unit,
            price: product.discountPrice,
            slashedPrice: product.productPrice,
            count: product.productNum,
            shopCode: shopCode,
            remark: product.remark,
            remarks,
            inventoryPercentage: product.inventoryProgressBar,
            activityStatus: status,
            inventoryLabel: product.inventoryProgressBar === 0 ? '补货中' : ''
          }
        })]
      ]
    }, [[], []])
  }

  startTimer = () => {
    if (this.timer) clearInterval(this.timer)

    this.timer = setInterval(() => {
      const now = Date.now()
      const { tabs } = this.state
      const nextTabs = tabs.map(ele => ({
        ...ele,
        status:
          now < ele.start ? LimitTimeBuyStatus.Pending
          : now < ele.end ? LimitTimeBuyStatus.Progressing
          : LimitTimeBuyStatus.Expired,
      }))
      if (!isEqual(tabs, nextTabs)) {
        this.setState(({currentTabIndex, products, dataProvider}) => ({
          dataProvider: dataProvider.cloneWithRows([
            null,
            { tabs: nextTabs, currentActiveIndex: currentTabIndex },
            nextTabs[currentTabIndex],
            ...(products[currentTabIndex] || []).map(ele => ({...ele, activityStatus: nextTabs[currentTabIndex].status}))
          ]),
        }))
      }
      if (!nextTabs.find(ele => ele.status !== LimitTimeBuyStatus.Expired)) {
        this.props.onAllExpired && this.props.onAllExpired()
        clearInterval(this.timer)
      }
    }, 1000)
  }

  onTabIndexChange = (index:number) => {
    this.setState(({tabs, products, dataProvider, productCountInCart}) => ({
      currentTabIndex: index,
      dataProvider: dataProvider.cloneWithRows([
        null,
        { tabs, currentActiveIndex: index },
        tabs[index],
        ...(products[index] || []).map(ele => ({ ...ele, count: productCountInCart[ele.code] || 0 }))
      ]),
    }))
  }

  // 当前活动状态变化
  onCurrentActivityStatusChange = (preStatus, status) => {
    if (status === LimitTimeBuyStatus.Expired) {
      this.init(this.props.shopCode)
    }
  }

  onProductCartCountChange = (product, count) => {
    const {afterAddCart} = this.props

    this.setState(({productCountInCart}) => ({
      productCountInCart: {
        ...productCountInCart,
        [product.code]: count,
      }
    }))
    afterAddCart && afterAddCart(count)
  }


  rowRenderer = (type, data, index) => {
    switch (type) {
      case ViewTypes.Banner:
        return <Image style={{ width: '100%', height: BannerHeight }} source={bannerLimitTimeBuy} />
      case ViewTypes.Tab:
        return (
          <View style={styles.tabBox}>
            <TabBar
              tabs={data.tabs}
              currentActiveIndex={data.currentActiveIndex}
              onIndexChange={this.onTabIndexChange}
            />
          </View>
        )
      case ViewTypes.Timer:
        return (
          <View style={styles.timerBox}>
            <Timer start={data.start} end={data.end} />
            <View style={styles.timerBoxDivider} />
          </View>
        )
      case ViewTypes.Product:
        return (
          <View style={styles.productListItem}>
            <ProductItem {...data} thumbnailSize={75} afterModifyCount={c => this.onProductCartCountChange(data, c)} />
            {index > 3 && <View style={styles.productDivider} />}
          </View>
        )
    }
  }

  render() {
    const { paddingTop, shopCode } = this.props
    const { dataProvider, loading, tabs } = this.state

    return (
      <View style={styles.container}>
        {loading && tabs.length === 0 && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        )}

        <StickyContainer stickyHeaderIndices={[1]}>
          <RecyclerListView
            style={{ ...styles.productList }}
            scrollViewProps={{
              contentContainerStyle: { paddingTop },
              refreshControl: (
                <RefreshControl
                  refreshing={loading && tabs.length > 0}
                  onRefresh={() => this.init(shopCode)}
                  colors={[theme.primary, theme.white]}
                  tintColor={theme.primary}
                  progressViewOffset={paddingTop}
                />
              )
            }}
            dataProvider={dataProvider}
            rowRenderer={this.rowRenderer}
            layoutProvider={this.layoutProvider}
          />
        </StickyContainer>
      </View>
    )
  }
}