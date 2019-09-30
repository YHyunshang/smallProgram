/*
 * @Description: 帮助与反馈解答页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-30 13:50:57
 */
import React from 'react'
import {ScrollView, View, Text, NativeModules} from 'react-native'
// import {helpFeedBackAnswer} from '../../utils/mock'
import styles from './HelpFeedBackAnswer.styles'
import {Native} from '@utils'
import {getAnswerList} from '../../services/feedback'
const rnAppModule = NativeModules.RnAppModule// 原生模块
export default class HelpFeedBackPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answerList: []
    }
  }

  componentDidMount() {
    this.getAnswerList()
  }
  /**
   * @description: 查询问题解答列表
   */
  getAnswerList = () => {
    const {activityCode} = this.props
    let questionTypeId = activityCode
    getAnswerList({questionTypeId})
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          this.setState(
            {
              answerList: data
            }
          )
        } else {
          rnAppModule.showToast(message, '0')
        }
      }).catch(({message}) => {
        rnAppModule.showToast(message, '0')
      })
  }
  render() {
    const {type} = this.props
    const {answerList} = this.state
    Native.setTitle(type)
    const answerItems = answerList ? answerList.map(({question, answer}, index) => (
      <View style={[styles.questionItemFlex, index == answerList.length - 1 ? {borderBottomWidth: 0, paddingBottom: 30} : {borderBottomWidth: 1}]}>
        <View style={styles.questionTitleFlex}>
          <Text style={styles.questionIndex}>Q{Number(index + 1)}:</Text>
          <Text style={styles.questionTitle}>{question}</Text>
        </View>
        <Text style={styles.questionContent}>{answer}</Text>
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
