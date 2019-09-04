/*
 * @Description: 相似商品组件样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-04 18:58:14
 */

import {
  StyleSheet,
  Dimensions
} from 'react-native'
const screenWidth = Dimensions.get('window').width
// 一些常量设置
const cols = 2 // 列数
const left = 10 // 左右边距
const bottom = 10 // 上下边距
const imageWidth = (screenWidth - (cols + 1) * left) / cols // 图片大小

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#FBFBFB'
  },
  wrapperBg: {
    width: '100%',
    height: 50,
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  similarGoodsTitle: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold'
  },
  similarGoodsList: {
    width: imageWidth,
    marginLeft: left,
    marginBottom: bottom,
    backgroundColor: '#FFFFFF',
    borderRadius: 5
  },
  similarGoodsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  similarGoodsImg: {
    width: 150,
    height: 150
  },
  goodsDesc: {
    width: 152,
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 10,
    color: '#333333'
  },
  throughLinePrice: {
    marginLeft: 10,
    color: '#B3B3B3',
    fontSize: 12,
    textDecorationLine: 'line-through'
  },
  goodsPriceFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  goodsPriceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  goodsPriceSymbol: {
    fontSize: 12,
    color: '#FA8500',
    paddingLeft: 10,
    paddingTop: 5,
    fontWeight: 'bold'
  },
  goodsPrice: {
    fontSize: 18,
    color: '#FA8500',
    fontWeight: 'bold'
  },
  goodsCartImg: {
    width: 14,
    height: 14
  },
  linearGradient: {
    borderRadius: 24,
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 5,
    paddingLeft: 5
  },
  container: {
    marginRight: 10,
    marginBottom: 10
  }
})
