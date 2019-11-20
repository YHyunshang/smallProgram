/*
 * @Descripttion: 潮物达人活动页面
 * @Author: yuwen.liu
 * @Date: 2019-11-12 20:30:43
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-20 10:10:40
 */
import * as React from 'react'
import styles from './Activity.styles'
import { CMSServices } from '@services'
import ProductListItem from '@components/business/Content/ProductListItem'
import ProductGridItem, {
  Props as ProductGridItemProps,
} from '@components/business/Content/ProductGridItem'
import chunk from 'lodash/chunk'
import { FlatList, View, Text, ScrollView, Alert } from 'react-native'
import { Native } from '@utils'
import TopTab from './components/TopTab'
import LeftTab from './components/LeftTab'
import Empty from '../Activity/components/Empty'
import Footer from '../Activity/components/Footer'
import Loading from '../../components/common/Loading'
import useTheme from '../../components/business/Content/ProductGrid.styles'
interface Props {
  activityCode: string // 活动编码
  shopCode?: string
  afterModifyCount: Function
}

interface State {
  loading: boolean
  shopCode: string
  total: number
  gridTotal: number
  currentTabKey: string
  // tabList: {
  //   key: string
  //   label: string
  // }[]
  tabContentMap: {
    [tabKey: string]: {}[]
  }
  products: {}[]
  gridProducts: {}[]
  topTabList: {
    key: string
    label: string
  }[]
  leftTabList: {
    key: string
    label: string
  }[]
  cart: {
    amount: number
    count: number
  }
  showBar: boolean
  columnNumber: number
  theme: string
  themeStyles: {
    row: {}
    column: {}
    productBox: {}
    container: {}
    rowNotLast: {}
    columnNotLast: {}
  }
}

