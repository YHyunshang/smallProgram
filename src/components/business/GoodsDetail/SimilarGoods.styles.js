/*
 * @Description: 相似商品组件样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-18 19:15:42
 */

import {
  StyleSheet,
  Dimensions
} from 'react-native'
import theme from '@theme'
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
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: -3,
    // position: 'relative',
  },
  similarGoodsImg: {
    width: 150,
    height: 150
  },
  tlTagRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  goodsDesc: {
    width: 152,
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 10,
    color: '#333333'
  },
  goodsTags: {
    marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 16,
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
    justifyContent: 'flex-start'
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
    fontFamily: theme.priceFFPrimary,
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
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  newPerson: {
    zIndex: 100,
    position: 'absolute',
    width: 54,
    height: 16,
    top: 0,
    left: 0,
    paddingHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#41B25D'
  },
  newPersonText: {
    color: '#FFFFFF',
    fontSize: 12
  }
})
