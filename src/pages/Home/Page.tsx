/**
 * Created by 李华良 on 2019-07-23
 */
import * as React from 'react'
import { View, Animated, FlatList, Dimensions } from 'react-native'
import { CMSServices, ProductServices } from '@services'
import { Native } from '@utils'
import styles from './Page.styles'
import Carousel from '@components/business/Content/Carousel'
import Ad1v2 from '@components/business/Content/Ad1v2'
import Ad1v1 from '@components/business/Content/Ad1v1'
import AdSingle from '@components/business/Content/AdSingle'
import Divider from '@components/business/Content/Divider'
import Box from '@components/business/Content/Box'
import ProductList from '@components/business/Content/ProductList'
import ProductGrid from '@components/business/Content/ProductGrid'
import ProductSwiper from '@components/business/Content/ProductSwiper'
import ProductSwiperWithBg from '@components/business/Content/ProductSwiperWithBg'
import ProductListWithFilter from './components/ProductListWithFilter'
import { TabView } from 'react-native-tab-view'
import TabBar from './components/TabBar'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const placeholderForNativeHeight = Native.getStatusBarHeight() + 86 + 34

enum PageType {
  HOME = 'home',
  ACTIVITY = 'activity',
}

interface Props {}

interface State {
  loading: boolean // 加载中
  shop: {
    code: string
    type: string
  }
  currentTabIdx: number // 当前激活的 tab index
  tabList: {}[] // tab 列表
  tabFloorMap: {
    // tab key - cms 数据映射
    [tabId: string]: {}
  }
  tabLoadingMap: {
    // tab 下数据是否在加载中
    [tabId: string]: boolean
  }
  animatedValRefCmsScrollY: Animated.AnimatedValue
}

