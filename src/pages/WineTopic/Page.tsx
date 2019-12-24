import * as React from 'react'
import styles from './Page.styles'
import { CMSServices } from '@services'
import { NativeModules, View } from 'react-native'
import Footer from '../Activity/components/Footer'
import WineTopicActivity from './components/WineTopic/WineTopicActivity'
import Loading from '../../components/common/Loading'
import Empty from '../Activity/components/Empty'
interface Props {
  activityCode: string // 活动编码
  shopCode?: string //门店编码
}

interface State {
  shopCode: string //门店编码
  wineActivity: {
    id: number
    tabName: string //横向tab栏的名字
    subType: number // 一行展示几列 
    categoryList: {
      categoryCode: string //分类编码
      categoryName: string //分类名称
    }[]
    tabDetailVOList: {
      code: string
      productNum: number
      categoryCode: string
    }[]
  }[]//酒专题活动数据
  cart: {
    amount: number //购物车总金额
    count: number //购物车总数量
  }
  isShowEmpty: boolean //是否展示Empty组件
}
const rnAppModule = NativeModules.RnAppModule // 原生模块
export default class Page extends React.Component<Props, State> {
  loadingRef: React.RefObject<any>;
  constructor(props) {
    super(props)

    this.state = {
      shopCode: props.shopCode,
      wineActivity: [], 
      cart: {
        amount: 0,
        count: 0,
      },
      isShowEmpty: false,
    }
    this.loadingRef = React.createRef()
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

  requestTabList = () => {
    const { activityCode: code } = this.props
    const { shopCode } = this.state
    this.loadingRef.current.showLoading()
    CMSServices.getActivity(code, shopCode)
      .then(({ result: data, message, code }) => {
        if (code === 200000 && data) {
          this.setState({
            isShowEmpty: false,
            wineActivity: data[0].templateVOList[0].tabVos,
          })
          this.loadingRef.current.hideLoading()
        } else {
          rnAppModule.showToast(message, '0')
          this.loadingRef.current.hideLoading()
          this.setState({ isShowEmpty: true })
        }
      })
      .catch(({ message }) => {
        rnAppModule.showToast(message, '0')
        this.loadingRef.current.hideLoading()
        this.setState({ isShowEmpty: true })
      })
  }
  render() {
    const {
      cart: { amount, count },
      wineActivity,
      isShowEmpty,
    } = this.state
    return (
      <View style={styles.container}>
        {wineActivity && wineActivity.length ? (
          <>
            <WineTopicActivity
              currentTabVos={wineActivity}
              shopCode={this.props.shopCode}
              afterModifyCount={this.requestCartInfo}
            />
            <View style={styles.footerBox}>
              <Footer amount={amount} cartCount={count} />
            </View>
          </>
        ) : isShowEmpty ? (
          <Empty type={1} textColor1="#4A4A4A" textColor2="#A4A4B4" />
        ) : null}
        <Loading ref={this.loadingRef} />
      </View>
    )
  }
}
