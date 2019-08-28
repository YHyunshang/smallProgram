/*
 * @Description: 帮助与反馈问题页面样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-28 20:39:57
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
    marginTop: 25,
    marginLeft: 15
  },
  questionItemFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginHorizontal: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center'
  },
  questionItemName: {
    fontSize: 15,
    color: '#4D4D4D',
    paddingLeft: 2
  },
  rightIcon: {
    paddingRight: 2
  }
})
