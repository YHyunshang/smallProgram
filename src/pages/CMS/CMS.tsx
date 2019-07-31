/**
 * Created by 李华良 on 2019-07-23
 */
import * as React from 'react'
import { FlatList, NativeEventEmitter, NativeModules } from 'react-native'
import TopTabFloor from './components/TopTabFloor'
import BannerFloor from './components/BannerFloor'
import BoxFloor from './components/BoxFloor'
import AdSingleFloor from './components/AdSingleFloor'
import Ad1v2Floor from './components/Ad1v2Floor'
import DividerFloor from './components/DividerFloor'
import ProductListFloor from './components/ProductListFloor'
import ProductGridFloor from './components/ProductGridFloor'
import ProductScrollFloor from './components/ProductScrollFloor'
import { CMSServices } from '@services'
import { Native, Log } from '@utils'
import styles from './CMS.styles'

const eventEmitter = new NativeEventEmitter(NativeModules.SendRNEventManager)

interface State {
  loading: Boolean  // 加载中
  shopCode: string|number  // 门店编码
  tabData: Array<object>  // 顶部 tab 数据
  floorData: Array<object>  // cms 数据
  currentTabId: number|string  // 当前选中 tab id
}

class CMS extends React.Component<{}, State> {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,

      shopCode: '',

      floorData: [],
      tabData: [],

      currentTabId: '',
    }
  }

  nativeSubscription: any

  async componentDidMount() {
    const shopCode = await Native.getConstant('storeCode')
    if (shopCode) {
      this.setState({ shopCode })
      this.requestInitData(shopCode)
    }

    // 门店变化 native 事件监听
    this.nativeSubscription = eventEmitter.addListener('storeChange', this.onNativeShopChange)
  }

  componentWillUnmount(): void {
    this.nativeSubscription && this.nativeSubscription.remove()
  }

  // 门店变化
  onNativeShopChange = ({ storeCode }) => {
    this.setState({ shopCode: storeCode })
    this.requestInitData(storeCode)
  }

  // 获取初始 CMS 数据
  requestInitData = (shopCode:string) => {
    CMSServices.getInitialData(shopCode)
      .then(({ result: data }) => {
        if (data.length === 0) {
          this.setState({
            tabData: [],
            floorData: [],
            currentTabId: '',
          })
          return
        }

        const tabData = [...data]
        const currentTabId = data[0].id
        const floorData = data[0] ? this.formatFloorData(data[0].templateVOList) : []
        this.setState({tabData, currentTabId, floorData})
      })
  }
  // 获取 tab 下的 CMS 数据
  requestFloorData = tabId =>
    CMSServices.getFloorDataByTab(tabId, this.state.shopCode)
      .then(json => {
        this.setState({ floorData: this.formatFloorData(json.result.templateVOList) })
      })
  formatFloorData = data => data
    .sort((a, b) => a.pos - b.pos)
    .filter(ele => ele.img || ele.templateDetailVOList.length > 0)

  // native 设置门店编码
  setShopData = shopCode => {
    Log.debug(`received shopData from native ${shopCode}`)
    this.setState({ shopCode })
    this.requestInitData(shopCode)
  }

  // 页面滚动
  onPageScroll = ({ nativeEvent: { contentOffset: { x, y } } }) => {
    CMSServices.pushScrollToNative(x, y)
  }

  // 选中 tab
  onTabSelect = tabObj => {
    this.setState({ currentTabId: tabObj.id })
    this.requestFloorData(tabObj.id)
  }

  renderFloors = ({ item: { id, type, subType, templateDetailVOList: tplDetailData, img } }) =>
    type === 1 ? <BannerFloor data={tplDetailData} key={id}/>  // 1: banner floor
      : type === 2 ? (  // 2: img-ad floor
        subType === 1 ? (  // 1v2 img add floor
          <AdSingleFloor
            key={id}
            image={tplDetailData[0].imgUrl}
            link={{ type: tplDetailData[0].linkType, uri: tplDetailData[0].link }}
          />)
          : subType === 2 ? <Ad1v2Floor key={id} data={tplDetailData} />  // 1 line img add floor
          : null)
      : type === 3 ? (  // 3: product floor
          subType === 1 ? <ProductListFloor data={tplDetailData} />  // product list floor
            : subType === 2 ? <ProductGridFloor key={id} data={tplDetailData} columnNum={2}/>  // product 2xn floor
            : subType === 3 ? <ProductGridFloor key={id} data={tplDetailData} columnNum={3}/>  // product 3xn floor
            : subType === 4 ? <ProductScrollFloor key={id} data={tplDetailData}/>  // product scroll floor
            : null)
      : type === 4 ? (  // 4: category floor
          subType === 1 ? <BoxFloor data={tplDetailData} countPerLine={4} key={id}/>  // 4 per row
            : subType === 2 ? <BoxFloor data={tplDetailData} countPerLine={5} key={id}/>  // 5 per row
            : null)
      : type === 5 ? <DividerFloor key={id} image={img}/>  // divider floor
      : null

  render() {
    const {
      tabData,
      floorData,
      currentTabId,
    } = this.state

    const flatHeader = tabData.length > 0 && (
      <TopTabFloor
        data={tabData}
        onTabSelect={this.onTabSelect}
        currentActiveTabId={currentTabId}
        isHeaderCollapsed={false}
      />
    )

    return (
        <FlatList
          data={floorData}
          ListHeaderComponent={flatHeader}
          horizontal={false}
          refreshing={true}
          keyExtractor={item => `${item.id}`}
          renderItem={this.renderFloors}
          showsVerticalScrollIndicator={false}
        />
    )
  }
}

export default CMS
