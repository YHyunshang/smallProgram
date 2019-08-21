/**
 * Created by 李华良 on 2019-07-23
 */
import * as React from 'react'
import {
  View,
  Animated,
} from 'react-native'
import { CMSServices } from '@services'
import { Native, Log } from '@utils'
import styles from './Page.styles'
import CMSComp from '@components/business/CMS'
import Tab from './components/Tab'

enum PageType {
  HOME = 'home',
  ACTIVITY = 'activity',
}

interface Props {
  type: PageType // CMS 页面类型
  activityCode?: string // 活动编码，type 为 activity 时必传
  shopCode?: string // 门店编码，type 为 activity 时必传
}

interface State {
  loading: boolean // 加载中
  shopCode: string // 门店编码
  currentTabIdx: number // 当前激活的 tab index
  tabList: {}[] // tab 列表
  tabFloorMap: {
    // tab key - cms 数据映射
    [tabId: string]: {}
  }
  tabLoadingMap: {
    // tab 下数据是否在加载中
    [tabId: string]: boolean
  }
  pageHeight: number // 页面高度

  animatedValRefCmsScroll: Animated.AnimatedValue
}

class Page extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    type: PageType.HOME,
  }

  state = {
    loading: false,
    shopCode: '',
    currentTabIdx: 0,
    tabList: [],
    tabFloorMap: {},
    tabLoadingMap: {},
    pageHeight: 0,
    animatedValRefCmsScroll: new Animated.Value(0),
  }

  nativeSubscription: { remove: Function }

  async componentDidMount() {
    this.init()
  }

  componentDidUpdate(preProps, preState, snapshot) {
    if (
      this.props.type !== preProps.type ||
      ((this.props.type === PageType.ACTIVITY &&
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
    this.props.type === PageType.HOME
      ? this.initHome()
      : this.props.type === PageType.ACTIVITY
      ? this.initActivity()
      : null

  // 首页 CMS 初始化
  async initHome() {
    let { shopCode } = this.state
    if (!shopCode) {
      shopCode = await Native.getConstant('storeCode')
    }

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
    this.setState({ shopCode })
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

    this.setState(preState => ({
      currentTabIdx: 0,
      tabList: data,
      tabFloorMap: {
        ...preState.tabFloorMap,
        ...(data.length > 0
          ? { [data[0].id]: this.formatFloorData(data[0].templateVOList) }
          : {}),
      },
      tabLoadingMap: {
        ...preState.tabLoadingMap,
        ...(data.length > 0 ? { [data[0].id]: false } : {}),
      },
    }))
  }
  // 获取 tab 下的 CMS 数据
  requestFloorData = async tabId => {
    this.setState(({ tabLoadingMap }) => ({
      tabLoadingMap: { ...tabLoadingMap, [tabId]: true },
    }))

    let data
    try {
      data = await CMSServices.getFloorDataByTab(tabId, this.state.shopCode)
    } finally {
      this.setState(({ tabLoadingMap }) => ({
        tabLoadingMap: { ...tabLoadingMap, [tabId]: false },
      }))
    }

    const { result } = data
    if (result) {
      this.setState(({ tabFloorMap }) => ({
        tabFloorMap: {
          ...tabFloorMap,
          [tabId]: this.formatFloorData(result.templateVOList),
        },
      }))
    }
  }
  // 获取活动数据
  requestActivityData = async (activityCode, shopCode) => {
    const { result: data } = await CMSServices.getActivity(
      activityCode,
      shopCode
    )
    this.setState({
      tabList: data,
      tabFloorMap:
        data.length === 0
          ? {}
          : { [data[0].id]: this.formatFloorData(data[0].templateVOList) },
      currentTabIdx: 0,
    })
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

  onRootLayout = ({ nativeEvent: { layout } }) => {
    this.setState({ pageHeight: layout.height })
  }

  // 页面滚动
  onPageScroll = ({
    nativeEvent: {
      contentOffset: { x, y },
    },
  }) => {
    CMSServices.pushScrollToNative(x, y)
  }

  onTabChange = idx => {
    this.setState({ currentTabIdx: idx })
    const { tabList, tabFloorMap } = this.state
    const currentTab = tabList[idx]
    if (currentTab && (tabFloorMap[currentTab.id] || []).length === 0) {
      this.requestFloorData(currentTab.id)
    }
  }

  private renderHomeFloorItems = ({
    item: { tabList, tabFloorMap, tabLoadingMap, currentTabIdx },
  }) => {
    const { pageHeight, animatedValRefCmsScroll } = this.state
    const event = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: animatedValRefCmsScroll,
          },
        },
      },
    ])
    const renderScene = ({ route: { key: tabId } }) => (
      <CMSComp
        keyPrefix={tabId}
        data={tabFloorMap[tabId] || []}
        loading={tabLoadingMap[tabId] || false}
        onRefresh={
          tabId === tabList[0].id
            ? undefined
            : () => this.requestFloorData(tabId)
        }
        onScroll={event}
      />
    )

    return (
      <Tab
        currentTabIndex={currentTabIdx}
        tabs={tabList}
        renderScene={renderScene}
        height={pageHeight}
        onTabIndexChange={this.onTabChange}
        animatedVal={animatedValRefCmsScroll}
      />
    )
  }

  // todo: activity floor item render
  renderActivityFloorItems = ({ item }) => null

  render() {
    const { type } = this.props
    const { tabList, tabFloorMap, tabLoadingMap, currentTabIdx } = this.state

    return (
      <View style={styles.container} onLayout={this.onRootLayout}>
        {this.renderHomeFloorItems({
          item: {
            tabList,
            tabFloorMap,
            tabLoadingMap,
            currentTabIdx,
          },
        })}
      </View>
    )
  }
}

export default Page
