/*
 * @Description: 适配iphoneX
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-23 14:53:27
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-02-10 17:14:33
 */
import {isiPhoneX, isiOS} from './native'
import { Dimensions } from 'react-native'
const {height} = Dimensions.get('window')
/**
 * @description:iphoneX 顶部留白的兼容处理
 * @return:marginTop
 * @param marginTop
 */
export const isIPhoneXMarginTop = (marginTop) => {
  const mt = isNaN(+marginTop) ? 0 : +marginTop
  return mt + (isiPhoneX ? 40 : isiOS ? 30 : 0)
}

/**
 * @description:iPhoneX 底部高度兼容处理
 */
export const isIPhoneXFooter = () => {
  return isiPhoneX ? 185 : 100
}


/**
 * @description:iPhone5判断
 */
export const isIPhone5 = () => {
  const XSMAX_HEIGHT = 568
  return height  === XSMAX_HEIGHT ? 57 : 157
}

/**
 * @description:iPhoneX 底部高度兼容处理
 * @return:number
 */
export const isIPhoneXHeight = () => (isiPhoneX ? 84 : 50)
