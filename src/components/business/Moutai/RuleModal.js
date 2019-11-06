/*
 * @Description: 规则弹窗组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-06 11:14:09
 */
import {Native} from '@utils'
import {noStore} from '@const/resources'
import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonModal from '../../common/CommonModal'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
/**
 * 弹出层
 */
export default class RuleModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
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
    Native.setNavigationBarEventSwitch('navigationBarEventSwitch', JSON.stringify({swithTag: '1'}))
  }
  render() {
    const {ruleList} = this.props
    // 规则详细
    const ruleListWrapper = ruleList && ruleList.length > 0 ? ruleList.map((item, index) => (
      <View key={index}>
        <Text style={styles.ruleText}>{item}</Text>
      </View>
    )) :
      <View style={styles.noRuleWrapper}>
        <Image style={styles.noRuleImage} source={noStore} resizeMode="contain"/>
        <Text style={styles.noRuleText}>暂无规则</Text>
        <Text style={styles.seeOtherText}>看看其他的吧</Text>
      </View>
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
  },
  noRuleWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noRuleImage: {
    width: 150,
    height: 150,
    marginTop: 30
  },
  noRuleText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4A4A4A'
  },
  seeOtherText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    color: '#A4A4B4'
  }
})
