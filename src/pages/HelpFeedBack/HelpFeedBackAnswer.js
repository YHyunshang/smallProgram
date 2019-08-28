/*
 * @Description: 帮助与反馈解答页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-28 18:42:51
 */
import React from 'react'
import {ScrollView, View, Text, NativeModules} from 'react-native'
import {helpFeedBackAnswer} from '../../utils/mock'
import styles from './HelpFeedBackAnswer.styles'
import {Native} from '@utils'
const rnAppModule = NativeModules.RnAppModule// 原生模块
export default class HelpFeedBackPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    Native.setTitle('帮助与反馈')
  }
  /**
   * @description: 跳转到帮助与反馈问题项
   */
  handleJumpToFeedBackItem() {

  }

  render() {
    const aa = this.props
    rnAppModule.showToast(JSON.stringify(aa), '0')
    const answerItems = helpFeedBackAnswer.refundQuestion ? helpFeedBackAnswer.refundQuestion.map(({questionTitle, questionContent}, index) => (
      <View style={[styles.questionItemFlex, index == helpFeedBackAnswer.refundQuestion.length - 1 ? {borderBottomWidth: 0} : {borderBottomWidth: 1}]}>
        <View style={styles.questionTitleFlex}>
          <Text style={styles.questionIndex}>Q{Number(index + 1)}:</Text>
          <Text style={styles.questionTitle}>{questionTitle}</Text>
        </View>
        <Text style={styles.questionContent}>{questionContent}</Text>
      </View>
    )
    )
      : null
    return (
      <View style={styles.container}>
        {/* <View style={styles.feedBackTopBanner}>
          <Text style={styles.feedBackTitle}>商品问题</Text>
        </View> */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          // 当一帧滚动完毕时调用
          // onMomentumScrollEnd={(event) => this.onMomentumScrollEnd(event)}
        >
          {answerItems}
        </ScrollView>
      </View>
    )
  }
}
