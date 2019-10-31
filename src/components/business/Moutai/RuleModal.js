/*
 * @Description: 规则弹窗组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-31 17:27:49
 */
import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonModal from '../../common/CommonModal'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'
/**
 * 弹出层
 */
export default class RuleModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      ruleList: [
        '1. 如用户已参与营销活动或使用营销工具所获得的优惠权益进行营利或非法获利，或者永辉有合理理由怀疑用户存在不当使用优惠工具或优惠权益的，永辉将取消用户的参与资格，并有权撤销相关违规交易、收回优惠权益(含已使用及未使用)的，必要时将追究用户的法律责任。',
        '2. 如用户曾经存在、出现或经永辉合理怀疑有违法违规或违背诚信信用原则的行为，用户将无法获取/使用全部或部分优惠权益，并且永辉有权追究用户的法律责任。',
        '3.同一用户的认证标准：即同一登录账户、同一手机号、同一终端设备号、同一支付账户、同一收货地址、同一IP或其他合理显示同一用户的情况均视为同一用户。'
      ]
    }
  }
  /**
  * @description: 显示弹层
  */
  showModal() {
    this.commonModal.show()
  }
  /**
* @description: 隐藏弹层
*/
  handleCloseModal() {
    this.commonModal.hide()
  }
  render() {
    const {ruleList} = this.state
    // 规则详细
    const ruleListWrapper = ruleList && ruleList.map((item, index) => (
      <View key={index}>
        <Text style={styles.ruleText}>{item}</Text>
      </View>
    ))
    return (
      <CommonModal ref={ref => this.commonModal = ref} modalBoxHeight={481} modalBoxWidth={325}>
        <View style={styles.ruleTitleWrapper}><Text style={styles.ruleTitle}>规则说明</Text></View>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.ruleList}>
            {ruleListWrapper}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.shareTouchableOpacity}
          activeOpacity={0.95}
          onPress={() => {
            this.handleCloseModal()
          }} >
          <LinearGradient
            style={[styles.knowButton]}
            colors={['#C1882C', '#E5B655']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            <Text style={styles.knowText}>我知道了</Text>
          </LinearGradient>
        </TouchableOpacity>
      </CommonModal>
    )
  }
}

const styles = StyleSheet.create({
  ruleList: {
    backgroundColor: '#fff'
  },
  ruleText: {
    fontSize: 13,
    color: '#808080',
    lineHeight: 20,
    paddingHorizontal: 25,
    marginBottom: 15
  },
  ruleTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ruleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    paddingTop: 34,
    paddingBottom: 24
  },
  knowButton: {
    width: 275,
    height: 40,
    borderRadius: 2,
    marginBottom: 30,
    marginLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  knowText: {
    fontSize: 17,
    color: '#FFFFFF'
  }
})
