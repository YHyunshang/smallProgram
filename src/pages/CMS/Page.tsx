/**
 * Created by 李华良 on 2019-07-23
 */
import * as React from 'react'
import { View, findNodeHandle } from 'react-native'
import { CMSServices } from '@services'
import { Native, Log } from '@utils'
import styles from './Page.styles'
import LinearGradient from 'react-native-linear-gradient'
import CMSComp from './components'

enum CMSType {
  HOME = 'home',
  ACTIVITY = 'activity',
}

interface Props {
  type: CMSType // CMS 页面类型
  activityCode?: string // 活动编码，type 为 activity 时必传
  shopCode?: string // 门店编码，type 为 activity 时必传
}

interface State {
  loading: boolean // 加载中
  shopCode: string | number // 门店编码
  tabData: object[] // 顶部 tab 数据
  floorData: any[] // cms 数据
  currentTabId: number | string // 当前选中 tab id
}

class CMS extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    Log.debug(props)

    this.state = {
      loading: false,
      shopCode: '',
      floorData: [],
      tabData: [],
      currentTabId: '',
    }
  }

  static defaultProps = {
    type: CMSType.HOME,
  }

  nativeSubscription: { remove: Function }

  async componentDidMount() {
    this.init()
  }

  componentDidUpdate(preProps, preState, snapshot) {
    if (
      this.props.type !== preProps.type ||
      ((this.props.type === CMSType.ACTIVITY &&
        this.props.activityCode !== preProps.activityCode) ||
        this.props.shopCode !== preProps.shopCode)
    ) {
      this.init()
    }
  }

  componentWillUnmount(): void {
    this.nativeSubscription && this.nativeSubscription.remove()
  }

  init = () =>
    this.props.type === CMSType.HOME
      ? this.initHome()
      : this.props.type === CMSType.ACTIVITY
      ? this.initActivity()
      : null

  // 首页 CMS 初始化
  async initHome() {
    const shopCode = await Native.getConstant('storeCode')
    if (shopCode) {
      this.setState({ shopCode })
      this.requestInitData(shopCode)
    }

    // 门店变化 native 事件监听
    this.nativeSubscription = CMSServices.subscriptShopChange(
      this.onNativeShopChange
    )
  }

  initActivity() {
    const { shopCode, activityCode } = this.props
    this.requestActivityData(activityCode, shopCode)
  }

  // 门店变化
  onNativeShopChange = ({ storeCode }) => {
    Log.debug(storeCode)
    if (storeCode !== this.state.shopCode) {
      this.setState({ shopCode: storeCode })
      this.requestInitData(storeCode)
    }
  }

  // 获取初始 CMS 数据
  requestInitData = async (shopCode: string) => {
    this.setState({ loading: true })
    let data
    try {
      data = (await CMSServices.getInitialData(shopCode)).result
    } finally {
      this.setState({ loading: false })
    }

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
    const curTabFloorData = data[0]
      ? this.formatFloorData(data[0].templateVOList)
      : []
    this.setState(({ floorData }) => ({
      tabData,
      currentTabId,
      floorData: { ...floorData, [currentTabId]: curTabFloorData },
    }))
  }
  // 获取 tab 下的 CMS 数据
  requestFloorData = async tabId => {
    const { result } = await CMSServices.getFloorDataByTab(
      tabId,
      this.state.shopCode
    )
    if (result.length === 0) {
      this.setState(({ floorData }) => ({
        floorData: {
          ...floorData,
          [tabId]: [],
        },
      }))
      return
    }
    this.setState(({ floorData }) => ({
      floorData: {
        ...floorData,
        [tabId]: this.formatFloorData(result.templateVOList),
      },
    }))
  }
  // 获取活动数据
  requestActivityData = async (activityCode, shopCode) => {
    const { result: data } = await CMSServices.getActivity(
      activityCode,
      shopCode
    )
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
    const curTabFloorData = data[0]
      ? this.formatFloorData(data[0].templateVOList)
      : []
    this.setState(({ floorData }) => ({
      tabData,
      currentTabId,
      floorData: { ...floorData, [currentTabId]: curTabFloorData },
    }))
    Native.setTitle((data[0] || {}).pageName)
  }
  formatFloorData = data =>
    data
      .sort((a, b) => a.pos - b.pos)
      .filter(ele => ele.img || ele.templateDetailVOList.length > 0)

  // native 设置门店编码
  setShopData = shopCode => {
    Log.debug(`received shopData from native ${shopCode}`)
    this.setState({ shopCode })
    this.requestInitData(shopCode)
  }

  // 页面滚动
  onPageScroll = ({
    nativeEvent: {
      contentOffset: { x, y },
    },
  }) => {
    CMSServices.pushScrollToNative(x, y)
  }

  // 选中 tab
  onTabSelect = tabObj => {
    this.setState({ currentTabId: tabObj.id })
    this.requestFloorData(tabObj.id)
  }

  render() {
    const { loading, tabData, floorData, currentTabId } = this.state
    const { type } = this.props

    return (
      <View style={styles.container}>
        <CMSComp
          loading={loading}
          tabData={tabData}
          floorData={floorData[currentTabId] || []}
          currentTabId={currentTabId}
          onTabSelect={this.onTabSelect}
          isActivity={type === CMSType.ACTIVITY}
          onRefresh={this.init}
        />
      </View>
    )
  }
}

export default CMS
