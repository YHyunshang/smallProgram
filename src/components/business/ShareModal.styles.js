/*
 * @Description: 分享朋友圈组件样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-07 14:59:06
 */
import {
  StyleSheet
} from 'react-native'
export default StyleSheet.create({
  shareInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 44
  },
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
  shareImage: {
    width: 60,
    height: 60
  },
  shareText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    marginTop: 10
  }
})
