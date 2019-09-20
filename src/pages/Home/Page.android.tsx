/*
 * @Author: 李华良
 * @Date: 2019-09-19 09:35:28
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-20 15:56:01
 */
import * as React from 'react'
import { View, Animated } from 'react-native'
import { Native, Log } from '@utils'
import { CMSServices, ProductServices } from '@services'
import styles from './Page.styles'
import { TabView } from 'react-native-tab-view'
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
import TabBar, { TabHeight } from './components/TabBar'
import CMSScene from './components/CMSScene'
import CategoryScene from './components/CategroryScene'
import { StorageChoices, Sort, sort2String } from './components/ProductFilter'

const PlaceholderForNativeHeight = Native.getStatusBarHeight() + 86 + TabHeight

interface Props {}

interface State {
  shop: {
    code: string
    type: string
  }

  loading: boolean
  animatedValRefCmsScrollY: Animated.AnimatedValue

  tabList: {}[]
  currentTabIdx: number

  currentCMSContentData: {}[] // cms 内容数据

  // 分类 tab 下的数据
  categories: {}[] // 二级分类
  productFilter: {
    // 商品过滤器
    inventoryFilter: StorageChoices
    orderField: string
    orderType: Sort
    page: number
    pageSize: number
  }
  products: {}[] // 分类 tab 下的商品列表
}

export default class Page extends React.Component<Props, State> {
  state = {
    shop: { code: '', type: '' },

    loading: false,
    animatedValRefCmsScrollY: new Animated.Value(0),

    tabList: [],
    currentTabIdx: 0,

    currentCMSContentData: [],

    categories: [],
    productFilter: {
      inventoryFilter: StorageChoices.InStore,
      orderField: 'price',
      orderType: Sort.ASC,
      page: 1,
      pageSize: 30,
    },
    products: [],
  }

  removeShopChangeListener: Function
  removeCartChangeListener: Function

  componentDidMount() {
    Native.setHomeFirstTabActiveStatus(true)
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
      () => {
        this
      }
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
    const { currentTabIdx, tabList } = this.state
    const currentTab = tabList[currentTabIdx]
    if (!currentTab) return

    this.onTabKeyChange(currentTab.id)
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

    this.setState({
      currentTabIdx: 0,
      tabList,
      currentCMSContentData:
        cmsTabs.length > 0
          ? this.formatFloorData(cmsTabs[0].templateVOList || [])
          : [],
    })
  }

  requestCMSContentData = async (tabId, shopCode) => {
    const { result = {} } = await CMSServices.getFloorDataByTab(tabId, shopCode)
    return this.formatFloorData(result.templateVOList || [])
  }

