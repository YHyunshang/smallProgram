/*
 * @Author: 李华良
 * @Date: 2019-08-21 14:48:31
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-18 22:26:23
 */
import * as React from 'react'
import { View, FlatList, Image, Dimensions } from 'react-native'
import styles from './Page.styles'
import { ProductServices } from '@services'
import ProductList from './components/ProductList'
import Tab from './components/Tab'
import { Native } from '@utils'
import ProductGrid from '@components/business/Content/ProductGrid'
import Empty from './components/Empty'
import { hotSaleBanner } from '@const/resources'
import FitImage from 'react-native-fit-image'
import {ProductDeliveryType, ProductType} from "@common/typings";
import {RouteContext} from "@utils/contextes";
import memoizeOne from "memoize-one";

interface TabData {
  key: string
  label: string
}
interface State {
  tabList: TabData[]
  tabContentMap: {
    [tab: string]: []
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
            ...this.formatProductData(ele),
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
  formatProductData = data => {
    const currentPrice = Math.min(
      Math.min(data.price || 0, data.promotionPrice || Infinity)
    )
    const slashedPrice = currentPrice < (data.price || 0) ? data.price : 0

    const remarks = data.noteContentList || []

    return {
      type: data.isAdvanceSale === 1 ? ProductType.PreSale : ProductType.Normal,
      code: data.productCode,
      thumbnail: data.mainUrl.url,
      name: data.productName,
      desc: data.subTitle,
      spec: data.productSpecific,
      price: currentPrice,
      slashedPrice,
      count: data.productNum,
      inventoryLabel: data.isAdvanceSale !== 1 ? data.inventoryLabel : '',
      remarks,
      labels: (data.productActivityLabel || {labels: []}).labels,
      deliveryType: {
        1: ProductDeliveryType.InTime,
        2: ProductDeliveryType.NextDay,
      }[data.deliveryType] || ProductDeliveryType.Other,
      isPreSale: data.isAdvanceSale === 1,
    }
  }

  onTabChange = key => {
    this.setState({ currentTabId: key })
    this.flatListRef.current.scrollToOffset({ offset: 200 - 35.2941 })
    this.requestProductListUnderTab(key)
  }

  getCurrentTabName = memoizeOne((tabList: TabData[], currentTabId: string) => {
    const tab = tabList.find(ele => ele.key === currentTabId)
    return tab ? tab.label : '热销排行'
  })

  getFloorData = memoizeOne((
    tabList: TabData[],
    currentTabId: string,
    tabContentMap: {
      [tab: string]: [],
    },
    currentTabLoading: boolean
  ) => {
    const productsUnderCurrentTab = tabContentMap[currentTabId] || []
    return [
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
        : currentTabLoading
          ? []
          : [{ key: '$$empty', component: Empty }]),
    ]
  })

  renderFlatItem = ({ item: { component: Comp, props } }) => <Comp {...props} />

  render() {
    const { tabList, tabContentMap, tabLoadingMap, currentTabId } = this.state

    const floorData = this.getFloorData(tabList, currentTabId, tabContentMap, tabLoadingMap[currentTabId])
    const pageName = this.getCurrentTabName(tabList, currentTabId)

    return (
      <RouteContext.Provider value={{ path: '热销排行', name: pageName }}>
        <FlatList
          ref={this.flatListRef}
          style={styles.container}
          data={floorData}
          renderItem={this.renderFlatItem}
          stickyHeaderIndices={[1]}
          overScrollMode="always"
          ListFooterComponent={<View style={styles.footer} />}
          contentContainerStyle={{
            minHeight: 200 + Dimensions.get('window').height,
          }}
        />
      </RouteContext.Provider>
    )
  }
}
