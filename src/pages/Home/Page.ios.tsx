/**
 * Created by 李华良 on 2019-07-23
 */
import * as React from 'react'
import {
  View,
  Animated,
  FlatList,
  Dimensions,
  RefreshControl,
  Platform,
} from 'react-native'
import { CMSServices, ProductServices } from '@services'
import { Log, Native } from '@utils'
import styles from './Page.styles'
import Box from '@components/business/Content/Box'
import ProductListWithFilter from './components/ProductListWithFilter'
import { TabView } from 'react-native-tab-view'
import TabBar, { TabHeight } from './components/TabBar'
import theme from '@theme'
import { formatFloorData } from './utils'
import {LimitTimeBuy as LimitTimeBuyScene} from "@components/Scene";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const placeholderForNativeHeight = Native.getStatusBarHeight() + 86 + TabHeight
const windowWidth = Dimensions.get('window').width

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
  dataExpired: boolean

  shouldRefreshFirstTab: boolean
  shouldRefreshTab: boolean
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
    dataExpired: false,

    shouldRefreshFirstTab: false,
    shouldRefreshTab: false,
  }

  nativeSubscription: { remove: Function }

  async componentDidMount() {
    this.onPageScroll({
      nativeEvent: {
        contentOffset: { x: 0, y: 0 },
      },
    })
    Native.setHomeFirstTabActiveStatus(true)
    this.init()
  }

  async componentDidUpdate() {
    const { currentTabIdx } = this.state
    Native.setHomeFirstTabActiveStatus(currentTabIdx === 0)
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
      if (shopCode && shopType) {
        this.setState({ shop: { code: shopCode, type: shopType } })
        this.requestTabData(shopCode, shopType)
      }
    } else {
      this.requestTabData(shop.code, shop.type)
    }

    // 门店变化 native 事件监听
    this.nativeSubscription = CMSServices.subscriptShopChange(
      this.onNativeShopChange
    )

    // 监听购物车变化
    Native.onCartChange(() => {
      const { currentTabIdx } = this.state
      this.setState({ dataExpired: true })
      this.onTabIndexChange(currentTabIdx, true)
    })
  }

  // 门店变化
  onNativeShopChange = data => {
    const { storeCode, storeTypeCode } = data
    Log.debug('store changed', storeCode, storeTypeCode, this.state.shop)
    const { shop } = this.state
    if (storeCode !== shop.code || storeTypeCode !== shop.type) {
      this.setState({ shop: { code: storeCode, type: storeTypeCode } })
      this.requestTabData(storeCode, storeTypeCode)
    }
  }

  // 获取初始 CMS 数据
  requestTabData = async (shopCode: string, shopType) => {
    this.setState({ loading: true })
    let data: any[]
    try {
      data = await Promise.all([
        CMSServices.getHomeTabs(shopCode).then(({ result }) => result || []),
        ProductServices.getCategory(shopCode, shopType).then(
          ({ result }) => result || []
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
        type: ele.showName === '限时抢购' ? 'limitTimeBuy' : 'cms',
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
          ? {
              [cmsTabs[0].id]: formatFloorData(
                cmsTabs[0].templateVOList || [],
                shopCode,
                0,
                this.onFloorLimitTimeBuyExpire
              ),
            }
          : {}),
      },
      tabLoadingMap: {
        ...preState.tabLoadingMap,
        ...(cmsTabs.length > 0 ? { [cmsTabs[0].id]: false } : {}),
      },
      shouldRefreshTab: false,
      shouldRefreshFirstTab: false,
    }))
  }
  // 获取 tab 下的 CMS 数据
  requestFloorData = (tabId, tabIdx, force) => {
    if (!force)
      this.setState(({ tabLoadingMap }) => ({
        tabLoadingMap: { ...tabLoadingMap, [tabId]: true },
      }))

    const {
      shop: { code: shopCode },
    } = this.state

    return CMSServices.getFloorDataByTab(tabId, shopCode)
      .then(({ result = {} }) => {
        this.setState(({ tabFloorMap }) => ({
          tabFloorMap: {
            ...tabFloorMap,
            [tabId]: formatFloorData(
              result.templateVOList || [],
              shopCode,
              tabIdx,
              this.onFloorLimitTimeBuyExpire
            ),
          },
        }))
      })
      .finally(() => {
        if (!force)
          this.setState(({ tabLoadingMap }) => ({
            tabLoadingMap: { ...tabLoadingMap, [tabId]: false },
          }))
      })
  }
  // 获取 top 分类下的数据
  requestCategoryContentData = (categoryCode, force) => {
    if (!force) {
      this.setState(({tabLoadingMap}) => ({
        tabLoadingMap: {...tabLoadingMap, [categoryCode]: true},
      }))
    }
    const { shop } = this.state
    return ProductServices.getCategory(shop.code, shop.type, categoryCode)
      .then(({ result }) => {
        //首页二级分类数量大于等于5个小于10个，分类展示5个
        if (result && result.length >= 5 && result.length < 10) {
          result = result.slice(0, 5)
        }
        //首页二级分类数量大于等于10个，分类展示10个
        else if (result && result.length >= 10) {
          result = result.slice(0, 10)
        }
        const categories = result.map(ele => ({
          key: ele.categoryCode,
          image: ele.categoryImage,
          title: ele.categoryName,
          link: {
            type: Native.NavPageType.NATIVE,
            uri: `A002?cate=${categoryCode},A002?cate=${categoryCode}`,
            params: { code: categoryCode },
          },
        }))

        this.setState(({ tabFloorMap }) => ({
          tabFloorMap: {
            ...tabFloorMap,
            [categoryCode]: [
              {
                key: '$$category-box',
                component: Box,
                wrapperStyle: {
                  paddingVertical: 25,
                  marginBottom: 10,
                  backgroundColor: '#FFF',
                },
                props: { data: categories, columnNumber: 5 },
              },
              {
                key: '$$product-list-with-filter',
                component: ProductListWithFilter,
                wrapperStyle: { backgroundColor: '#FFF' },
                props: { categoryCode, shopCode: shop.code },
              },
            ],
          },
        }))
      })
      .finally(() => !force &&
        this.setState(({ tabLoadingMap }) => ({
          tabLoadingMap: { ...tabLoadingMap, [categoryCode]: false },
        }))
      )
  }

  // 页面滚动
  onPageScroll = e => {
    const {
      nativeEvent: {
        contentOffset: { x, y },
      },
    } = e
    CMSServices.pushScrollToNative(x, y)
  }

  onTabIndexChange = (idx, force = false) => {
    this.setState({ currentTabIdx: idx })
    const {
      shop,
      tabList,
      tabFloorMap,
      dataExpired,
      animatedValRefCmsScrollY,
      shouldRefreshFirstTab,
      shouldRefreshTab,
    } = this.state
    const currentTab = tabList[idx]
    if (!currentTab) return

    if (currentTab.title === '限时抢购') {
      return shouldRefreshTab ? this.requestTabData(shop.code, shop.type) : null
    }

    if ((tabFloorMap[currentTab.id] || []).length === 0) {
      animatedValRefCmsScrollY.setValue(0)
      CMSServices.pushScrollToNative(0, 0)
    }
    if (
      force ||
      dataExpired ||
      (currentTab && (tabFloorMap[currentTab.id] || []).length === 0) ||
      (idx === 0 && shouldRefreshFirstTab)
    ) {
      const fn = {
        cms: (tabId, isForce) => this.requestFloorData(tabId, idx, isForce)
          .then(() => this.setState(
            ({ shouldRefreshFirstTab }) => ({
              shouldRefreshFirstTab: idx === 0 ? false : shouldRefreshFirstTab
            }))
          ),
        category: this.requestCategoryContentData,
      }[currentTab.type]
      fn && fn(currentTab.id, force || dataExpired)
    }
  }

  onRefreshScene = idx => {
    const { tabList, tabFloorMap, shop } = this.state
    const currentTab = tabList[idx]
    if (idx === 0) return this.requestTabData(shop.code, shop.type)
    if (!currentTab) return
    const fn = {
      cms: (tabId, isForce) => this.requestFloorData(tabId, idx, isForce),
      category: this.requestCategoryContentData,
    }[currentTab.type]
    fn && fn(currentTab.id)
  }

  // 限时抢购所有活动都已过期
  onAllLimitTimeBuyExpire = () => {
    const { shop: { code, type }, currentTabIdx, tabList } = this.state
    if (tabList[currentTabIdx].showName === '限时抢购') {
      this.setState({ currentTabIdx: 0 })
      this.requestTabData(code, type)
    } else {
      this.setState({ shouldRefreshTab: true })
    }
  }

  // 限时抢购楼层的活动过期
  onFloorLimitTimeBuyExpire = () => {
    const { currentTabIdx } = this.state
    if (currentTabIdx === 0) {
      this.onTabIndexChange(0, true)
    } else {
      this.setState(() => ({ shouldRefreshFirstTab: true }))
    }
  }

  renderFlatItem = ({ item: { wrapperStyle, component: Comp, props } }) => (
    <View style={wrapperStyle}>
      <Comp {...props} />
    </View>
  )

  renderScene = ({ route }) => {
    const {
      tabList,
      tabFloorMap,
      tabLoadingMap,
      animatedValRefCmsScrollY,
    } = this.state
    const routeIndex = tabList.findIndex(tab => tab.id === route.key)

    const currentTabContent = tabFloorMap[route.key] || []
    const currentTabLoading = !!tabLoadingMap[route.key]

    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: animatedValRefCmsScrollY } } }],
      { listener: this.onPageScroll, useNativeDriver: true }
    )

    if (route.title === '限时抢购') {
      return <LimitTimeBuyScene
        shopCode={this.state.shop.code}
        paddingTop={placeholderForNativeHeight}
        onAllExpired={this.onAllLimitTimeBuyExpire}
      />
    }

    if (routeIndex === 0) {
      return (
        <AnimatedFlatList
          style={styles.sceneBox}
          data={currentTabContent}
          renderItem={this.renderFlatItem}
          keyExtractor={item => `${item.key}`}
          refreshControl={
            <RefreshControl
              refreshing={!!tabLoadingMap[route.key]}
              onRefresh={() => this.onRefreshScene(routeIndex)}
              colors={[theme.primary, theme.white]}
              tintColor={theme.primary}
            />
          }
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
        />
      )
    }
    if (Platform.OS === 'ios') {
      const translateY = animatedValRefCmsScrollY.interpolate({
        inputRange: [-100, 1, 50],
        outputRange: [
          placeholderForNativeHeight,
          placeholderForNativeHeight,
          0,
        ],
        extrapolate: 'clamp',
      })

      return (
        <AnimatedFlatList
          style={[styles.sceneBox, { transform: [{ translateY }] }]}
          data={currentTabContent}
          renderItem={this.renderFlatItem}
          keyExtractor={item => `${item.key}`}
          refreshControl={
            <RefreshControl
              refreshing={currentTabLoading}
              onRefresh={() => this.onRefreshScene(routeIndex)}
              colors={[theme.primary, theme.white]}
              tintColor={theme.primary}
            />
          }
          onScroll={
            currentTabContent.length === 0 || currentTabLoading
              ? undefined
              : onScroll
          }
          showsVerticalScrollIndicator={false}
        />
      )
    } else {
      // android 使用 translate 方式会动画抖动，因此使用 Header 占位并且设置 refreshControl topOffset
      return (
        <AnimatedFlatList
          style={styles.sceneBox}
          data={currentTabContent}
          renderItem={this.renderFlatItem}
          keyExtractor={item => `${item.key}`}
          refreshControl={
            <RefreshControl
              refreshing={currentTabLoading}
              onRefresh={() => this.onRefreshScene(routeIndex)}
              colors={[theme.primary, theme.white]}
              tintColor={theme.primary}
              progressViewOffset={placeholderForNativeHeight}
            />
          }
          onScroll={
            currentTabContent.length === 0 || currentTabLoading
              ? undefined
              : onScroll
          }
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ height: placeholderForNativeHeight }} />
          }
        />
      )
    }
  }

  renderTabBar = props => {
    const { animatedValRefCmsScrollY } = this.state
    return <TabBar {...props} animatedVal={animatedValRefCmsScrollY} />
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
          initialLayout={{ height: 0, width: windowWidth }}
          sceneContainerStyle={{ backgroundColor: '#FAFAFA' }}
        />
      </View>
    )
  }
}

export default Page
