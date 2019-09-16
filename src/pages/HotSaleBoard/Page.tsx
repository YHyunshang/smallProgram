/*
 * @Author: 李华良
 * @Date: 2019-08-21 14:48:31
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-12 15:04:46
 */
import * as React from 'react'
import { View, FlatList, Image } from 'react-native'
import styles from './Page.styles'
import { ProductServices } from '@services'
import ProductList from './components/ProductList'
import Tab from './components/Tab'
import { Native } from '@utils'
import ProductGrid from '@components/business/Content/ProductGrid'
import Empty from './components/Empty'
import { hotSaleBanner } from '@const/resources'
import FitImage from 'react-native-fit-image'

interface State {
  tabList: {
    key: string
    label: string
  }[]
  tabContentMap: {
    [tab: string]: {}
  }
  tabLoadingMap: {
    [tab: string]: boolean
  }
  currentTabId: string
  shop: {
    code: string // 编码
    type: string // 业态
  }
}

export default class Page extends React.Component<Object, State> {
  state = {
    tabList: [],
    tabContentMap: {},
    tabLoadingMap: {},
    currentTabId: '',
    shop: {
      code: '',
      type: '',
    },
  }

  flatListRef = React.createRef<FlatList<any>>()

  async componentDidMount() {
    const [code, type] = await Promise.all([
      Native.getConstant('storeCode'),
      Native.getConstant('storeTypeCode'),
    ])

    this.setState({ shop: { code, type } })

    const tabList = await this.requestTabList()
    if (tabList.length > 0) {
      const { key: tabId } = tabList[0]
      this.requestProductListUnderTab(tabId)
    }
  }

  requestTabList = async () => {
    const {
      shop: { code, type },
    } = this.state
    const { result } = await ProductServices.getCategory(code, type, null)
    const tabList = result.map(ele => ({
      key: ele.categoryCode,
      label: ele.categoryName,
    }))
    this.setState({
      tabList,
      currentTabId: tabList.length > 0 ? tabList[0].key : '',
    })
    return tabList
  }
  requestProductListUnderTab = async (tabId: string) => {
    this.setState(({ tabLoadingMap: preTabLoadingMap }) => ({
      tabLoadingMap: { ...preTabLoadingMap, [tabId]: true },
    }))
    const {
      shop: { code: shopCode },
    } = this.state
    try {
      const { page } = await ProductServices.getHotSaleProductsUnderCategory(
        tabId,
        shopCode
      )
      this.setState(({ tabContentMap: preTabContentMap, shop: { code } }) => ({
        tabContentMap: {
          ...preTabContentMap,
          [tabId]: (page.result || []).map(ele => ({
            ...this.formateProductData(ele),
            shopCode: code,
          })),
        },
      }))
    } finally {
      this.setState(({ tabLoadingMap: preTabLoadingMap }) => ({
        tabLoadingMap: { ...preTabLoadingMap, [tabId]: false },
      }))
    }
  }
  formateProductData = data => {
    const currentPrice = Math.min(
      Math.min(data.price || 0, data.promotionPrice || Infinity)
    )
    const slashedPrice = currentPrice < (data.price || 0) ? data.price : 0

    const remarks = data.noteContentList || []

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
      inventoryLabel: '',
      remarks,
    }
  }

  onTabChange = key => {
    this.setState({ currentTabId: key })
    const { tabContentMap } = this.state
    if (tabContentMap[key] && tabContentMap[key].length > 0) {
      // this.flatListRef.current.scrollToIndex({ index: 1 })
    } else {
      this.requestProductListUnderTab(key)
    }
  }

  renderFlatItem = ({ item: { component: Comp, props } }) => <Comp {...props} />

  render() {
    const { tabList, tabContentMap, tabLoadingMap, currentTabId } = this.state
    const productsUnderCurrentTab = tabContentMap[currentTabId] || []
    const floorData = [
      {
        key: '$$img',
        component: FitImage,
        props: {
          resizeMode: 'cover',
          source: hotSaleBanner,
          style: { marginBottom: -35.2941, width: '100%', height: 200 },
        },
      },
      {
        key: '$$tab',
        component: Tab,
        props: {
          data: tabList,
          currentTab: currentTabId,
          onTabChange: this.onTabChange,
        },
      },
      ...(productsUnderCurrentTab.length > 0
        ? [
            {
              key: '$$product-list',
              component: ProductList,
              props: { products: productsUnderCurrentTab.slice(0, 6) },
            },
            {
              key: '$$product-grid',
              component: ProductGrid,
              props: {
                products: productsUnderCurrentTab.slice(6),
                columnNumber: 2,
              },
            },
          ]
        : tabLoadingMap[currentTabId]
        ? []
        : [{ key: '$$empty', component: Empty }]),
    ]
    return (
      <FlatList
        ref={this.flatListRef}
        style={styles.container}
        data={floorData}
        renderItem={this.renderFlatItem}
        stickyHeaderIndices={[1]}
        overScrollMode="always"
        ListFooterComponent={<View style={styles.footer} />}
      />
    )
  }
}
