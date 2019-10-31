/*
 * @Description: 茅台预购页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-28 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-31 14:07:04
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
import {subscriptRuleModalChange} from '../../services/mouTaiActivity'
const rnAppModule = NativeModules.RnAppModule// 原生模块
export default class PreviewPurchase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percent: 0,
      inventoryProgress: 10, // 当前库存数量
      isQualifications: true, // 是否有购买资格
      availableQuantity: 2, // 本月可预购的数量
      totalQuantity: 3// 本月总预购的数量
    }
  }

  componentDidMount() {
    let params = {middleTitle: '茅台专售', rightTitle: '规则说明', rightEventName: 'notifyRulePopup'}
    Native.setActivityPageTitle('setActivityPageTitle', JSON.stringify(params))
    // Native.setActivityPageTitle('w', 'w')
    // Native.setTitle('茅台专售')
    // 规则说明弹窗事件监听
    this.nativeSubscription = subscriptRuleModalChange(
      this.onNativeRuleModalChange
    )
    this.animate()
  }
  componentWillUnmount() {
    this.nativeSubscription && this.nativeSubscription.remove()
  }
  /**
   * @msg:百分比进度条动画
   */
  animate() {
    const {availableQuantity, totalQuantity} = this.state
    let availablePercent = availableQuantity / totalQuantity
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
    rnAppModule.showToast('规则调用成功', '0')
    this.ruleModal.showModal()
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
    const {availableQuantity, isQualifications, inventoryProgress} = this.state
    let url = 'http://static-yh.yonghui.cn/app/assets/xszt-RN/head-banner.png'
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
              <PreloadingImage style={styles.headBannerImage} sourceType={0} uri={Img.loadRatioImage(url, Img.FullWidth)}></PreloadingImage>
            </View>
            <View style={styles.headBanner}>
              {
                inventoryProgress > 0 ? (
                  <View>
                    <View style={styles.purchaseNumberWrapper}>
                      <Text style={styles.purchaseTips}>您的茅台预购额度(本月度)</Text>
                      <PercentageCircle radius={60.5} percent={this.state.percent} borderWidth={10} bgcolor={'#F0F0ED'} color={'#C1882C'}>
                        <Text style={styles.quantityText}>{availableQuantity}</Text>
                        <Text style={styles.standardsText}>/瓶</Text>
                      </PercentageCircle>
                      <Text style={styles.purchaseProductName}>53度 500ml 飞天茅台(2019款)</Text>
                    </View>
                    <View style={styles.stockNumberWrapper}>
                      <Text style={styles.stockNumberTips}>门店茅台库存</Text>
                      <ProgressBar width={180} height={10} startColor={'#C1882C'} endColor={'#EFDCA6'} backgroundColor={'#F0F0ED'}></ProgressBar>
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
                  <Text style={styles.explainText}>———————— // 预购说明 //———————— </Text>
                </View>
                <View style={styles.purchaseQualification}>
                  <Text style={styles.qualificationText}>※ 购买资格</Text>
                  <Text style={styles.qualificationText}>1000积分+1499元即可换购1瓶53度500ml飞天茅台</Text>
                </View>
                <View style={styles.purchaseQualification}>
                  <Text style={styles.qualificationText}>※ 限购条件</Text>
                  <Text style={styles.qualificationText}>每月限购3瓶,全年不超过12瓶,当月如有遗留份额,则不累计</Text>
                </View>
              </View>
              {
                !isQualifications && (
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
              isQualifications && (
                <View style={styles.availableInfo}>
                  <Image source={yellowWarn} style={{width: 16, height: 16}}></Image>
                  <Text style={styles.availableQuantityText}>您当月可购买数量仅剩{availableQuantity}瓶</Text>
                </View>
              )
            }
          </ScrollView>
          { isQualifications && (
            <View style={styles.buyButton}>
              <View style={styles.leftWrapper}>
                <Text style={styles.leftText}>预定数量</Text>
                <OperateNumber availableQuantity={availableQuantity} onAdd={this.handleAddNumber} onMin={this.handleMinNumber}/>
              </View>
              <LinearGradient
                style={[styles.rightWrapper]}
                colors={['#F2E08C', '#FEF8CC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              >
                <View>
                  <Text style={styles.buyText}>立即购买</Text>
                </View>
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
