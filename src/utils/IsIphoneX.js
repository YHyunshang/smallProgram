/*
 * @Description: 适配iphoneX
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-23 14:53:27
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-19 10:30:36
 */

import {Dimensions, Platform} from 'react-native'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
// iPhoneX大小
const X_width = 375
const X_height = 812
const isIPhone = Platform.OS === 'ios'
const isIPhoneX = Platform.OS === 'ios' && ((height === X_height && width === X_width) || (height === X_width && width === X_height))

/**
 * @description:iphoneX 顶部留白的兼容处理
 * @param {number}
 * @return:number
 */
export const isIPhoneXMarginTop = (number) => {
  number = isNaN(+number) ? 0 : +number
  return number + (isIPhoneX ? 30 : isIPhone ? 30 : 0)
}

/**
 * @description:iPhoneX 底部高度兼容处理
 * @param {number}
 * @return:number
 */
export const isIPhoneXFooter = (number) => {
  number = isNaN(+number) ? 0 : +number
  return number + (isIPhoneX ? 80 : 10)
}

/**
 * @description:iPhoneX 底部高度兼容处理
 * @param {number}
 * @return:number
 */
export const isIPhoneXHeight = () => (isIPhoneX ? 84 : isIPhone ? 50 : 74)
