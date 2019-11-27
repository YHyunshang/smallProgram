import * as React from 'react'
import styles from './Page.styles'
import { CMSServices } from '@services'
import Carousel from '@components/business/Content/Carousel'
import AdSingle from '@components/business/Content/AdSingle'
import Ad1v2 from '@components/business/Content/Ad1v2'
import Ad1v1 from '@components/business/Content/Ad1v1'
import ProductList from '@components/business/Content/ProductList'
import ProductGrid from '@components/business/Content/ProductGrid'
import ProductSwiper from '@components/business/Content/ProductSwiper'
import Box from '@components/business/Content/Box'
import Divider from '@components/business/Content/Divider'
import { FlatList, View } from 'react-native'
import { Native } from '@utils'
import Tab from './components/Tab'
import Footer from './components/Footer'
import Empty from './components/Empty'
import TideManActivity from './components/TideMan/TideManActivity'
import AdTitle from '@components/business/Content/AdTitle'

interface Props {
  activityCode: string // 活动编码
  shopCode?: string
}

interface State {
  loading: boolean
  shopCode: string
  currentTabKey: string
  tabList: {
    key: string
    label: string
  }[]
  tabContentMap: {
    [tabKey: string]: {}[]
  }
  cart: {
    amount: number
    count: number
  }
}

export default class Page extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      shopCode: props.shopCode,
      currentTabKey: '',
      tabList: [],
      tabContentMap: {},
      cart: {
        amount: 0,
        count: 0,
      },
    }
  }

  componentDidMount() {
    this.requestTabList()
    this.requestCartInfo()
  }

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

  requestTabList = async () => {
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
      tabList: result.map(ele => ({ key: ele.id, label: ele.showName })),
      tabContentMap: {},
    }
    if (result.length > 0) {
      const tab = result[0]
      Native.setTitle(tab.pageName || '优选商品')
      nextState.currentTabKey = tab.id
      nextState.tabContentMap = {
        [tab.id]: this.floorDataFormatter(tab.templateVOList),
      }
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

    this.setState(({ tabContentMap: preTabContentMap }) => ({
      tabContentMap: {
        ...preTabContentMap,
        [tabKey]: this.floorDataFormatter(result.templateVOList),
      },
    }))
  }

  floorDataFormatter = data => {
      const tabVos= [{
        id: 401,
        tabName: '日韩馆',
        showBar: true,
        subType: 1,
        categoryList:[
          {categoryCode:'all',categoryName:'全部'}
          ,{categoryCode:1001,categoryName:'水果'}
          ,{categoryCode:1002,categoryName:'蔬菜'}
          ,{categoryCode:1003,categoryName:'肉禽类'}
          ,{categoryCode:1004,categoryName:'海鲜水产'}
          ,{categoryCode:1005,categoryName:'粮油调味'}
          ,{categoryCode:1006,categoryName:'熟食卤味'}
        ],
        tabDetailVOList:[
          {
            cartId: null,
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            code: '1125124',
            id: 213245,
            categoryCode:1005,
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
            categoryCode:1001,
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
            categoryCode:1002,
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
            categoryCode:1003,
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
            categoryCode:1004,
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
          }
        ]
      },
      {
        id: 402,
        tabName: '特色小吃',
        showBar: false,
        subType: 3,
        categoryList:[
          {categoryCode:'all',categoryName:'全部'}
          ,{categoryCode:2001,categoryName:'清洗护理'}
          ,{categoryCode:2002,categoryName:'运动时尚'}
          ,{categoryCode:2003,categoryName:'休闲娱乐'}
          ,{categoryCode:2004,categoryName:'海鲜水产'}
        ],
        tabDetailVOList:[
          {
            cartId: null,
            code: '1125124',
            id: 213245,
            categoryCode:2001,
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
            categoryCode:2002,
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
            categoryCode:2003,
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
            categoryCode:2003,
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
          }
        ]
      }
    ]
    let sortedData = data
      .sort((a, b) => a.pos - b.pos) // step 1: 排序
      .filter(
        // step 2: 过滤掉空数据
        ele =>
          ele.img ||
          (ele.tabVos && ele.tabVos.length > 0) ||
          (ele.templateDetailVOList && ele.templateDetailVOList.length > 0)
      )

    // step 3: 整合成组件
    const { shopCode } = this.props
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
          props: {
            imageHeight: 150,
            data: floor.templateDetailVOList.map(ele => ({
              key: ele.id,
              image: ele.imgUrl,
              link: CMSServices.formatLink(ele),
            })),
          },
        })
      } else if (floor.type === 2) {
        // 广告标题
        if (floor.title && !(i === 0 && floor.subType === 1)) {
          result.push({
            key: `c-ad-${floor.id}-title`,
            component: AdTitle,
            props: {
              children: floor.title,
              link: CMSServices.formatLink({
                linkType: floor.titleLinkType,
                link: floor.titleLink,
              }),
            },
          })
        }
        if (floor.subType === 1) {
          // 单张广告图
          const imgObj = floor.templateDetailVOList[0]
          result.push({
            key: floor.id,
            component: AdSingle,
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
            props: {
              products: floor.templateDetailVOList.map(ele => ({
                ...CMSServices.formatProduct(ele),
                disableSync: true,
                shopCode,
              })),
              columnNumber:
                [2, 3].indexOf(floor.subType) > -1 ? floor.subType : undefined,
              afterModifyCount: this.requestCartInfo,
            },
          })
      } else if (floor.type === 4 && [1, 2].indexOf(floor.subType) !== -1) {
        // 分类入口，宫格
        result.push({
          key: floor.id,
          component: Box,
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
          props: {
            image: floor.img,
          },
        })
      } if (floor.type === 2) {
        // 潮物达人组件
        result.push({
          key: floor.id,
          component: TideManActivity,
          props: {
            tabVos: tabVos,
            shopCode,
            componentDidMount: this.componentDidMount,
            afterModifyCount: this.requestCartInfo,
          },
        })
      }
      i++
    }

    return result
  }

  onTabChange = key => {
    this.setState({ currentTabKey: key })
    this.requestTabContent(key)
  }

  flatDataFormatter = () => {
    const { currentTabKey, tabList, tabContentMap } = this.state
    const currentTabContent = tabContentMap[currentTabKey] || []

    if (tabList.length > 1 && currentTabContent.length > 0) {
      const tabComp = {
        key: '$$tab',
        component: Tab,
        props: {
          data: tabList,
          currentActive: currentTabKey,
          onTabChange: this.onTabChange,
        },
      }
      return currentTabContent[0].component === AdSingle
        ? [currentTabContent[0], tabComp, ...currentTabContent.slice(1)]
        : [tabComp, ...currentTabContent]
    }
    return currentTabContent
  }

  renderFlatItem = ({ item: { component: Comp, props } }) =>
    React.createElement(Comp, props)

  render() {
    const {
      cart: { amount, count },
      loading,
    } = this.state
    const flatData = this.flatDataFormatter()
    const stickyHeaderIndices = flatData.findIndex(ele => ele.component === Tab)

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={flatData}
          renderItem={this.renderFlatItem}
          keyExtractor={item => `${item.key}`}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={
            stickyHeaderIndices === -1 ? [] : [stickyHeaderIndices]
          }
          removeClippedSubviews={false}
          refreshing={false}
          onRefresh={this.componentDidMount.bind(this)}
          ListEmptyComponent={loading ? null : Empty}
        />
        <View style={styles.footerBox}>
          <Footer amount={amount} cartCount={count} />
        </View>
      </View>
    )
  }
}
