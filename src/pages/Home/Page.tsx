/*
 * @Author: 李华良
 * @Date: 2019-09-19 09:35:28
 * @Last Modified by: 李华良
 * @Last Modified time: 2020-01-09 15:53:30
 */
import * as React from 'react'
import { View, Animated, Dimensions } from 'react-native'
import { Native, Log } from '@utils'
import { CMSServices, ProductServices } from '@services'
import styles from './Page.styles'
import { TabView } from 'react-native-tab-view'
import TabBar from './components/TabBar'
import CMSScene from './components/CMSScene'
import CategoryScene from './components/CategoryScene'
import { StorageChoices, Sort } from './components/ProductFilter'
import {
  ActivityStatus,
  BaseObj,
  Product,
  ProductDeliveryType,
  ProductType,
} from '@common/typings'
import { formatFloorData, NativePlaceHeightMax, TabHeight } from './utils'
import { LimitTimeBuy as LimitTimeBuyScene } from '@components/Scene'
import { RouteContext } from '@utils/contextes'
import Spin from '@components/Spin'

const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height

enum TabType {
  CMS = 'cms',
  CATEGORY = 'category',
}

interface Tab {
  key: string // unique tab key
  title: string // tab's display name
  type: TabType // tab type: cms or category
}

// 商品过滤器
interface ProductFilter {
  inventory: StorageChoices
  sortField: string
  sortType: Sort
  page: number
  pageSize: number
}

interface State {
  shop: {
    code: string
    type: string
  }

  animatedValRefCmsScrollY: Animated.AnimatedValue // 动画相关，页面的 Y 向滚动距离

  loading: boolean
  tabList: Tab[]
  currentTabIdx: number

  tabContentLoadingMap: {
    [tabKey: string]: boolean
  }
  tabContentMap: {
    [tabKey: string]: (
      | []
      | { categories: []; productFilter: {}; products: Product[] })[]
  }

  shouldRefreshFirstTab: boolean
  shouldRefreshTab: boolean

  autoRefreshing: boolean
}

export default class Page extends React.Component<{}, State> {
  state = {
    shop: { code: '', type: '' },

    loading: false,
    animatedValRefCmsScrollY: new Animated.Value(0),

    tabList: [],
    currentTabIdx: 0,
    tabContentLoadingMap: {},
    tabContentMap: {},

    shouldRefreshFirstTab: false,
    shouldRefreshTab: false,
    autoRefreshing: false,
  }

  removeShopChangeListener: Function
  removeCartChangeListener: Function
  removeNewcomerChangeListener: Function

  componentDidMount() {
    Native.setHomeFirstTabActiveStatus(true)
    this.syncScrollToNative({ nativeEvent: { contentOffset: { x: 0, y: 0 } } })
    this.init()
  }

  componentDidUpdate() {
    const { currentTabIdx } = this.state
    Native.setHomeFirstTabActiveStatus(currentTabIdx === 0)
  }

  init = async () => {
    // 获取初始门店数据
    const [shopCode, shopTypeCode] = await Promise.all([
      Native.getConstant('storeCode'),
      Native.getConstant('storeTypeCode'),
    ])
    Log.debug('get initial shop info:', shopCode, shopTypeCode)

    if (shopCode && shopTypeCode) {
      this.setState({ shop: { code: shopCode, type: shopTypeCode } })
      this.requestTabData(shopCode, shopTypeCode)
    }

    // 注册 native 门店变更回调
    this.removeShopChangeListener = Native.onNativeEvent(
      'storeChange',
      this.onShopChange
    )
    // 注册购物车变化回调
    this.removeCartChangeListener = Native.onNativeEvent(
      'notifyRefreshCartNum',
      this.onCartChange
    )
    // 注册是否是新人身份变更回调
    this.removeNewcomerChangeListener = Native.onNativeEvent(
      'newcomerChange',
      this.newcomerChange
    )
  }

  onShopChange = ({ storeCode, storeTypeCode }) => {
    const { shop } = this.state
    if (storeCode !== shop.code || storeTypeCode !== shop.type) {
      this.setState({ shop: { code: storeCode, type: storeTypeCode } })
      this.requestTabData(storeCode, storeTypeCode)
    }
  }

  onCartChange = () => {
    const { currentTabIdx } = this.state

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    this.setState({ autoRefreshing: true })
    this.onTabIndexChange(currentTabIdx, true).then(() =>
      this.setState({ autoRefreshing: false })
    )
  }