  requestCategoryContentData = async (
    categoryCode: string,
    shopCode: string,
    shopTypCode: string,
    filter: State['productFilter']
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

  requestProductList = (categoryCode, shopCode, filter) => {
    return ProductServices.queryProductList(
      shopCode,
      categoryCode,
      filter.inventoryFilter === StorageChoices.InStore ? '1' : '0',
      filter.orderField,
      sort2String(filter.orderType),
      filter.page,
      filter.pageSize
    )
      .then(
        ({ page = {} }) => page.result || [],
        err => {
          Log.error('query product list failed:', err)
          Native.showToast('获取商品失败')
          return []
        }
      )
      .then(products => products.map(this.formateProductData))
  }

  // 格式化 cms 数据
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
            imageHeight: currentTabIdx === 0 && i === 0 ? 290 : 150,
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
            wrapperStyle: [
              {
                marginHorizontal:
                  currentTabIdx === 0 && imgObj.name !== '查看更多' ? 10 : 0,
              },
              currentTabIdx === 0 && {
                borderRadius: 5,
                overflow: 'hidden',
              },
            ],
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
            wrapperStyle: { paddingHorizontal: currentTabIdx === 0 ? 15 : 0 },
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
        const component =
          {
            1: ProductList,
            2: ProductGrid,
            3: ProductGrid,
            4: ProductSwiper,
          }[floor.subType] || ProductSwiper
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
        const boxItemPropsFormatter = data =>
          data.templateDetailVOList.map(ele => ({
            key: ele.id,
            image: ele.imgUrl,
            title: ele.name,
            link: CMSServices.formatLink(ele),
          }))
        let boxData = [...boxItemPropsFormatter(floor)]
        while (true) {
          i += 1
          const nextFloor = sortedData[i]
          if (
            nextFloor &&
            nextFloor.type === floor.type &&
            nextFloor.subType === floor.subType
          ) {
            boxData = boxData.concat(boxItemPropsFormatter(nextFloor))
          } else {
            i -= 1
            break
          }
        }
        const columnNumber = { 1: 4, 2: 5 }[floor.subType]
        result.push({
          key: floor.id,
          component: Box,
          wrapperStyle: {
            paddingTop: 25,
            paddingBottom:
              Math.ceil(boxData.length / columnNumber) > 2 ? 0 : 25,
            backgroundColor: '#FFF',
          },
          props: {
            columnNumber,
            data: boxData,
            maxRow: 2,
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

  // 格式化分类下的商品数据
  formateProductData = data => {
    const currentPrice = Math.min(
      Math.min(data.price || 0, data.promotionPrice || Infinity)
    )
    const slashedPrice = currentPrice < (data.price || 0) ? data.price : 0
    const remarks = data.noteContentList || []

    const { shop } = this.state

    return {
      code: data.productCode,
      thumbnail: data.mainUrl.url,
      name: data.productName,
      desc: data.subTitle,
      priceTags: [],
      productTags: [],
      spec: data.productSpecific,
      price: currentPrice,
      slashedPrice,
      count: data.productNum,
      shopCode: shop.code,
      inventoryLabel: data.inventoryLabel,
      remarks,
    }
  }

  // Tab key 变化（ TabView jumpTo 方法的简单重写）
  onTabKeyChange = async key => {
    const {
      tabList,
      shop,
      currentTabIdx,
      animatedValRefCmsScrollY,
    } = this.state
    const idx = tabList.findIndex(ele => ele.id === key)
    if (idx < 0) return

    if (idx !== currentTabIdx) {
      animatedValRefCmsScrollY.setValue(0)
      this.onPageScroll({
        nativeEvent: {
          contentOffset: { x: 0, y: 0 },
        },
      })
    }

    this.setState({ currentTabIdx: idx })
    const currentTab = tabList[idx]

    const productFilter = {
      inventoryFilter: StorageChoices.InStore,
      orderField: 'price',
      orderType: Sort.ASC,
      page: 1,
      pageSize: 30,
    }

    // reset content data
    this.setState({
      currentCMSContentData: [],
      categories: [],
      productFilter,
      products: [],
    })

    this.setState({ loading: true })
    let p = Promise.resolve()
    if (currentTab.type === 'cms') {
      p = this.requestCMSContentData(currentTab.id, shop.code).then(data =>
        this.setState({ currentCMSContentData: data })
      )
    } else if (currentTab.type === 'category') {
      p = this.requestCategoryContentData(
        currentTab.id,
        shop.code,
        shop.type,
        productFilter
      ).then(([categories, products]) =>
        this.setState({ categories, products })
      )
    }
    p.finally(() => this.setState({ loading: false }))
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

  // 分类页商品 filter 变化
  onProductFilterChange = async data => {
    const nextProductFilter = {
      inventoryFilter: data.storage,
      orderField: 'price',
      orderType: data.priceSorter,
      page: 1,
      pageSize: 30,
    }
    this.setState({
      productFilter: nextProductFilter,
    })

    const { shop, currentTabIdx, tabList } = this.state
    const currentTab = tabList[currentTabIdx]
    if (!currentTabIdx) return

    const products = await this.requestProductList(
      currentTab.id,
      shop.code,
      nextProductFilter
    )
    this.setState({ products })
  }

  render() {
    const {
      currentTabIdx,
      tabList,
      animatedValRefCmsScrollY,
      currentCMSContentData,
      categories,
      productFilter,
      products,
    } = this.state
    const navigationState = {
      index: currentTabIdx,
      routes: tabList.map(tab => ({ key: tab.id, title: tab.showName })),
    }

    const currentTab = tabList[currentTabIdx] || {}

    return (
      <View style={styles.container}>
        <TabBar
          jumpTo={this.onTabKeyChange}
          navigationState={navigationState}
          animatedVal={animatedValRefCmsScrollY}
        />

        {currentTab.type === 'cms' ? (
          <CMSScene
            data={currentCMSContentData}
            offsetY={animatedValRefCmsScrollY}
            contentOffset={currentTabIdx === 0 ? 0 : PlaceholderForNativeHeight}
            onScroll={this.onPageScroll}
          />
        ) : currentTab.type === 'category' ? (
          <CategoryScene
            categories={categories}
            productFilter={productFilter}
            products={products}
            offsetY={animatedValRefCmsScrollY}
            onScroll={this.onPageScroll}
            onProductFilterChange={this.onProductFilterChange}
          />
        ) : null}
      </View>
    )
  }
}
