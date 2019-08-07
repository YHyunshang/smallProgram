/*
 * @Description: 商品详情顶部图片轮播组件样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-07 14:16:46
 */

import {
  StyleSheet,
  Dimensions
} from 'react-native'
const {width} = Dimensions.get('window') //解构赋值 获取屏幕宽度
export default StyleSheet.create({
  wrapper: {
  },
  container: {
    width,
    height: width
  },
  paginationStyle: {
    bottom: 10
  },
  image: {
    width: '100%',
    height: 375
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,.25)'
  },
  activeDot: {
    backgroundColor: 'rgba(0,0,0,.7)'
  }
})
