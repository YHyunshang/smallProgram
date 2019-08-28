/*
 * @Description: 帮助与反馈问题页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-28 20:50:20
 */
import React from 'react'
import {ScrollView, View, Text, TouchableOpacity, NativeModules} from 'react-native'
import Icon from '../../components/Icon'
import {Native} from '@utils'
import styles from './HelpFeedBackQuestion.styles'
const rnAppModule = NativeModules.RnAppModule// 原生模块
export default class HelpFeedBackPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionList: [
        {id: 1, name: '商品问题'},
        {id: 2, name: '配送问题'},
        {id: 3, name: '订单信息修改'},
        {id: 4, name: '会员问题'},
        {id: 5, name: '发票问题'},
        {id: 6, name: '退款退货'}
      ]
    }
  }

  componentDidMount() {
    Native.setTitle('帮助与反馈')
  }
  /**
   * @description: 跳转到帮助与反馈问题项
   */
  handleJumpToFeedBackItem(id, name) {
    NativeModules.HomeNativeManager.pushToNewPage('1', 'RNHelpFeedBackAnswer', JSON.stringify({title: String(name), params: {activityCode: String(id), type: String(name)}}))
  }

  render() {
    const {questionList} = this.state
    const questionItems = questionList ? questionList.map(({id, name}, index) => (
      <TouchableOpacity
        style={styles.shareTouchableOpacity}
        activeOpacity={0.95}
        onPress={() => {
          this.handleJumpToFeedBackItem(id, name)
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
          // 当一帧滚动完毕时调用
          // onMomentumScrollEnd={(event) => this.onMomentumScrollEnd(event)}
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