  newcomerChange = ({ storeCode, storeTypeCode }) => {
    this.requestTabData(storeCode, storeTypeCode)
  }

  requestTabData = async (shopCode: string, shopTypeCode: string) => {
    this.setState({ loading: true })
    let data: any[]
    try {
      data = await Promise.all([
        CMSServices.getHomeTabs(shopCode).then(({ result }) => result || []),
        ProductServices.getCategory(shopCode, shopTypeCode).then(
          ({ result }) => result || []
        ),
      ])
    } finally {
      this.setState({ loading: false })
    }

    const [cmsTabs, categories] = data
    const tabList = [
      ...cmsTabs.map(ele => ({
        key: ele.id,
        title: ele.showName,
        type: 'cms',
      })),
      ...categories.map(ele => ({
        key: ele.categoryCode,
        title: ele.categoryName,
        type: 'category',
      })),
    ]

    this.setState({
      currentTabIdx: 0,
      tabList,
      tabContentMap:
        cmsTabs.length > 0
          ? {
              [cmsTabs[0].id]: formatFloorData(
                cmsTabs[0].templateVOList || [],
                shopCode,
                0,
                this.onFloorLimitTimeBuyExpire
              ),
            }
          : {},
      shouldRefreshTab: false,
      shouldRefreshFirstTab: false,
    })
  }

  requestCMSContentData = async (tabId, shopCode) => {
    const { result = {} } = await CMSServices.getFloorDataByTab(tabId, shopCode)
    return result.templateVOList || []
  }

  requestCategoryContentData = async (
    categoryCode: string,
    shopCode: string,
    shopTypCode: string,
    filter: ProductFilter
  ) => {
    const [subCategories, products] = await Promise.all([
      ProductServices.getCategory(shopCode, shopTypCode, categoryCode).then(
        ({ result }) => result || [],
        err => []
      ),
      this.requestProductList(categoryCode, shopCode, filter),
    ])

    const subCategoryTotal = subCategories.length
    const categories = (subCategoryTotal <= 5
      ? subCategories
      : subCategoryTotal < 10
      ? subCategories.slice(0, 5)
      : subCategories.slice(0, 10)
    ).map(ele => ({
      key: ele.categoryCode,
      image: ele.categoryImage,
      title: ele.categoryName,
      link: {
        type: Native.NavPageType.NATIVE,
        uri: `A002?cate=${categoryCode},A002?cate=${categoryCode}`,
        params: { code: categoryCode },
      },
    }))

    return [categories, products]
  }

  requestProductList = (
    categoryCode: string,
    shopCode: string,
    filter: ProductFilter
  ) => {
    return ProductServices.queryProductList(
      shopCode,
      categoryCode,
      { [StorageChoices.InStore]: '1', [StorageChoices.All]: '0' }[
        filter.inventory
      ] || '',
      filter.sortField,
      { [Sort.ASC]: 'ASC', [Sort.DESC]: 'DESC' }[filter.sortType] || '',
      filter.page,
      filter.pageSize
    )
      .then(
        ({ page }) => page.result || [],
        err => {
          Log.error('query product list failed:', err)
          Native.showToast('获取商品失败')
          return []
        }
      )
      .then(products => products.map(this.formatProductData))
  }

  // 格式化分类下的商品数据
  formatProductData = (data: BaseObj) => {
    const currentPrice = Math.min(
      Math.min(data.price || 0, data.promotionPrice || Infinity)
    )
    const slashedPrice = currentPrice < (data.price || 0) ? data.price : 0
    const remarks = data.noteContentList || []

    const { shop } = this.state

    let result: BaseObj = {
      type: data.isAdvanceSale === 1 ? ProductType.PreSale : ProductType.Normal,
      code: data.productCode,
      thumbnail: data.mainUrl.url,
      name: data.productName,
      desc: data.subTitle,
      spec: data.productSpecific,
      price: currentPrice,
      slashedPrice,
      count: data.productNum,
      shopCode: shop.code,
      inventoryLabel: data.inventoryLabel,
      remarks,
      deliveryType:
        {
          1: ProductDeliveryType.InTime,
          2: ProductDeliveryType.NextDay,
        }[data.deliveryType] || ProductDeliveryType.Other,
      isPreSale: data.isAdvanceSale === 1,
      labels: (data.productActivityLabel || { labels: [] }).labels,
    }
    if (
      data.productActivityLabel &&
      data.productActivityLabel.promotionType === 5
    ) {
      const {
        activityBeginTime,
        activityEndTime,
        salesRatio,
      } = data.productActivityLabel
      const start = Number(activityBeginTime)
      const end = Number(activityEndTime)
      const now = Date.now()
      const price = Math.min(currentPrice, data.discountPrice || Infinity)

      const status =
        now < start
          ? ActivityStatus.Pending
          : now < end
          ? ActivityStatus.Processing
          : ActivityStatus.Expired
      if (status === ActivityStatus.Processing) {
        result = {
          ...result,
          isLimitTimeBuy: true,
          inventoryPercentage: !/(\d+(\.\d+)?)%/.test(salesRatio)
            ? 100
            : Number(salesRatio.match(/(\d+(\.\d+)?)%/)[1]),
          status,
          price,
        }
      }
    }
    return result
  }

