import * as React from 'react'
import styles from './Page.styles'
import { CMSServices } from '@services'
import { FlatList, RefreshControl, View } from 'react-native'
import { Native } from '@utils'
import Tab from './components/Tab'
import Footer from './components/Footer'
import Empty from './components/Empty'
import TopicActivity from './components/TopicActivity/TopicActivity'
import Loading from '../../components/common/Loading'
import theme from '@theme'
import { RouteContext } from '@utils/contextes'
import { WindowWidth } from '@utils/global'
import { BaseObj } from '@common/typings'
import { placeholderHeadBanner } from '@const/resources'
import FastImage from 'react-native-fast-image'
import { formatFloors, Floor } from './utils'
import memoizeOne from 'memoize-one'
import AdSingle from '@components/business/Content/AdSingle'

interface Props {
  activityCode: string // 活动编码
  shopCode?: string
}

interface State {
  loading: boolean
  isFirst: boolean
  shopCode: string
  currentTabKey: string
  tabList: {
    key: string
    label: string
  }[]
  tabContentMap: {
    [tabKey: string]: Object[]
  }
  cart: {
    amount: number
    count: number
  }
  pageTitle: string
  hasHeadBanner: boolean
  tabVos: []
  type: number
  productCountMap: {
    [productCode: string]: number
  }
}

