/*
 * @Descripttion: 潮物达人活动组件页面样式
 * @Author: yuwen.liu
 * @Date: 2019-11-12 20:31:29
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2019-12-26 17:50:04
 */
import { StyleSheet } from 'react-native'
export default StyleSheet.create({
  tideMancontainer: {
    flex: 1
  },
  tideManList: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  centerWrapper:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row'
  },
  productBox:{
    // flex: 1
  },
  productWrapper:{
    position: 'relative',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  footerBox: {
    elevation: 1,
    backgroundColor: '#FFF',
  },
  fakeBorder: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 0.5,
    backgroundColor: '#EEE',
  }
})