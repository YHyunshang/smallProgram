/*
 * @Description: 帮助与反馈解答页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-12-09 17:04:18
 */
import React from 'react'
import {ScrollView, View, Text, NativeModules} from 'react-native'
// import {helpFeedBackAnswer} from '../../utils/mock'
import PropTypes from 'prop-types'
import Loading from '../../components/common/Loading'
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
  static propTypes = {
    activityCode: PropTypes.string, // 活动编码
    type: PropTypes.string // 标题类型
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
    this.loading.showLoading()
    getAnswerList({questionTypeId})
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          this.setState({answerList: data})
          this.loading.hideLoading()
        } else {
          this.loading.hideLoading()
          rnAppModule.showToast(message, '0')
        }
      }).catch(({message}) => {
        this.loading.hideLoading()
        rnAppModule.showToast(message, '0')
      })
  }
  render() {
    const {type} = this.props
    const {answerList} = this.state
    Native.setTitle(type)
    const answerItems = answerList ? answerList.map(({question, answer}, index) => (
      <View key={index} style={[styles.questionItemFlex, index == answerList.length - 1 ? {borderBottomWidth: 0, paddingBottom: 30} : {borderBottomWidth: 1}]}>
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
        <Loading ref={ref => this.loading = ref}></Loading>
      </View>
    )
  }
}
