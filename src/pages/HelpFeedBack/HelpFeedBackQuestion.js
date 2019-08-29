/*
 * @Description: 帮助与反馈问题页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-29 11:13:23
 */
import React from 'react'
import {ScrollView, View, Text, TouchableOpacity, NativeModules} from 'react-native'
import Icon from '../../components/Icon'
import {Native} from '@utils'
import styles from './HelpFeedBackQuestion.styles'
export default class HelpFeedBackPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionList: [
        {type: 'goodsQuestion', name: '商品问题'},
        {type: 'deliveryQuestion', name: '配送问题'},
        {type: 'orderQuestion', name: '订单信息修改'},
        {type: 'memberQuestion', name: '会员问题'},
        {type: 'invoiceQuestion', name: '发票问题'},
        {type: 'refundQuestion', name: '退款退货'}
      ]
    }
  }

  componentDidMount() {
    Native.setTitle('帮助与反馈')
  }
  /**
   * @description: 跳转到帮助与反馈问题项
   */
  handleJumpToFeedBackItem(type, name) {
    NativeModules.HomeNativeManager.pushToNewPage('1', 'RNHelpFeedBackAnswer', JSON.stringify({title: String(name), params: {activityCode: String(type), type: String(name)}}))
  }

  render() {
    const {questionList} = this.state
    const questionItems = questionList ? questionList.map(({type, name}, index) => (
      <TouchableOpacity
        style={styles.shareTouchableOpacity}
        activeOpacity={0.95}
        onPress={() => {
          this.handleJumpToFeedBackItem(type, name)
        }} >
        <View style={styles.questionItemFlex}>
          <Text style={styles.questionItemName}>{name}</Text>
          <Icon style={styles.rightIcon} name='right' size={10} color="#4D4D4D" />
        </View>
      </TouchableOpacity>
    )
    )
      : null
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={styles.basicQuestionTitle}>常见问题</Text>
          </View>
          {questionItems}
        </ScrollView>
      </View>
    )
  }
}