  // 当前激活的 tab index 变化
  onTabIndexChange = async (index: number, isRefresh?: boolean) => {
    const {
      tabList,
      shop,
      animatedValRefCmsScrollY,
      tabContentMap,
      shouldRefreshFirstTab,
      shouldRefreshTab,
    } = this.state

    const currentTab = tabList[index]
    if (!currentTab) return

    this.setState({ currentTabIdx: index })
    if (!isRefresh) {
      animatedValRefCmsScrollY.setValue(0)
      this.syncScrollToNative({
        nativeEvent: {
          contentOffset: { x: 0, y: 0 },
        },
      })
    }

    if (currentTab.title === '限时抢购') {
      return shouldRefreshTab ? this.requestTabData(shop.code, shop.type) : null
    }

    const currentTabKey = currentTab.key
    const preContentData = tabContentMap[currentTabKey]
    // 非下拉刷新，且当前 tab 下已有数据，直接渲染数据
    if (
      !isRefresh &&
      ((currentTab.type === TabType.CMS && (preContentData || []).length > 0) ||
        (currentTab.type === TabType.CATEGORY && preContentData)) &&
      !(index === 0 && shouldRefreshFirstTab)
    )
      return

    this.setState(({ tabContentLoadingMap }) => ({
      tabContentLoadingMap: { ...tabContentLoadingMap, [currentTabKey]: true },
    }))
    let p = Promise.resolve()
    if (currentTab.type === TabType.CMS) {
      p = this.requestCMSContentData(currentTabKey, shop.code).then(data =>
        this.setState(({ tabContentMap, shouldRefreshFirstTab }) => ({
          tabContentMap: {
            ...tabContentMap,
            [currentTabKey]: formatFloorData(
              data,
              shop.code,
              index,
              this.onFloorLimitTimeBuyExpire
            ),
          },
          shouldRefreshFirstTab: index === 0 ? false : shouldRefreshFirstTab,
        }))
      )
    } else if (currentTab.type === TabType.CATEGORY) {
      const productFilter = {
        inventory: StorageChoices.InStore,
        sortField: 'price',
        sortType: Sort.ASC,
        page: 1,
        pageSize: 30,
      }
      this.setState(({ tabContentMap }) => ({
        ...tabContentMap,
        [currentTabKey]: {
          categories: [],
          productFilter,
          products: [],
        },
      }))
      p = this.requestCategoryContentData(
        currentTab.key,
        shop.code,
        shop.type,
        productFilter
      ).then(([categories, products]) =>
        this.setState(({ tabContentMap }) => ({
          tabContentMap: {
            ...tabContentMap,
            [currentTabKey]: {
              categories,
              productFilter,
              products,
            },
          },
        }))
      )
    }
    return p.finally(() =>
      this.setState(({ tabContentLoadingMap }) => ({
        tabContentLoadingMap: {
          ...tabContentLoadingMap,
          [currentTabKey]: false,
        },
      }))
    )
  }

  syncScrollToNative = e => {
    const {
      nativeEvent: {
        contentOffset: { x, y },
      },
    } = e
    CMSServices.pushScrollToNative(x, y)
  }

