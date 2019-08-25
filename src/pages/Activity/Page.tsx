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

interface Props {
  code: string // 活动编码
}

interface State {
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
  state = {
    shopCode: '',
    currentTabKey: '',
    tabList: [],
    tabContentMap: {},
    cart: {
      amount: 0,
      count: 0,
    },
  }

  componentDidMount() {
    Native.getConstant('storeCode').then(shopCode => {
      this.setState({ shopCode }, () => {
        this.requestTabList()
        this.requestCartInfo()
      })
    })
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
    const { code } = this.props
    const { shopCode } = this.state
    const { result } = await CMSServices.getActivity(code, shopCode)
    let nextState = {
      currentTabKey: '',
      tabList: result.map(ele => ({ key: ele.id, label: ele.showName })),
      tabContentMap: {},
    }
    if (result.length > 0) {
      const tab = result[0]
      Native.setTitle(tab.pageName)
      nextState.currentTabKey = tab.id
      nextState.tabContentMap = this.floorDataFormatter(tab.templateVOList)
    }
    this.setState(nextState)
  }

  requestTabContent = async tabKey => {
    const { shopCode } = this.props
    const { result } = await CMSServices.getFloorDataByTab(tabKey, shopCode)
    this.setState(({ tabContentMap }) => ({
      tabContentMap: {
        ...tabContentMap,
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
        // 广告图
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
            props: {
              products: floor.templateDetailVOList.map(ele => ({
                ...CMSServices.formatProduct(ele),
                shopCode,
              })),
              columnNumber:
                [2, 3].indexOf(floor.subType) > -1 ? floor.subType : undefined,
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

    let result = []
    if (
      currentTabContent.length > 0 &&
      currentTabContent[0].component === AdSingle
    )
      result.push(currentTabContent[0])
    if (tabList.length > 0)
      result.push({
        component: Tab,
        props: {
          data: tabList,
          currentActive: currentTabKey,
          onTabChange: this.onTabChange,
        },
      })
    result.concat(currentTabContent.slice(1))

    return result
  }

  renderFlatItem = ({ item: { component, props } }) =>
    React.createElement(React.memo(component), props)

  render() {
    const {
      cart: { amount, count },
    } = this.state
    const flatData = this.flatDataFormatter()

    return (
      <View style={styles.container}>
        <FlatList
          data={flatData}
          renderItem={this.renderFlatItem}
          keyExtractor={item => `${item.key}`}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.footerBox}>
          <Footer amount={amount} cartCount={count} />
        </View>
      </View>
    )
  }
}

Page.defaultProps = {
  shopCode: '9010',
}
