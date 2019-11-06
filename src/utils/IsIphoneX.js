/*
 * @Description: 适配iphoneX
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-23 14:53:27
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-19 10:30:36
 */
import {isiPhoneX, isiOS} from './native'

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
 * @return:marginTop
 * @param marginTop
 */
export const isIPhoneXFooter = (marginTop) => {
  const height = isNaN(+marginTop) ? 0 : +marginTop
  return height + (isiPhoneX ? 80 : 10)
}

/**
 * @description:iPhoneX 底部高度兼容处理
 * @return:number
 */
export const isIPhoneXHeight = () => (isiPhoneX ? 84 : 50)
