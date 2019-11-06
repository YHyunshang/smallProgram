/*
 * @Description: 帮助与反馈问题页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-06 16:12:57
 */
import React from 'react'
import {ScrollView, View, Text, TouchableOpacity, NativeModules} from 'react-native'
import Icon from '../../components/Icon'
import {Native} from '@utils'
import Loading from '../../components/common/Loading'
import styles from './HelpFeedBackQuestion.styles'
import {getTypeList} from '../../services/feedback'
const rnAppModule = NativeModules.RnAppModule// 原生模块
export default class HelpFeedBackPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionList: []
    }
  }

  componentDidMount() {
    Native.setTitle('帮助与反馈')
    this.getTypeList()
  }
  /**
   * @description: 跳转到帮助与反馈问题项
   */
  handleJumpToFeedBackItem(id, questionTypeName) {
    NativeModules.HomeNativeManager.pushToNewPage('1', 'RNHelpFeedBackAnswer', JSON.stringify({title: String(questionTypeName), params: {activityCode: String(id), type: String(questionTypeName)}}))
  }
  /**
   * @description: 查询问题类型列表
   */
  getTypeList = () => {
    this.loading.showLoading()
    getTypeList({})
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          this.setState({questionList: data})
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
    const {questionList} = this.state
    const questionItems = questionList ? questionList.map(({id, questionTypeName}, index) => (
      <TouchableOpacity
        style={styles.shareTouchableOpacity}
        activeOpacity={0.95}
        onPress={() => {
          this.handleJumpToFeedBackItem(id, questionTypeName)
        }} >
        <View style={styles.questionItemFlex}>
          <Text style={styles.questionItemName}>{questionTypeName}</Text>
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
        <Loading ref={ref => this.loading = ref}></Loading>
      </View>
    )
  }
}