  // 分类页商品 filter 变化
  onProductFilterChange = async data => {
    const { currentTabIdx, tabList, shop } = this.state
    const currentTab = tabList[currentTabIdx]
    if (!currentTabIdx || currentTab.type !== TabType.CATEGORY) return

    const nextProductFilter = {
      inventory: data.storage,
      sortField: 'price',
      sortType: data.priceSorter,
      page: 1,
      pageSize: 30,
    }
    const currentTabKey = currentTab.key
    this.setState(({ tabContentMap }) => ({
      tabContentMap: {
        ...tabContentMap,
        [currentTabKey]: {
          ...tabContentMap[currentTabKey],
        },
      },
    }))

    const products = await this.requestProductList(
      currentTabKey,
      shop.code,
      nextProductFilter
    )
    this.setState(({ tabContentMap }) => ({
      tabContentMap: {
        ...tabContentMap,
        [currentTabKey]: {
          ...tabContentMap[currentTabKey],
          productFilter: nextProductFilter,
          products,
        },
      },
    }))
  }

  onRefresh = () => {
    const { currentTabIdx, shop } = this.state
    if (currentTabIdx === 0) this.requestTabData(shop.code, shop.type)
    else this.onTabIndexChange(currentTabIdx, true)
  }

  // 限时抢购所有活动都已过期
  onAllLimitTimeBuyExpire = () => {
    const {
      shop: { code, type },
      currentTabIdx,
      tabList,
    } = this.state
    if (tabList[currentTabIdx].title === '限时抢购') {
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
      this.setState({ shouldRefreshFirstTab: true })
    }
  }

  renderTabBar = props => {
    const { animatedValRefCmsScrollY } = this.state
    return <TabBar {...props} animatedVal={animatedValRefCmsScrollY} />
  }

  renderScene = ({ route: { key, title, type } }) => {
    const {
      tabContentMap,
      tabContentLoadingMap,
      animatedValRefCmsScrollY,
      currentTabIdx: currentActiveTabIdx,
      tabList,
      autoRefreshing,
    } = this.state

    const currentRouteIdx = tabList.findIndex(ele => ele.key === key)
    if (
      Math.abs(currentActiveTabIdx - currentRouteIdx) > 1 &&
      title !== '限时抢购'
    ) {
      return <View />
    }

    if (title === '限时抢购') {
      return (
        <LimitTimeBuyScene
          shopCode={this.state.shop.code}
          paddingTop={NativePlaceHeightMax + TabHeight}
          onAllExpired={this.onAllLimitTimeBuyExpire}
        />
      )
    }

    const content = tabContentMap[key]
    const contentLoading = !!tabContentLoadingMap[key] && !autoRefreshing

    const onPageScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { y: this.state.animatedValRefCmsScrollY },
          },
        },
      ],
      {
        listener: this.syncScrollToNative,
        useNativeDriver: true,
      }
    )

    switch (type) {
      case TabType.CMS:
        return (
          <CMSScene
            loading={contentLoading}
            data={content || []}
            isFullscreen={currentRouteIdx === 0}
            animatedVal={animatedValRefCmsScrollY}
            onScroll={onPageScroll}
            onRefresh={this.onRefresh}
          />
        )
      case TabType.CATEGORY:
        return (
          <CategoryScene
            loading={contentLoading}
            categories={(content || {}).categories || []}
            productFilter={(content || {}).productFilter || {}}
            products={(content || {}).products}
            animatedVal={animatedValRefCmsScrollY}
            onProductFilterChange={this.onProductFilterChange}
            onRefresh={this.onRefresh}
            onScroll={onPageScroll}
          />
        )
      default:
        return null
    }
  }

  render() {
    const { loading, currentTabIdx, tabList, autoRefreshing } = this.state
    const navigationState = {
      index: currentTabIdx,
      routes: tabList,
    }
    const currentTabName = (tabList[currentTabIdx] || {}).title

    return (
      <RouteContext.Provider
        value={{
          path: '首页',
          name: currentTabName,
          extraData: { currentTab: currentTabName },
        }}
      >
        <View style={styles.container}>
          {((loading && tabList.length === 0) || autoRefreshing) && (
            <View style={styles.loadingContainer}>
              <Spin />
            </View>
          )}
          <TabView
            navigationState={navigationState}
            renderTabBar={this.renderTabBar}
            renderScene={this.renderScene}
            onIndexChange={this.onTabIndexChange}
            initialLayout={{ height: WindowHeight, width: WindowWidth }}
          />
        </View>
      </RouteContext.Provider>
    )
  }
}
