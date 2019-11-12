/*
 * @Description: 茅台预购页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-28 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-12 15:00:50
 */
import React from 'react'
import {ScrollView, View, Text, Image, NativeModules, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Native, Img} from '@utils'
import throttle from 'lodash/throttle'
import styles from './PreviewPurchase.styles'
import {transPenny} from '../../utils/FormatUtil'
import {yellowWarn, soldOutDefault, noActivity} from '@const/resources'
import TopBannerImage from '../../components/common/TopBannerImage'
import Loading from '../../components/common/Loading'
import ProgressBar from '../../components/business/Moutai/ProgressBar'
import OperateNumber from '../../components/business/Moutai/OperateNumber'
import StoreModal from '../../components/business/Moutai/StoreModal'
import RuleModal from '../../components/business/Moutai/RuleModal'
import PercentageCircle from 'react-native-percentage-circle'
import FastImage from 'react-native-fast-image'
import {
  subscriptRuleModalChange,
  getPurchaseActivity,
  getRuleDescription,
  getReservationShopList,
  handleOrderAmount,
  subscriptRefreshMouTaiActivity
} from '../../services/mouTaiActivity'
const rnAppModule = NativeModules.RnAppModule// 原生模块

export default class PreviewPurchase extends React.Component {
  constructor(props) {
    super(props)
    this.handleThrottledOrderAmount = throttle(this.handleThrottledOrderAmount, 500)
    this.state = {
      isActivity: false, // 是否有茅台活动
      isRuleFirst: true, // 是否是第一次请求规则接口
      isStoreFirst: true, // 是否是第一次请求预约门店接口
      activityCode: '', // 活动code
      productCode: '', // 商品code
      shopCode: '', // 门店code
      preOrderNo: '', // 预订号
      buyQuantity: 1, // 购买数量
      ruleList: [''], // 规则内容list
      storeList: [''], // 门店list
      percent: 0,
      exchangeInfoVO: {
        integralExchangeUrl: ''
        // availableQuantity: 22, // 本月可预购的数量
        // monthTotalNumber: 3, // 当月最多购买数量
        // inventoryNumber: 98, // 当前库存剩余数量
        // inventoryProgressBar: 80, // 当前库存比
        // isQualifications: true, // 是否有购买资格
        // productName: '53度 500ml 飞天茅台(2019款',
        // exchangeCondition: '1000积分+1499元即可换购1瓶53度500ml飞天茅台',
        // limitDesc: '每月限购3瓶,全年不超过12瓶,当月如有遗留份额,则不累计'
      }
    }
  }

  componentDidMount() {
    const {activityCode, shopCode} = this.props
    let productCode = activityCode && activityCode.split('-')[1]
    this.setState({productCode, shopCode})
    this.init(productCode, shopCode)
    // 规则说明弹窗事件监听
    this.nativeSubscription = subscriptRuleModalChange(
      this.onNativeRuleModalChange
    )

    // 刷新茅台活动页面事件监听
    this.nativeSubscription = subscriptRefreshMouTaiActivity(
      this.onNativeRefreshMouTaiActivity
    )
  }

