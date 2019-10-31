/*
 * @Description: 茅台预购页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-28 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-31 19:54:37
 */
import React from 'react'
import {ScrollView, View, Text, Image, NativeModules, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Native, Img} from '@utils'
import styles from './PreviewPurchase.styles'
import {yellowWarn, soldOutDefault} from '@const/resources'
import PreloadingImage from '../../components/common/PreloadingImage'
import ProgressBar from '../../components/business/Moutai/ProgressBar'
import OperateNumber from '../../components/business/Moutai/OperateNumber'
import StoreModal from '../../components/business/Moutai/StoreModal'
import RuleModal from '../../components/business/Moutai/RuleModal'
import PercentageCircle from 'react-native-percentage-circle'
import {subscriptRuleModalChange, getPurchaseActivity, handleOrderAmount} from '../../services/mouTaiActivity'
const rnAppModule = NativeModules.RnAppModule// 原生模块

export default class PreviewPurchase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preOrderNo: '', // 预订号
      exchangeInfoVO: {integralExchangeUrl: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/head-banner.png',
        availableQuantity: 2, // 本月可预购的数量
        monthTotalNumber: 3, // 当月最多购买数量
        inventoryNumber: 98, // 当前库存剩余数量
        inventoryProgressBar: 80, // 当前库存比
        isQualifications: true, // 是否有购买资格
        productName: '53度 500ml 飞天茅台(2019款',
        exchangeCondition: '1000积分+1499元即可换购1瓶53度500ml飞天茅台',
        limitDesc: '每月限购3瓶,全年不超过12瓶,当月如有遗留份额,则不累计'
      },
      percent: 0,
      // inventoryProgress: 10, // 当前库存数量
      // isQualifications: true, // 是否有购买资格
      // availableQuantity: 2, // 本月可预购的数量
      totalQuantity: 3// 本月总预购的数量
    }
  }

  componentDidMount() {
    let params = {middleTitle: '茅台专售', rightTitle: '规则说明', rightEventName: 'notifyRulePopup'}
    Native.setActivityPageTitle('setActivityPageTitle', JSON.stringify(params))
    // 规则说明弹窗事件监听
    this.nativeSubscription = subscriptRuleModalChange(
      this.onNativeRuleModalChange
    )
    this.animate()
  }
  /**
   * @msg:获取预购活动
   */
  getPurchaseActivity = (shopCode) => {
    getPurchaseActivity(shopCode)
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          this.setState(
            {
              exchangeInfoVO: data
            }
          )
        } else {
          rnAppModule.showToast(message, '0')
        }
      }).catch(({message}) => {
        rnAppModule.showToast(message, '0')
      })
  }
  /**
   * @msg:【立即购买】按钮（去结算)
   */
  handleOrderAmount() {
    handleOrderAmount({})
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          this.setState(
            {
              preOrderNo: data
            }
          )
        } else {
          rnAppModule.showToast(message, '0')
        }
      }).catch(({message}) => {
        rnAppModule.showToast(message, '0')
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
      }, 20)
    }
  }
  /**
   * @param {productCode}
   * @param {productNumber}
   * @description: 相似商品列表添加购物车返回productCode和productNumber
   */
  onNativeRuleModalChange = () => {
    this.ruleModal.showModal()
  }
  /**
   * @description: 立即购买,跳转原生的订单确认页面
   */
  handleGoBuy() {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'D001,D001',
      params: {preOrderNo: this.state.preOrderNo}
    })
  }

  /**
   * @description: 增加预定数量
   */
  handleAddNumber=(number) => {
  }
  /**
   * @description: 减少预定数量
   */
  handleMinNumber=(number) => {
  }
  /**
   * @description: 可预约门店弹窗
   */
  handleStoreModal() {
    this.storeModal.showModal()
  }
  /**
   * @description: 跳转到资格查询页面
   */
  handleQualificationsQuery() {
    Native.navigateTo({
      type: Native.NavPageType.RN,
      uri: 'RNQualificationQuery',
      params: {}
    })
  }

  render() {
    const {availableQuantity, isQualifications, exchangeInfoVO} = this.state
    return (
      <LinearGradient
        style={styles.container}
        colors={['#3F9A93', '#336054']}
      >
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headBannerImage}>
              <PreloadingImage style={styles.headBannerImage} sourceType={0} uri={Img.loadRatioImage(exchangeInfoVO.integralExchangeUrl, Img.FullWidth)}></PreloadingImage>
            </View>
            <View style={styles.headBanner}>
              {
                exchangeInfoVO && exchangeInfoVO.inventoryNumber > 0 ? (
                  <View>
                    <View style={styles.purchaseNumberWrapper}>
                      <Text style={styles.purchaseTips}>您的茅台预购额度(本月度)</Text>
                      <PercentageCircle radius={60.5} percent={this.state.percent} borderWidth={10} bgcolor={'#F0F0ED'} color={'#C1882C'}>
                        <Text style={styles.quantityText}>{exchangeInfoVO.availableQuantity}</Text>
                        <Text style={styles.standardsText}>/瓶</Text>
                      </PercentageCircle>
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
                          <Text style={styles.buttonText}>预购资格查询</Text>
                        </TouchableOpacity>
                        <View style={styles.splitLine}></View>
                        <TouchableOpacity
                          style={styles.shareTouchableOpacity}
                          activeOpacity={0.95}
                          onPress={() => {
                            this.handleStoreModal()
                          }} >
                          <Text style={styles.buttonText}>可预约门店</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
                  :
                  <View style={styles.emptyWrapper}>
                    <Image style={styles.defaultImage} source={soldOutDefault} resizeMode="contain"/>
                    <Text style={styles.defaultText}>当前已抢完，敬请期待</Text>
                  </View>
              }
              <View style={styles.explainWrapper}>
                <View style={styles.explainTextWrapper}>
                  <View>
                    <Text style={styles.qualificationText}>————————   / / <Text style={styles.explainText}> 预购说明 </Text>  / /   ————————</Text>
                  </View>
                </View>
                <View style={styles.purchaseQualification}>
                  <Text style={styles.qualificationBoldText}>※ 购买资格</Text>
                  {
                    exchangeInfoVO && exchangeInfoVO.exchangeCondition && (
                      <Text style={styles.qualificationText}>{exchangeInfoVO.exchangeCondition}</Text>
                    )
                  }
                </View>
                <View style={styles.purchaseQualification}>
                  <Text style={styles.qualificationBoldText}>※ 限购条件</Text>
                  {
                    exchangeInfoVO && exchangeInfoVO.limitDesc && (
                      <Text style={styles.qualificationText}>{exchangeInfoVO.limitDesc}</Text>
                    )
                  }
                </View>
              </View>
              {
                exchangeInfoVO && !exchangeInfoVO.isQualifications && (
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
                <Text style={styles.leftText}>预定数量</Text>
                <OperateNumber availableQuantity={exchangeInfoVO.availableQuantity} onAdd={this.handleAddNumber} onMin={this.handleMinNumber}/>
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
                  onPress={() => {
                    this.handleGoBuy()
                  }} >
                  <View>
                    <Text style={styles.buyText}>立即购买</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )
          }
        </View>
        <StoreModal ref={ref => this.storeModal = ref} />
        <RuleModal ref={ref => this.ruleModal = ref} />
      </LinearGradient>
    )
  }
}
