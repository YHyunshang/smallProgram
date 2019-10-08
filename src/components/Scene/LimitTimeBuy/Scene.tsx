/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {ActivityIndicator, Dimensions, Image, View} from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
import {CMSServices, LimitTimeBuyServices} from "@services";
import {bannerLimitTimeBuy} from "@const/resources";
import TabBar from "./TabBar";
import Timer from "@components/business/Content/LimitTimeBuy/Timer";
import styles from "./Scene.styles";
import theme from "@theme";
import {LimitTimeBuyStatus, Product} from "@components/business/Content/typings";
import {Global} from "@utils";
import ProductLimitTimeBuy from "@components/business/ProductLimitTimeBuy";
import isEqual from 'lodash/isEqual'

const WindowWidth = Global.WindowWidth
const BannerHeight = WindowWidth * 150 / 375

enum ViewTypes {
  Banner = 'banner',
  Tab = 'tab',
  Timer = 'timer',
  Product = 'product',
}

interface Props {
  paddingTop?: number
  shopCode: string // 门店编码
}

interface State {
  tabs: object[] // 限时活动场次列表
  products: object[][] // 每个场次下的活动商品列表，下标关联到 tab
  loading: boolean
  dataProvider: DataProvider
  currentTabIndex: number
}

export default class Scene extends React.Component<Props, State> {
  state = {
    loading: false,
    tabs: [],
    products: [],
    dataProvider: new DataProvider((r1, r2) => r1 !== r2)
      .cloneWithRows([ {type: ViewTypes.Banner} ]),
    currentTabIndex: 0,
  }

  defaultProps = {
    paddingTop: 0,
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

  async componentDidMount() {
    const { shopCode } = this.props
    if (shopCode) {
      this.init(shopCode)
    }
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (nextProps.shopCode !== this.props.shopCode) {
      this.init(nextProps.shopCode)
    }
  }

  componentWillUnmount(): void {
    if (this.timer) clearInterval(this.timer)
  }

  init = async (shopCode) => {
    const [tabs, productsUnderEachTab] = await this.requestActivityList(shopCode)
    this.setState(({dataProvider}) => ({
      tabs,
      currentTabIndex: 0,
      products: productsUnderEachTab,
      dataProvider: dataProvider.cloneWithRows([
        { type: ViewTypes.Banner },
        { type: ViewTypes.Tab },
        { Type: ViewTypes.Timer },
        ...(productsUnderEachTab[0] || [])
      ]),
    }))

    if (tabs.findIndex(ele => ele.status !== LimitTimeBuyStatus.Pending)) {
      this.startTimer()
    }
  }

  // 获取活动数据并格式化返回数据
  requestActivityList = async (shopCode: string):Promise<[object[], Product[][]]> => {
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
      if (!isEqual(tabs, nextTabs)) this.setState(({currentTabIndex, products, dataProvider }) => ({
        dataProvider: dataProvider.cloneWithRows([
          { type: ViewTypes.Banner },
          { type: ViewTypes.Tab },
          { Type: ViewTypes.Timer },
          ...(products[currentTabIndex] || []).map(ele => ({...ele, activityStatus: tabs[currentTabIndex].status}))
        ]),
      }))
      if (Math.max(...tabs.map(ele => ele.end), now) === now) {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  onTabIndexChange = (index:number) => {
    this.setState(({tabs, products, dataProvider}) => ({
      currentTabIndex: index,
      dataProvider: dataProvider.cloneWithRows([
        { type: ViewTypes.Banner },
        { type: ViewTypes.Tab },
        { Type: ViewTypes.Timer },
        ...(products[index] || [])
      ]),
    }))
  }

  rowRenderer = (type, data) => {
    const {tabs, currentTabIndex} = this.state
    const currentTab = tabs[currentTabIndex]

    switch (type) {
      case ViewTypes.Banner:
        return <Image style={{ width: '100%', height: BannerHeight }} source={bannerLimitTimeBuy} />
      case ViewTypes.Tab:
        return (
          <View style={styles.tabBox}>
            <TabBar
              tabs={tabs}
              currentActiveIndex={currentTabIndex}
              onIndexChange={this.onTabIndexChange}
            />
          </View>
        )
      case ViewTypes.Timer:
        return (
          <View style={styles.timerBox}>
            <Timer start={currentTab.start} end={currentTab.end} />
            <View style={styles.timerBoxDivider} />
          </View>
        )
      case ViewTypes.Product:
        return (
          <View style={styles.productListItem}>
            <ProductLimitTimeBuy {...data} />
            <View style={styles.productDivider} />
          </View>
        )
    }
  }

  render() {
    const { paddingTop } = this.props
    const { dataProvider, loading } = this.state

    return (
      <View style={styles.container}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        )}

        <RecyclerListView
          style={{ ...styles.productList }}
          scrollViewProps={{contentContainerStyle: { paddingTop }}}
          dataProvider={dataProvider}
          rowRenderer={this.rowRenderer}
          layoutProvider={this.layoutProvider}
        />
      </View>
    )
  }
}