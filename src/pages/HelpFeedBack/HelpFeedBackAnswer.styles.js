/*
 * @Description: 帮助与反馈解答页面样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-29 14:29:20
 */
import {StyleSheet, Dimensions} from 'react-native'
import {isIPhoneXMarginTop} from '../../utils/IsIphoneX'
const {height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    height: height - 50,
    zIndex: 100,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#ffffff'
  },
  feedBackTopBanner: {
    height: 44,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    // iPhoneX头部兼容处理
    marginTop: isIPhoneXMarginTop(0)
  },
  feedBackTitle: {
    fontSize: 19,
    color: '#4D4D4D',
    fontWeight: 'bold'
  },
  basicQuestionTitle: {
    fontSize: 22,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 15
  },
  questionItemFlex: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    marginHorizontal: 15,
    borderBottomColor: '#EEEEEE',
    alignItems: 'flex-start'
  },
  questionTitleFlex: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  questionIndex: {
    fontSize: 16,
    color: '#4D4D4D',
    fontWeight: 'bold'
  },
  questionTitle: {
    fontSize: 16,
    color: '#4D4D4D',
    fontWeight: 'bold',
    paddingLeft: 10
  },
  questionContent: {
    fontSize: 13,
    color: '#4D4D4D',
    lineHeight: 20,
    paddingVertical: 15
  }
})
