/*
 * @Description: 商品详情顶部图片轮播组件样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-19 16:40:33
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
    height: width,
    overflow: 'hidden'
  },
  paginationStyle: {
    bottom: 10
  },
  imgView: {
    flex: 1,
    height: 375
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
    backgroundColor: 'rgba(0,0,0,.10)'
  },
  activeDot: {
    backgroundColor: '#FF3914'
  }
})
