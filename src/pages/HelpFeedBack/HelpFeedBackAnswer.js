/*
 * @Description: 帮助与反馈解答页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-29 11:11:13
 */
import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import {helpFeedBackAnswer} from '../../utils/mock'
import styles from './HelpFeedBackAnswer.styles'
import {Native} from '@utils'
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
    let questionType = activityCode
    Native.setTitle(type)
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
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {answerItems}
        </ScrollView>
      </View>
    )
  }
}