export default class Page extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      isFirst: true,
      shopCode: props.shopCode,
      currentTabKey: '',
      tabList: [],
      tabVos: [],
      type: 0,
      tabContentMap: {},
      cart: {
        amount: 0,
        count: 0,
      },
      pageTitle: '',
      hasHeadBanner: false,
      productCountMap: {},
    }
  }

  loadingRef = React.createRef()

  componentDidMount() {
    this.requestTabList()
    this.requestCartInfo()
  }

  requestCartInfo = async () => {
    const { shopCode } = this.state
    const { result = {} } = await CMSServices.getCartInfo(shopCode)
    this.setState({
      cart: {
        count: result.totalNum,
        amount: result.totalAmount,
      },
    })
  }

  requestTabList = async () => {
    const { activityCode: code } = this.props
    const { shopCode, isFirst } = this.state
    this.setState({ loading: true })
    isFirst ? this.loadingRef.current.showLoading() : ''
    let res
    try {
      res = await CMSServices.getActivity(code, shopCode)
    } finally {
      this.setState({ loading: false, isFirst: false })
      this.loadingRef.current.hideLoading()
    }

    const { result } = res
    let nextState = {
      currentTabKey: '',
      tabList: result.map(item => ({ key: item.id, label: item.showName })),
      tabContentMap: {},
      pageTitle: '优选商品',
      hasHeadBanner: false,
      productCountMap: {},
    }
    if (result.length > 0) {
      const tab = result[0]
      this.setState({
        tabVos: tab.templateVOList[0].tabVos,
        type: tab.templateVOList[0].type,
      })
      Native.setTitle(tab.pageName || '优选商品')
      nextState.pageTitle = tab.pageName || '优选商品'
      nextState.currentTabKey = tab.id
      const firstFloor = tab.templateVOList
        .sort((a, b) => a.pos - b.pos) // step 1: 排序
        .filter(
          // step 2: 过滤掉空数据
          ele =>
            ele.img ||
            (ele.tabVos && ele.tabVos.length > 0) ||
            (ele.templateDetailVOList && ele.templateDetailVOList.length > 0)
        )[0]
      nextState.tabContentMap = {
        [tab.id]: tab.templateVOList,
      }
      nextState.hasHeadBanner =
        result.length > 1 &&
        firstFloor &&
        firstFloor.type === 2 &&
        firstFloor.subType === 1
      nextState.productCountMap = this.productCountMapFormatter(
        tab.templateVOList
      )
    }
    this.setState(nextState)
  }

  requestTabContent = async tabKey => {
    const { shopCode } = this.state
    this.setState({ loading: true })
    let res
    try {
      res = await CMSServices.getFloorDataByTab(tabKey, shopCode)
    } finally {
      this.setState({ loading: false })
    }

    const { result } = res

    this.setState(
      ({ tabContentMap: preTabContentMap, tabList, productCountMap }) => ({
        tabContentMap: {
          ...preTabContentMap,
          [tabKey]: result.templateVOList,
        },
        productCountMap: {
          ...productCountMap,
          ...this.productCountMapFormatter(result.templateVOList),
        },
      })
    )
  }

  // 提取所有楼层中的商品数量数据
  productCountMapFormatter = (data: BaseObj[]) => {
    let productCountMap: { [productCode: string]: number } = {}
    data.forEach(floorData => {
      if ([3, 8, 9].indexOf(floorData.type) > -1) {
        ;(floorData.templateDetailVOList || []).forEach(product => {
          productCountMap[product.code] = product.productNum || 0
        })
      }
    })
    return productCountMap
  }

  onTabChange = key => {
    const { currentTabKey, tabContentMap } = this.state
    if (key === currentTabKey) return

    this.setState({ currentTabKey: key })
    !tabContentMap[key] && this.requestTabContent(key)
  }

  onProductCountChange = (count, productCode) => {
    this.setState(({ productCountMap }) => ({
      productCountMap: {
        ...productCountMap,
        [productCode]: count,
      },
    }))
    this.requestCartInfo()
  }

  // 将楼层数据映射为楼层组件
  flatDataFormatter = memoizeOne(
    (
      shopCode,
      tabList,
      currentTabKey,
      tabContentMap,
      hasHeadBanner,
      productCountMap
    ): Floor[] => {
      const currentTabData = tabContentMap[currentTabKey] || []

      const currentTabContent = formatFloors(
        currentTabData,
        tabList.length > 1,
        shopCode,
        this.onProductCountChange,
        productCountMap
      )

      if (tabList.length > 1) {
        const tabComp = {
          key: '$$tab',
          component: Tab,
          props: {
            data: tabList,
            currentActive: currentTabKey,
            onTabChange: this.onTabChange,
          },
        }
        return hasHeadBanner
          ? [
              ...(currentTabContent.length > 0 &&
              currentTabContent[0] &&
              currentTabContent[0].component === AdSingle
                ? currentTabContent.slice(0, 1)
                : [
                    {
                      key: '$$defaultHeadBanner',
                      component: FastImage,
                      props: {
                        source: placeholderHeadBanner,
                        style: {
                          width: WindowWidth,
                          height: WindowWidth / (375 / 144),
                        },
                        resizeMode: 'contain',
                      },
                    },
                  ]),
              tabComp,
              ...currentTabContent.slice(1),
            ]
          : [tabComp, ...currentTabContent]
      }
      return currentTabContent
    }
  )

  renderFlatItem = ({ item: { component: Comp, props } }: { item: Floor }) => (
    <Comp {...props} />
  )

  render() {
    const { shopCode } = this.props
    const {
      cart: { amount, count },
      loading,
      pageTitle,
      type,
      tabVos,
      currentTabKey,
      tabList,
      tabContentMap,
      hasHeadBanner,
      productCountMap,
    } = this.state
    const flatData = this.flatDataFormatter(
      shopCode,
      tabList,
      currentTabKey,
      tabContentMap,
      hasHeadBanner,
      productCountMap
    )
    const stickyHeaderIndices = flatData.findIndex(ele => ele.component === Tab)

    return (
      <RouteContext.Provider value={{ path: '活动页', name: pageTitle }}>
        <View style={styles.container}>
          {type === 9 ? ( //type:9 酒专题 不走FlatList
            <View style={styles.flatList}>
              {tabVos && tabVos.length > 0 ? (
                <TopicActivity
                  type={type}
                  shopCode={this.state.shopCode}
                  afterModifyCount={this.requestCartInfo}
                  currentTabVos={tabVos}
                />
              ) : (
                <Empty type={1} textColor1="#4A4A4A" textColor2="#A4A4B4" />
              )}
            </View>
          ) : (
            <FlatList
              style={styles.flatList}
              data={flatData}
              renderItem={this.renderFlatItem}
              keyExtractor={item => `${item.key}`}
              removeClippedSubviews={false}
              stickyHeaderIndices={
                stickyHeaderIndices === -1 ? [] : [stickyHeaderIndices]
              }
              refreshControl={
                <RefreshControl
                  refreshing={loading && flatData.length > 0}
                  onRefresh={this.componentDidMount.bind(this)}
                  colors={[theme.refreshColor]}
                  tintColor={theme.refreshColor}
                />
              }
              ListEmptyComponent={
                loading ? null : (
                  <Empty type={1} textColor1="#4A4A4A" textColor2="#A4A4B4" />
                )
              }
            />
          )}
          <View style={styles.footerBox}>
            <Footer amount={amount} cartCount={count} />
          </View>
          <Loading ref={this.loadingRef} />
        </View>
      </RouteContext.Provider>
    )
  }
}
