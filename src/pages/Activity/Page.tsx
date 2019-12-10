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
import Loading from '../../components/common/Loading'
import withHistory from "@HOC/withHistory";

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
    [tabKey: string]: {}[]
  }
  cart: {
    amount: number
    count: number
  }
}

// @ts-ignore: hoc can wrap class-styled components
@withHistory({ path: '活动页', name: '活动页' })
export default class Page extends React.Component<Props, State> {
  loading: any
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      isFirst: true,
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
    const { shopCode, isFirst } = this.state
    this.setState({ loading: true })
    isFirst ? this.loading.showLoading() : ''
    let res
    try {
      res = await CMSServices.getActivity(code, shopCode)
    } finally {
      this.setState({ loading: false, isFirst: false })
      this.loading.hideLoading()
    }

    const { result } = res
    let nextState = {
      currentTabKey: '',
      tabList: result.map(item => ({ key: item.id, label: item.showName })),
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
      } else if (floor.type === 8) {
        // 潮物达人组件
        result.push({
          key: floor.id,
          component: TideManActivity,
          props: {
            tabVos: floor.tabVos,
            shopCode,
            afterModifyCount: this.requestCartInfo,
            requestTabList: this.requestTabList,
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
          ListEmptyComponent={
            loading ? null : (
              <Empty type={1} textColor1="#4A4A4A" textColor2="#A4A4B4" />
            )
          }
        />
        <View style={styles.footerBox}>
          <Footer amount={amount} cartCount={count} />
        </View>
        <Loading ref={ref => (this.loading = ref)}></Loading>
      </View>
    )
  }
}