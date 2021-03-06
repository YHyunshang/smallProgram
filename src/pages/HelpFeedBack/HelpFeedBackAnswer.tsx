/*
 * @Description: 帮助与反馈解答页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-09 18:16:13
 */
import * as React from 'react'
import { ScrollView, View, Text, NativeModules } from 'react-native'
// import {helpFeedBackAnswer} from '../../utils/mock'
import * as PropTypes from 'prop-types'
import Loading from '../../components/common/Loading'
import styles from './HelpFeedBackAnswer.styles'
import { Native } from '@utils'
import { getAnswerList } from '../../services/feedback'
const rnAppModule = NativeModules.RnAppModule // 原生模块

interface Props {
  activityCode: string // 活动编码
}

interface State {
  answerList: [] // 解答列表
}
export default class HelpFeedBackPage extends React.Component<Props, State> {
  loadingRef: React.RefObject<any>
  constructor(props) {
    super(props)
    this.state = {
      answerList: [],
    }
    this.loadingRef = React.createRef()
  }
  static propTypes = {
    activityCode: PropTypes.string, // 活动编码
  }
  componentDidMount() {
    this.getAnswerList()
  }
  /**
   * @description: 查询问题解答列表
   */
  getAnswerList = () => {
    const { activityCode } = this.props
    let questionTypeId = activityCode
    this.loadingRef.current.showLoading()
    getAnswerList({ questionTypeId })
      .then(({ result: data, message, code }) => {
        if (code === 200000 && data) {
          this.setState({ answerList: data })
          this.loadingRef.current.hideLoading()
        } else {
          this.loadingRef.current.hideLoading()
          rnAppModule.showToast(message, '0')
        }
      })
      .catch(({ message }) => {
        this.loadingRef.current.hideLoading()
        rnAppModule.showToast(message, '0')
      })
  }
  render() {
    const { answerList } = this.state
    // Native.setTitle(type)
    const answerItems = answerList
      ? answerList.map(({ question, answer }, index) => (
          <View
            key={index}
            style={[
              styles.questionItemFlex,
              index == answerList.length - 1
                ? { borderBottomWidth: 0, paddingBottom: 30 }
                : { borderBottomWidth: 1 },
            ]}
          >
            <View style={styles.questionTitleFlex}>
              <Text style={styles.questionIndex}>Q{Number(index + 1)}:</Text>
              <Text style={styles.questionTitle}>{question}</Text>
            </View>
            <Text style={styles.questionContent}>{answer}</Text>
          </View>
        ))
      : null
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {answerItems}
        </ScrollView>
        <Loading ref={this.loadingRef} />
      </View>
    )
  }
}
