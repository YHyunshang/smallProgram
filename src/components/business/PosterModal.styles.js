/*
 * @Description: 生成海报组件样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-07 14:55:58
 */
import {isIPhoneXFooter} from '../../utils/IsIphoneX'
import {
  StyleSheet
} from 'react-native'
export default StyleSheet.create({
  shareTitleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeIcon: {
    textAlign: 'right',
    marginVertical: 14,
    marginRight: 13
  },
  shareTitleText: {
    height: 49,
    fontSize: 16,
    color: '#333333',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContent: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  posterImage: {
    width: 246,
    height: 365
  },
  saveImage: {
    width: 246,
    height: 45,
    backgroundColor: '#EE4239',
    borderRadius: 23,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  saveText: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  tipsContent: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //iPhoneX底部兼容处理
    marginBottom: isIPhoneXFooter(0)
  },
  tips: {
    fontSize: 12,
    color: '#848791'
  }
})