  // 初始化茅台专售数据
  async init(productCode, shopCode) {
    this.getPurchaseActivity(productCode, shopCode)
  }
  /**
   * @msg:获取预购活动
   */
  getPurchaseActivity = (productCode, shopCode) => {
    this.loading.showLoading()
    getPurchaseActivity(productCode, shopCode)
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          let params = {middleTitle: data && data.title, rightTitle: '规则说明', rightEventName: 'notifyRulePopup'}
          this.setState(
            {
              exchangeInfoVO: data,
              buyQuantity: Number(data.inventoryNumber) >= Number(data.availableQuantity) ? data.availableQuantity : data.inventoryNumber,
              isActivity: data.isActivity,
              activityCode: data.activityCode
            }
          )
          this.loading.hideLoading()
          this.animate()
          if (data.isActivity) {
            Native.setActivityPageTitle('setActivityPageTitle', JSON.stringify(params))
          } else {
            Native.setTitle(data && data.title)
          }
        } else {
          rnAppModule.showToast(message, '0')
          this.loading.hideLoading()
        }
      }).catch(({message}) => {
        rnAppModule.showToast(message, '0')
        this.loading.hideLoading()
        if (message && message.indexOf('Token不存在') != -1) {
          this.handleGoHome()
        }
      })
  }
  /**
   * @msg:【立即购买】按钮（去结算)
   */
  handleThrottledOrderAmount = () => {
    let params = {
      activityCode: this.state.activityCode,
      billFeeType: 2,
      items: [
        {
          productCode: this.state.productCode,
          quantity: this.state.buyQuantity,
          sellPrice: 0
        }
      ],
      remarks: '',
      shopCode: this.state.shopCode,
      wantDistributionTime: ''
    }
    this.loading.showLoading()
    handleOrderAmount(params)
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          this.loading.hideLoading()
          this.setState({preOrderNo: data.preOrderNo})
          Native.navigateTo({
            type: Native.NavPageType.NATIVE,
            uri: 'D001,D001',
            params: {preOrderNo: data.preOrderNo}
          })
        } else {
          this.loading.hideLoading()
          rnAppModule.showToast(message, '0')
        }
      }).catch(({message}) => {
        this.loading.hideLoading()
        rnAppModule.showToast(message, '0')
        if (message && message.indexOf('Token不存在') != -1) {
          this.handleGoHome()
        }
      })
  }
  componentWillUnmount() {
    this.nativeSubscription && this.nativeSubscription.remove()
  }
  /**
   * @msg:百分比进度条动画
   */
  animate() {
    const {exchangeInfoVO} = this.state
    let monthTotalNumber = exchangeInfoVO.monthTotalNumber ? exchangeInfoVO.monthTotalNumber : 3
    let availablePercent = exchangeInfoVO.availableQuantity / monthTotalNumber
    availablePercent = Math.round(availablePercent * 100)
    if (availablePercent != 0) {
      let interval = setInterval(() => {
        let currentPercent = this.state.percent % 100
        currentPercent += 1
        this.setState({
          percent: currentPercent
        })
        if (currentPercent === availablePercent) {
          clearTimeout(interval)
        }
      }, 1)
    }
  }
  /**
   * @msg:监听规则弹窗
   */
  onNativeRuleModalChange = () => {
    this.handleRuleDescription()
    Native.setNavigationBarEventSwitch('navigationBarEventSwitch', JSON.stringify({swithTag: '0'}))
  }

  onRef = (ref) => {
    this.ruleModal = ref
  }

  /**
   * @msg:刷新茅台活动页面
   */
  onNativeRefreshMouTaiActivity = (data) => {
    const {productCode, shopCode} = data
    this.getPurchaseActivity(productCode, shopCode)
  }
  /**
   * @msg:查询可预约名店列表
   */
  getReservationShopList = () => {
    if (this.state.isStoreFirst) {
      this.loading.showLoading()
      getReservationShopList(this.state.activityCode)
        .then(({result: data, message, code}) => {
          if (code === 200000 && data) {
            this.setState({storeList: data, isStoreFirst: false})
            this.loading.hideLoading()
          } else {
            rnAppModule.showToast(message, '0')
            this.loading.hideLoading()
          }
        }).catch(({message}) => {
          rnAppModule.showToast(message, '0')
          this.loading.hideLoading()
        })
    }
  }
  /**
   * @msg:查询积分兑换活动规则
   */
  handleRuleDescription = () => {
    this.ruleModal.showModal()
    if (this.state.isRuleFirst) {
      this.loading.showLoading()
      getRuleDescription(this.state.activityCode)
        .then(({result: data, message, code}) => {
          if (code === 200000 && data) {
            this.setState({ruleList: data, isRuleFirst: false})
            this.loading.hideLoading()
          } else {
            rnAppModule.showToast(message, '0')
            this.loading.hideLoading()
          }
        }).catch(({message}) => {
          rnAppModule.showToast(message, '0')
          this.loading.hideLoading()
        })
    }
  }

  /**
   * @description: 立即购买,跳转原生的订单确认页面
   */
  handleGoBuy= () => {
    this.handleThrottledOrderAmount()
  }
  /**
   * @description: 增加预定数量
   */
  handleAddNumber=(buyQuantity) => {
    setTimeout(() => {
      this.setState({buyQuantity})
    }, 100)
  }
  /**
   * @description: 减少预定数量
   */
  handleMinNumber=(buyQuantity) => {
    setTimeout(() => {
      this.setState({buyQuantity})
    }, 100)
  }
  /**
   * @description: 可预约门店弹窗
   */
  handleStoreModal() {
    Native.setNavigationBarEventSwitch('navigationBarEventSwitch', JSON.stringify({swithTag: '0'}))
    this.getReservationShopList()
    this.storeModal.showModal()
  }
  /**
   * @description: 跳转到资格查询页面
   */
  handleQualificationsQuery() {
    Native.navigateTo({
      type: Native.NavPageType.RN,
      uri: 'RNQualificationQuery',
      params: {activityCode: this.state.activityCode},
      title: '资格查询'
    })
  }
  /**
   * @msg: 跳转至首页
   */
  handleGoHome() {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'AA01,AA01',
      params: {}
    })
  }

  render() {
    const {ruleList, storeList, exchangeInfoVO, isActivity} = this.state
    return (
      <View style={styles.container}>
        {
          isActivity ?
            <LinearGradient
              style={styles.container}
              colors={['#3F9A93', '#336054']}
            >
              <View style={styles.container}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.headBannerImage}>
                    <TopBannerImage style={styles.headBannerImage} headImg={Img.loadRatioImage(exchangeInfoVO.integralExchangeUrl, Img.FullWidth)}></TopBannerImage>
                  </View>
                  <View style={styles.headBanner}>
                    {
                      exchangeInfoVO && exchangeInfoVO.inventoryNumber > 0 ? (
                        <View>
                          <View style={styles.purchaseNumberWrapper}>
                            <Text style={styles.purchaseTips}>当前可购买数量</Text>
                            <PercentageCircle radius={61} percent={this.state.percent} borderWidth={10} bgcolor={'#F0F0ED'} color={'#C1882C'}>
                              <Text style={styles.quantityText}>{exchangeInfoVO.availableQuantity}</Text>
                              <Text style={exchangeInfoVO.availableQuantity >= 10 ? styles.standardsBigText : styles.standardsText}>/瓶</Text>
                            </PercentageCircle>
                            <View style={styles.purchaseProductPriceInfo}>
                              <Text style={styles.purchaseProductText}>专售价:</Text>
                              <Text style={styles.purchaseProductPrice}><Text style={styles.purchaseProductSymbol}>￥</Text>{transPenny(exchangeInfoVO.price ? exchangeInfoVO.price : 0)}</Text>
                            </View>
                            <Text style={styles.purchaseProductName}>{exchangeInfoVO.productName}</Text>
                          </View>
                          <View style={styles.stockNumberWrapper}>
                            <Text style={styles.stockNumberTips}>门店茅台库存</Text>
                            <ProgressBar width={180} height={10} stockNumber={exchangeInfoVO.inventoryNumber} saleNum={exchangeInfoVO.inventoryProgressBar} startColor={'#C1882C'} endColor={'#EFDCA6'} backgroundColor={'#F0F0ED'}></ProgressBar>
                            <View style={styles.operateButton}>
                              <TouchableOpacity
                                style={styles.shareTouchableOpacity}
                                activeOpacity={0.95}
                                onPress={() => {
                                  this.handleQualificationsQuery()
                                }} >
                                <View style={styles.queryButton}>
                                  <Text style={styles.buttonText}>预购资格查询</Text>
                                </View>
                              </TouchableOpacity>
                              <View style={styles.splitLine}></View>
                              <TouchableOpacity
                                style={styles.shareTouchableOpacity}
                                activeOpacity={0.95}
                                onPress={() => {
                                  this.handleStoreModal()
                                }} >
                                <View style={styles.queryButton}>
                                  <Text style={styles.buttonText}>可预约门店</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )
                        :
                        <View style={styles.emptyWrapper}>
                          <FastImage style={styles.defaultImage} source={soldOutDefault} resizeMode={FastImage.resizeMode.contain}/>
                          <Text style={styles.defaultText}>当前已抢完，敬请期待</Text>
                        </View>
                    }
                    <View style={styles.explainWrapper}>
                      <View style={styles.explainTextWrapper}>
                        <View style={styles.qualificationLine}></View>
                        <Text style={styles.explainText}>/ / 预购说明 / /</Text>
                        <View style={styles.qualificationLine}></View>
                      </View>
                      <View style={styles.purchaseQualification}>
                        <Text style={styles.qualificationBoldText}>※ 购买资格</Text>
                        {
                          exchangeInfoVO && exchangeInfoVO.exchangeCondition ?
                            <Text style={styles.qualificationText}>{exchangeInfoVO.exchangeCondition}</Text>
                            : null
                        }
                      </View>
                      <View style={styles.purchaseQualification}>
                        <Text style={styles.qualificationBoldText}>※ 限购条件</Text>
                        {
                          exchangeInfoVO && exchangeInfoVO.limitDesc ?
                            <Text style={styles.qualificationText}>{exchangeInfoVO.limitDesc}</Text>
                            : null
                        }
                      </View>
                    </View>
                    {
                      exchangeInfoVO && !exchangeInfoVO.isQualifications && (
                        <TouchableOpacity
                          activeOpacity={0.95}
                          onPress={() => {
                            this.handleGoHome()
                          }} >
                          <View style={styles.goHomeShadow}>
                            <LinearGradient
                              style={[styles.goHomeButton]}
                              colors={['#F2E08C', '#FEF8CC']}
                              start={{x: 0, y: 1}}
                              end={{x: 0, y: 0}}
                            >
                              <Text style={styles.goHomeButtonText}>去首页逛逛</Text>
                            </LinearGradient>
                          </View>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                  {
                    exchangeInfoVO && exchangeInfoVO.isQualifications && (
                      <View style={styles.availableInfo}>
                        <Image source={yellowWarn} style={{width: 16, height: 16}}></Image>
                        <Text style={styles.availableQuantityText}>您当月可购买数量仅剩{exchangeInfoVO.availableQuantity}瓶</Text>
                      </View>
                    )
                  }
                </ScrollView>
                { exchangeInfoVO && exchangeInfoVO.isQualifications && (
                  <View style={styles.buyButton}>
                    <View style={styles.leftWrapper}>
                      <Text style={styles.leftText}>购买数量</Text>
                      <OperateNumber availableQuantity={exchangeInfoVO.availableQuantity} inventoryNumber={exchangeInfoVO.inventoryNumber} onAdd={this.handleAddNumber} onMin={this.handleMinNumber}/>
                    </View>
                    <LinearGradient
                      style={[styles.rightWrapper]}
                      colors={['#F2E08C', '#FEF8CC']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                    >
                      <TouchableOpacity
                        style={styles.shareTouchableOpacity}
                        activeOpacity={0.95}
                        onPress={this.handleGoBuy}>
                        <View>
                          <Text style={styles.buyText}>立即购买</Text>
                        </View>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                )
                }
              </View>
              <StoreModal ref={ref => this.storeModal = ref} storeList={storeList}/>
              <RuleModal onRef={this.onRef} ruleList={ruleList}/>
            </LinearGradient>
            :
            exchangeInfoVO.integralExchangeUrl || exchangeInfoVO.integralExchangeUrl == null ?
              <View style={styles.noActivityWrapper}>
                <View>
                  <FastImage style={styles.noActivityImage} source={noActivity} resizeMode={FastImage.resizeMode.contain}/>
                </View>
                <Text style={styles.noActivityText}>活动正在筹备中…</Text>
                <Text style={styles.noActivityOtherText}>看看其他的吧</Text>
                <TouchableOpacity
                  style={styles.shareTouchableOpacity}
                  activeOpacity={0.95}
                  onPress={() => {
                    this.handleGoHome()
                  }} >
                  <View style={styles.goSee}>
                    <Text style={styles.goSeeText} >去逛逛</Text>
                  </View>
                </TouchableOpacity>
              </View> : null
        }
        <Loading ref={ref => this.loading = ref}></Loading>
      </View>
    )
  }
}
