/*
 * @Description: 帮助与反馈问题页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-09 18:16:22
 */
import * as React from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
} from 'react-native'
import Icon from '../../components/Icon'
import { Native } from '@utils'
import Loading from '../../components/common/Loading'
import styles from './HelpFeedBackQuestion.styles'
import { getTypeList } from '../../services/feedback'
const rnAppModule = NativeModules.RnAppModule // 原生模块
interface Props {}
interface State {
  questionList: {
    id: number
    questionTypeName: string
  }[] // 问题列表
}
export default class HelpFeedBackPage extends React.Component<Props, State> {
  loadingRef: React.RefObject<any>
  constructor(props) {
    super(props)
    this.state = {
      questionList: [],
    }
    this.loadingRef = React.createRef()
  }

  componentDidMount() {
    Native.setTitle('帮助与反馈')
    this.getTypeList()
  }
  /**
   * @description: 跳转到帮助与反馈问题项
   */
  handleJumpToFeedBackItem(id, questionTypeName) {
    Native.navigateTo({
      type: Native.NavPageType.RN,
      uri: 'RNHelpFeedBackAnswer',
      params: { activityCode: String(id)},
      title: String(questionTypeName),
    })
  }
  /**
   * @description: 查询问题类型列表
   */
  getTypeList = () => {
    this.loadingRef.current.showLoading()
    getTypeList({})
      .then(({ result: data, message, code }) => {
        if (code === 200000 && data) {
          this.setState({ questionList: data })
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
    const { questionList } = this.state
    const questionItems = questionList
      ? questionList.map(({ id, questionTypeName }, index) => (
          <TouchableOpacity
            key={id}
            activeOpacity={0.95}
            onPress={() => {
              this.handleJumpToFeedBackItem(id, questionTypeName)
            }}
          >
            <View style={styles.questionItemFlex}>
              <Text style={styles.questionItemName}>{questionTypeName}</Text>
              <Icon
                style={styles.rightIcon}
                name="right"
                size={10}
                color="#4D4D4D"
              />
            </View>
          </TouchableOpacity>
        ))
      : null
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            <Text style={styles.basicQuestionTitle}>常见问题</Text>
          </>
          {questionItems}
        </ScrollView>
        <Loading ref={this.loadingRef} />
      </View>
    )
  }
}