class Page extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  }

  state = {
    loading: false,
    shop: {
      code: '',
      type: '',
    },
    currentTabIdx: 0,
    tabList: [],
    tabFloorMap: {},
    tabLoadingMap: {},
    animatedValRefCmsScrollY: new Animated.Value(0),
  }

  nativeSubscription: { remove: Function }

  async componentDidMount() {
    this.init()
  }

  componentWillUnmount(): void {
    this.nativeSubscription && this.nativeSubscription.remove()
  }

  // 首页 CMS 初始化
  async init() {
    let { shop } = this.state
    if (!shop.code || !shop.type) {
      const [shopCode, shopType] = await Promise.all([
        Native.getConstant('storeCode'),
        Native.getConstant('storeTypeCode'),
      ])
      this.setState({ shop: { code: shopCode, type: shopType } })
      this.requestTabData(shopCode, shopType)
    } else {
      this.requestTabData(shop.code, shop.type)
    }

    // 门店变化 native 事件监听
    this.nativeSubscription = CMSServices.subscriptShopChange(
      this.onNativeShopChange
    )
  }

  // 门店变化
  onNativeShopChange = ({ storeCode, storeTypeCode }) => {
    const { shop } = this.state
    if (storeCode !== shop.code || storeTypeCode !== shop.type) {
      this.setState({ shop: { code: storeCode, type: storeTypeCode } })
      this.requestTabData(storeCode, storeTypeCode)
    }
  }

  // 获取初始 CMS 数据
  requestTabData = async (shopCode: string, shopType = '001') => {
    this.setState({ loading: true })
    let data: {}[]
    try {
      data = await Promise.all([
        CMSServices.getHomeTabs(shopCode).then(({ result }) => result),
        ProductServices.getCategory(shopCode, shopType).then(
          ({ result }) => result
        ),
      ])
    } finally {
      this.setState({ loading: false })
    }

    const [cmsTabs, categories] = data
    const tabList = [
      ...cmsTabs.map(ele => ({
        id: ele.id,
        showName: ele.showName,
        type: 'cms',
      })),
      ...categories.map(ele => ({
        id: ele.categoryCode,
        showName: ele.categoryName,
        type: 'category',
      })),
    ]

    this.setState(preState => ({
      currentTabIdx: 0,
      tabList,
      tabFloorMap: {
        ...preState.tabFloorMap,
        ...(cmsTabs.length > 0
          ? { [cmsTabs[0].id]: this.formatFloorData(cmsTabs[0].templateVOList) }
          : {}),
      },
      tabLoadingMap: {
        ...preState.tabLoadingMap,
        ...(cmsTabs.length > 0 ? { [cmsTabs[0].id]: false } : {}),
      },
    }))
  }
  // 获取 tab 下的 CMS 数据
  requestFloorData = async tabId => {
    this.setState(({ tabLoadingMap }) => ({
      tabLoadingMap: { ...tabLoadingMap, [tabId]: true },
    }))

    let data
    try {
      data = await CMSServices.getFloorDataByTab(tabId, this.state.shopCode)
    } finally {
      this.setState(({ tabLoadingMap }) => ({
        tabLoadingMap: { ...tabLoadingMap, [tabId]: false },
      }))
    }

    const { result } = data
    if (result) {
      this.setState(({ tabFloorMap }) => ({
        tabFloorMap: {
          ...tabFloorMap,
          [tabId]: this.formatFloorData(result.templateVOList),
        },
      }))
    }
  }
  // 获取 top 分类下的数据
  requestCategoryContentData = async categoryCode => {
    const { shop } = this.state
    const { result: cateResult } = await ProductServices.getCategory(
      shop.code,
      shop.type,
      categoryCode
    )
    const categories = cateResult.map(ele => ({
      key: ele.categoryCode,
      image: ele.categoryImage,
      title: ele.categoryName,
      link: {
        type: 1,
        uri: 'A002,A002',
        params: { params: { code: categoryCode } },
      },
    }))

    this.setState(({ tabFloorMap }) => ({
      tabFloorMap: {
        ...tabFloorMap,
        [categoryCode]: [
          {
            key: '$$category-box',
            component: Box,
            wrapperStyle: { marginBottom: 15 },
            props: { data: categories, columnNumber: 5 },
          },
          {
            key: '$$product-list-with-filter',
            component: ProductListWithFilter,
            props: { categoryCode, shopCode: shop.code },
          },
        ],
      },
    }))
  }

  formatFloorData = data => {
    let sortedData = data
      .sort((a, b) => a.pos - b.pos) // step 1: 排序
      .filter(
        // step 2: 过滤掉空数据
        ele =>
          ele.img ||
          (ele.templateDetailVOList && ele.templateDetailVOList.length > 0)
      )

    // step 3: 整合成组件
    const {
      currentTabIdx,
      shop: { code: shopCode },
    } = this.state
    let result = []
    let i = 0
    let length = sortedData.length
    while (i < length) {
      let floor = sortedData[i]
      if (floor.type === 1) {
        // 轮播图
        result.push({
          key: floor.id,
          component: Carousel,
          wrapperStyle: { paddingHorizontal: 0 },
          props: {
            imageHeight: currentTabIdx === 0 ? 290 : 150,
            data: floor.templateDetailVOList.map(ele => ({
              key: ele.id,
              image: ele.imgUrl,
              link: CMSServices.formatLink(ele),
            })),
          },
        })
      } else if (floor.type === 2) {
        // 广告图
        if (floor.subType === 1) {
          // 单张广告图
          const imgObj = floor.templateDetailVOList[0]
          const nextFloor = sortedData[i + 1]
          // 首页第一个 tab：单张广告图 + 商品横向滑动 则 合并为合成组件
          if (
            imgObj.name === '半包图' &&
            nextFloor &&
            nextFloor.type === 3 &&
            nextFloor.subType === 4
          ) {
            result.push({
              key: `c-${floor.id}&${nextFloor.id}`,
              component: ProductSwiperWithBg,
              wrapperStyle: { paddingHorizontal: 0 },
              props: {
                backgroundImage: imgObj.imgUrl,
                products: nextFloor.templateDetailVOList.map(ele => ({
                  ...CMSServices.formatProduct(ele),
                  shopCode,
                })),
              },
            })
            i += 2
            continue
          }
          result.push({
            key: floor.id,
            component: AdSingle,
            wrapperStyle: { paddingHorizontal: currentTabIdx === 0 ? 10 : 0 },
            props: {
              image: imgObj.imgUrl,
              link: CMSServices.formatLink(imgObj),
            },
          })
        } else if (floor.subType === 2) {
          // 1v2
          result.push({
            key: floor.id,
            component: Ad1v2,
            wrapperStyle: { paddingHorizontal: currentTabIdx === 0 ? 10 : 0 },
            props: {
              data: (floor.templateDetailVOList || []).map(ele => ({
                image: ele.imgUrl,
                link: CMSServices.formatLink(ele),
              })),
            },
          })
        } else if (floor.subType === 3) {
          // 1v1
          result.push({
            key: floor.id,
            component: Ad1v1,
            wrapperStyle: { paddingHorizontal: currentTabIdx === 0 ? 10 : 0 },
            props: {
              data: floor.templateDetailVOList.slice(0, 2).map(ele => ({
                image: ele.imgUrl,
                link: CMSServices.formatLink(ele),
              })),
            },
          })
        }
      } else if (floor.type === 3) {
        // 商品
        const component = {
          1: ProductList,
          2: ProductGrid,
          3: ProductGrid,
          4: ProductSwiper,
        }[floor.subType]
        if (component)
          result.push({
            key: floor.id,
            component,
            wrapperStyle: { paddingHorizontal: 0 },
            props: {
              products: floor.templateDetailVOList.map(ele => ({
                ...CMSServices.formatProduct(ele),
                shopCode,
              })),
              columnNumber:
                floor.subType === 2 ? 2 : floor.subType === 3 ? 3 : undefined,
            },
          })
      } else if (floor.type === 4 && [1, 2].indexOf(floor.subType) !== -1) {
        // 分类入口，宫格
        result.push({
          key: floor.id,
          component: Box,
          wrapperStyle: { paddingHorizontal: 5 },
          props: {
            columnNumber: { 1: 4, 2: 5 }[floor.subType],
            data: floor.templateDetailVOList.map(ele => ({
              key: ele.id,
              image: ele.imgUrl,
              title: ele.name,
              link: CMSServices.formatLink(ele),
            })),
          },
        })
      } else if (floor.type === 5) {
        // 分割图
        result.push({
          key: floor.id,
          component: Divider,
          wrapperStyle: { paddingHorizontal: 0 },
          props: {
            image: floor.img,
          },
        })
      }
      i++
    }
    return result
  }

  // 页面滚动
  onPageScroll = ({
    nativeEvent: {
      contentOffset: { x, y },
    },
  }) => {
    CMSServices.pushScrollToNative(x, y)
  }

  onTabIndexChange = idx => {
    this.setState({ currentTabIdx: idx }, () => {
      Native.setHomeFirstTabActiveStatus(idx === 0)
    })
    const { tabList, tabFloorMap } = this.state
    const currentTab = tabList[idx]
    if (currentTab && (tabFloorMap[currentTab.id] || []).length === 0) {
      const fn = {
        cms: this.requestFloorData,
        category: this.requestCategoryContentData,
      }[currentTab.type]
      fn(currentTab.id)
    }
  }

  renderFlatItem = ({ item: { wrapperStyle, component, props } }) => (
    <View style={wrapperStyle}>{React.createElement(component, props)}</View>
  )

  renderScene = ({ route }) => {
    const {
      tabList,
      tabFloorMap,
      tabLoadingMap,
      animatedValRefCmsScrollY,
    } = this.state

    const { key: tabId } = route
    const routeIndex = tabList.findIndex(ele => ele.id === tabId)

    const flatListStyles = {
      paddingTop: routeIndex === 0 ? 0 : placeholderForNativeHeight,
    }

    const onRefresh =
      tabId === tabList[0].id
        ? undefined
        : () => this.onTabIndexChange(routeIndex)
    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: animatedValRefCmsScrollY } } }],
      { listener: this.onPageScroll, useNativeDriver: true }
    )

    return (
      <AnimatedFlatList
        style={[styles.sceneBox, flatListStyles]}
        data={tabFloorMap[tabId] || []}
        renderItem={this.renderFlatItem}
        keyExtractor={item => `${item.key}`}
        refreshing={tabLoadingMap[tabId] || false}
        onRefresh={onRefresh}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  renderTabBar = props => {
    const { animatedValRefCmsScrollY } = this.state
    return (
      <View style={styles.tabBarContainer}>
        <TabBar {...props} animatedVal={animatedValRefCmsScrollY} />
      </View>
    )
  }

  render() {
    const { currentTabIdx, tabList } = this.state

    const navigationState = {
      index: currentTabIdx,
      routes: tabList.map(tab => ({ key: tab.id, title: tab.showName })),
    }

    return (
      <View style={styles.container}>
        <TabView
          navigationState={navigationState}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.onTabIndexChange}
        />
      </View>
    )
  }
}

export default Page