export default class Activity extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      total: 0,
      gridTotal: 0,
      shopCode: props.shopCode,
      currentTabKey: '402',
      // tabList: [],
      products: [],
      gridProducts: [],
      tabContentMap: {},
      cart: {
        amount: 0,
        count: 0,
      },
      columnNumber: 1, // 1 列表模式 2 一行两个 3 一行三个
      showBar: true, // 是否显示侧边栏 true显示 false 不显示
      theme: '', // 运用的主题具体是一行展示几个商品
      themeStyles: {
        row: {},
        column: {},
        productBox: {},
        container: {},
        rowNotLast: {},
        columnNotLast: {},
      },
      topTabList: [
        { key: '401', label: '日韩馆' },
        { key: '402', label: '特色小吃' },
        { key: '403', label: '地方特产' },
        { key: '404', label: '奇珍好物' },
        { key: '405', label: '新奇稀品' },
        { key: '406', label: '烧烤' },
      ],
      leftTabList: [
        { key: '301', label: '水果' },
        { key: '302', label: '蔬菜' },
        { key: '303', label: '肉禽类' },
        { key: '34', label: '海鲜水产' },
        { key: '305', label: '粮油调味' },
        { key: '306', label: '熟食卤味' },
      ],
    }
  }
  /**
   * @msg: tab栏item改变触发的事件
   * @param {key}
   */
  onTabChange = key => {
    this.setState({ currentTabKey: key })
  }
  /**
   * @msg: 请求购物车数据
   */
  requestCartInfo = async () => {
    const { shopCode } = this.state
    const { result } = await CMSServices.getCartInfo(shopCode)
    this.setState({
      cart: {
        count: result.totalNum,
        amount: result.totalAmount,
      },
    })
  }
  /**
   * @msg: 渲染每行的数据
   */
  renderGridItemData = products =>
    products.map((product, colIdx) => (
      <View
        style={[
          this.state.showBar ? styles.noBar : this.state.themeStyles.column,
          colIdx % this.state.columnNumber < this.state.columnNumber - 1 &&
            this.state.themeStyles.columnNotLast,
        ]}
        key={product.code}
      >
        <View style={[this.state.themeStyles.productBox]}>
          <ProductGridItem
            {...product}
            theme={this.state.theme}
            afterModifyCount={this.requestCartInfo}
          />
        </View>
      </View>
    ))
  _keyExtractor = (item, index) => index
  /**
   * @msg: FlatList渲染的数据项
   */
  renderItemData = ({ item, index }) =>
    this.state.columnNumber === 1 ? (
      <View style={styles.productBox}>
        <View style={styles.productWrapper} key={item.code}>
          <ProductListItem {...item} afterModifyCount={this.requestCartInfo} />
          {index < this.state.total - 1 && (
            <View style={styles.fakeBorder}></View>
          )}
        </View>
      </View>
    ) : (
      <View style={this.state.themeStyles.container}>
        <View
          style={[
            this.state.themeStyles.row,
            index < this.state.gridTotal - 1 &&
              this.state.themeStyles.rowNotLast,
          ]}
          key={index}
        >
          {this.renderGridItemData(item)}
        </View>
      </View>
    )
  /**
   * @msg: 获取潮物达人活动页数据
   */
  requestActivityData = async () => {
    const { activityCode: code } = this.props
    const { shopCode } = this.state
    this.setState({ loading: true })
    let res
    try {
      res = await CMSServices.getActivity(code, shopCode)
    } finally {
      this.setState({ loading: false })
    }

    const { result } = res
    let nextState = {
      currentTabKey: '',
      topTabList: result.map(ele => ({
        key: ele.id,
        label: ele.showName,
      })),
      tabContentMap: {},
    }
    if (result.length > 0) {
      const tab = result[0]
      Native.setTitle(tab.pageName || '优选商品')
      nextState.currentTabKey = tab.id
      nextState.tabContentMap = {
        [tab.id]: this.dataFormat(tab.templateVOList),
      }
    }
    this.setState(nextState)
  }
  /**
   * @msg: 对潮物达人数据进行格式处理
   */
  dataFormat = data => {
    data
      .sort((a, b) => a.pos - b.pos) // step 1: 排序
      .filter(
        // step 2: 过滤掉空数据
        ele =>
          ele.img ||
          (ele.templateDetailVOList && ele.templateDetailVOList.length > 0)
      )
  }
  componentDidMount() {
    Native.setTitle('潮物达人')
    let templateDetailVOList = [
      {
        cartId: null,
        code: '1125124',
        id: 213245,
        imgUrl:
          'http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-09-30|6337307132483866624',
        inventoryLabel: null,
        label: '',
        labelList: ['9.5折'],
        link: null,
        linkType: null,
        name: '海天下凤尾南美虾仁',
        pos: 5,
        price: 3750,
        productDesc: '',
        productNum: null,
        productSpecific: '180g',
        productUnit: '包',
        promotionPrice: 3580,
        remark: null,
        resProdcutNoteNewVO: null,
        templateId: 20495,
      },
      {
        cartId: null,
        code: '744759',
        id: 213240,
        imgUrl:
          'http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-10-28|5814040396707143680',
        inventoryLabel: null,
        label: '',
        labelList: ['7.0折'],
        link: null,
        linkType: null,
        name: '安井台湾风味葱香味手抓饼',
        pos: 6,
        price: 2080,
        productDesc: '酥酥软软 三分钟搞定早餐',
        productNum: null,
        productSpecific: '900g',
        productUnit: '袋',
        promotionPrice: 1460,
        remark: null,
        resProdcutNoteNewVO: null,
        templateId: 20495,
      },
      {
        cartId: null,
        code: '317001',
        id: 243077,
        imgUrl:
          'http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-08-27|7083850274447552512',
        inventoryLabel: null,
        label: '',
        labelList: ['5.9折'],
        link: null,
        linkType: null,
        name: '金龙鱼葵花油',
        pos: 4,
        price: 2990,
        productDesc: '',
        productNum: null,
        productSpecific: '1.8L',
        productUnit: '瓶',
        promotionPrice: 1790,
        remark: null,
        resProdcutNoteNewVO: null,
        templateId: 23854,
      },
      {
        cartId: null,
        code: '453376',
        id: 243081,
        imgUrl:
          'http://hotfile-cdn.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-06-28|1953323563805052928',
        inventoryLabel: null,
        label: '',
        labelList: ['6.3折'],
        link: null,
        linkType: null,
        name: '哈尔滨小麦王啤酒听装',
        pos: 8,
        price: 1880,
        productDesc: '泡沫丰富  口感醇厚',
        productNum: null,
        productSpecific: '330ml*6',
        productUnit: '组',
        promotionPrice: 1190,
        remark: null,
        resProdcutNoteNewVO: null,
        templateId: 23854,
      },
      {
        cartId: null,
        code: '1042792',
        id: 243083,
        imgUrl:
          'http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-09-20|7917069566465806336',
        inventoryLabel: null,
        label: '',
        labelList: ['5.0折'],
        link: null,
        linkType: null,
        name: '优颂竹纤维3层软抽纸',
        pos: 10,
        price: 1980,
        productDesc: '自然舒适 细腻柔软',
        productNum: null,
        productSpecific: '120抽X6包',
        productUnit: '提',
        promotionPrice: 1000,
        remark: null,
        resProdcutNoteNewVO: null,
        templateId: 23854,
      },
    ]
    let products = templateDetailVOList.map(ele => ({
      ...CMSServices.formatProduct(ele),
      disableSync: true,
      shopCode: '9010',
    }))
    const total = products.length
    const columnNumber = 2
    const theme = { 2: '2x', 3: '3x' }[columnNumber]
    const themeStyles = useTheme(theme || '2x')
    const gridProducts = chunk(products, columnNumber)
    const gridTotal = gridProducts.length
    this.setState({
      products,
      total,
      gridProducts,
      gridTotal,
      columnNumber,
      theme,
      themeStyles,
    })
    this.requestActivityData()
    this.requestCartInfo()
  }

  render() {
    const {
      currentTabKey,
      loading,
      products,
      topTabList,
      leftTabList,
      showBar,
      cart: { amount, count },
    } = this.state
    let currentActive = currentTabKey
    return (
      <View style={styles.container}>
        <TopTab
          currentActive={currentActive}
          data={topTabList}
          onTabChange={this.onTabChange}
        />
        <View style={styles.centerWrapper}>
          {showBar && (
            <LeftTab
              currentActive={currentActive}
              data={leftTabList}
              onTabChange={this.onTabChange}
            />
          )}
          <FlatList
            style={styles.flatList}
            data={
              this.state.columnNumber === 1 ? products : this.state.gridProducts
            }
            renderItem={this.renderItemData}
            keyExtractor={this._keyExtractor}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            refreshing={false}
            onRefresh={this.componentDidMount.bind(this)}
            ListEmptyComponent={loading ? Loading : Empty}
          />
        </View>
        <View style={styles.footerBox}>
          <Footer amount={amount} cartCount={count} />
        </View>
      </View>
    )
  }
}
