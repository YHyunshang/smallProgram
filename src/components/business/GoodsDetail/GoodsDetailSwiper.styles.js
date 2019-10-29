/*
 * @Description: 商品详情顶部图片轮播组件样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-04 16:09:27
 */
import theme from '@theme'
import {
  StyleSheet,
  Dimensions
} from 'react-native'
import {Global} from '@utils'

const FullWidth = Global.WindowWidth

export default StyleSheet.create({
  wrapper: {
  },
  container: {
    width: FullWidth,
    height: FullWidth,
    overflow: 'hidden'
  },
  paginationStyle: {
    bottom: 10
  },
  imgView: {
    flex: 1,
    height: FullWidth
  },
  image: {
    width: '100%',
    height: FullWidth
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,.10)'
  },
  activeDot: {
    backgroundColor: theme.primary
  }
})
