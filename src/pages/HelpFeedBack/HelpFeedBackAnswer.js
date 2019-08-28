/*
 * @Description: 帮助与反馈解答页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-28 20:49:31
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
  }
  /**
   * @description: 跳转到帮助与反馈问题项
   */
  handleJumpToFeedBackItem() {

  }

  render() {
    const {activityCode, type} = this.props
    let questionType
    Native.setTitle(type)
    switch (Number(activityCode)) {
      case 1:
        questionType = 'goodsQuestion'
        break
      case 2:
        questionType = 'deliveryQuestion'
        break
      case 3:
        questionType = 'orderQuestion'
        break
      case 4:
        questionType = 'memberQuestion'
        break
      case 5:
        questionType = 'invoiceQuestion'
        break
      case 6:
        questionType = 'refundQuestion'
        break
    }

    const answerItems = helpFeedBackAnswer[questionType] ? helpFeedBackAnswer[questionType].map(({questionTitle, questionContent}, index) => (
      <View style={[styles.questionItemFlex, index == helpFeedBackAnswer[questionType].length - 1 ? {borderBottomWidth: 0, paddingBottom: 30} : {borderBottomWidth: 1}]}>
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
