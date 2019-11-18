/*
 * @Descripttion: 潮物达人活动页面
 * @Author: yuwen.liu
 * @Date: 2019-11-12 20:30:43
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-13 18:47:03
 */
import * as React from 'react'
import styles from './Activity.styles'
import { CMSServices } from '@services'
import Carousel from '@components/business/Content/Carousel'
import AdSingle from '@components/business/Content/AdSingle'
import Ad1v2 from '@components/business/Content/Ad1v2'
import Ad1v1 from '@components/business/Content/Ad1v1'
import ProductList from '@components/business/Content/ProductList'
import ProductListItem from '@components/business/Content/ProductListItem'
import ProductGridItem, {Props as ProductGridItemProps,} from '@components/business/Content/ProductGridItem'
import ProductSwiper from '@components/business/Content/ProductSwiper'
import Box from '@components/business/Content/Box'
import Divider from '@components/business/Content/Divider'
import { FlatList, View, Text ,ScrollView} from 'react-native';
import { Native } from '@utils'
import TopTab from './components/TopTab'
import LeftTab from './components/LeftTab'
import Empty from '../Activity/components/Empty'
import Footer from '../Activity/components/Footer'
import Loading from '../../components/common/Loading'
interface Props {
  activityCode: string // 活动编码
  shopCode?: string,
  afterModifyCount: Function
}

interface State {
  loading: boolean
  shopCode: string
  total: number,
  currentTabKey: string
  tabList: {
    key: string
    label: string
  }[]
  tabContentMap: {
    [tabKey: string]: {}[]
  }
  products:{}[],
  topTabList:{
    key: string
    label: string
  }[],
  leftTabList:{
    key: string
    label: string
  }[],
  cart: {
    amount: number
    count: number
  }
}

export default class Activity extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      total:0,
      shopCode: props.shopCode,
      currentTabKey: '402',
      tabList: [],
      products: [],
      tabContentMap: {},
      cart: {
        amount: 0,
        count: 0,
      },
      topTabList:[{"key":'401',"label":"日韩馆"},{"key":'402',"label":'特色小吃'},{"key":'403',"label":"地方特产"},{"key":'404',"label":"奇珍好物"},{"key":'405',"label":"新奇稀品"},{"key":'406',"label":"烧烤"}],
      leftTabList:[{"key":'301',"label":"水果"},{"key":'302',"label":'蔬菜'},{"key":'303',"label":"肉禽类"},{"key":'34',"label":"海鲜水产"},{"key":'305',"label":"粮油调味"},{"key":'306',"label":"熟食卤味"}]    
    }
  }
  // const styles = useTheme(theme || '2x')
  /**
   * @msg: tab栏item改变触发的事件
   * @param {key} 
   */
  onTabChange = key => {
    this.setState({ currentTabKey: key })
  }
 /**
   * @msg: 请求购物车数据
   * @param {key} 
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
  renderGridItemData = ({item}) => (
      <ProductGridItem
          {...item}
          // theme={{ 2: '2x', 3: '3x' }[2]}
          afterModifyCount={this.requestCartInfo}
      />
  )
  _keyExtractor = (item, index) => index
  /**
   * @msg: FlatList渲染的数据项
   */
  renderItemData = ({item, index}) => (
    // <View style={styles.productBox}>
    //     <View style={styles.productWrapper} key={item.code}>
    //       <ProductListItem {...item} afterModifyCount={this.requestCartInfo} />
    //       {index < this.state.total - 1 && <View style={styles.fakeBorder}></View>}
    //     </View>
    //  </View>
        <View style={styles.productBox}>
           <FlatList
              data={this.state.products}
              numColumns={3}
              horizontal={false}
              renderItem={this.renderGridItemData}
              keyExtractor={item => item.code}
            />
        </View>

  )
  componentDidMount() {
    Native.setTitle('潮物达人')
    let templateDetailVOList=[
      {
        cartId: null,
        code: "1125124",
        id: 213245,
        imgUrl: "http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-09-30|6337307132483866624",
        inventoryLabel: null,
        label: "",
        labelList: ["9.5折"],
        link: null,
        linkType: null,
        name: "海天下凤尾南美虾仁",
        pos: 5,
        price: 3750,
        productDesc: "",
        productNum: null,
        productSpecific: "180g",
        productUnit: "包",
        promotionPrice: 3580,
        remark: null,
        resProdcutNoteNewVO: null,
        templateId: 20495
      },
      {
        cartId: null,
        code: "744759",
        id: 213240,
        imgUrl: "http://hotfile.yonghui.cn/files/|cephdata|filecache|YHYS|YHYS|2019-10-28|5814040396707143680",
        inventoryLabel: null,
        label: "",
        labelList: ["7.0折"],
        link: null,
        linkType: null,
        name: "安井台湾风味葱香味手抓饼",
        pos: 6,
        price: 2080,
        productDesc: "酥酥软软 三分钟搞定早餐",
        productNum: null,
        productSpecific: "900g",
        productUnit: "袋",
        promotionPrice: 1460,
        remark: null,
        resProdcutNoteNewVO: null,
        templateId: 20495
      }
    ]
    let products=templateDetailVOList.map(ele => ({
      ...CMSServices.formatProduct(ele),
      disableSync: true,
      shopCode:'9010'
    }))
    const total = products.length
    this.setState({products,total})
  }

  render() {
    const{currentTabKey,loading,products,topTabList,leftTabList}=this.state
    let currentActive=currentTabKey
    return (
      <View style={styles.container}>
        <TopTab currentActive={currentActive} data={topTabList} onTabChange={this.onTabChange}></TopTab>
        <View style={styles.centerWrapper}>
            {/* <LeftTab currentActive={currentActive} data={leftTabList} onTabChange={this.onTabChange}></LeftTab>         */}
            <FlatList
              style={styles.flatList}
              data={products}
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
          <Footer amount={10} cartCount={20} />     
        </View>  
      </View>
    )
  }
}
