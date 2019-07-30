/*
 * @Description: 适配iphoneX
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-23 14:53:27
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-30 20:22:06
 */

import {Dimensions, Platform} from 'react-native'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
//iPhoneX大小
const X_width = 375
const X_height = 812
const isIPhoneX = Platform.OS === 'ios' && ((height === X_height && width === X_width) || (height === X_width && width === X_height))

//这里如果isIPhoneX===1，则为iPhoneX,否则不是
// iphoneX 顶部留白的兼容处理
export const isIPhoneXMarginTop = (number) => {
  number = isNaN(+number) ? 0 : +number
  return number + (isIPhoneX ? 30 : 0)
}
//iPhoneX 底部高度兼容处理
export const isIPhoneXFooter = (number) => {
  number = isNaN(+number) ? 0 : +number
  return number + (isIPhoneX ? 88 : 44)
}
