/*
 * @Description: 商品详情页面样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-21 15:59:37
 */
import {StyleSheet, Dimensions} from 'react-native'
import {isIPhoneXMarginTop, isIPhoneXHeight} from '../../utils/IsIphoneX'
import theme from '@theme'
const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    height,
    zIndex: 100,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#ffffff'
  },
  subContainer: {
    height: Number(height - isIPhoneXHeight())
  },
  goodsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 15
  },
  goodsName: {
    width: width - 65,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'left'
  },
  goodsTips: {
    paddingTop: 10,
    fontSize: 14,
    color: '#666666'
  },
  iconBg: {
    width: 34,
    height: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FA6400',
    backgroundColor: '#FFE9DA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultImage: {
    width: '100%',
    height: 375
  },
  goodsPrice: {
    fontSize: 24,
    color: '#FA8500',
    fontWeight: 'bold',
    fontFamily: theme.priceFFPrimary
  },
  goodsPriceSymbol: {
    fontSize: 18,
    color: '#FA8500',
    paddingLeft: 15,
    paddingRight: 2,
    paddingTop: 5,
    fontWeight: 'bold',
    fontFamily: theme.priceFFPrimary
  },
  goodsTag: {
    width: 30,
    height: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    backgroundColor: '#FFDED9',
    marginLeft: 15
  },
  goodsTagValue: {
    fontSize: 10,
    color: '#FF3914'
  },
  throughLine: {
    marginLeft: 10,
    color: '#B3B3B3',
    fontSize: 12,
    textDecorationLine: 'line-through'
  },
  goodsMinBorder: {
    borderStyle: 'solid',
    borderWidth: 0.6,
    marginHorizontal: 12,
    marginTop: 11,
    borderColor: '#F0F0F0'
  },
  goodsQualityFlex: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 6
  },
  goodsQualityItemFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
  },
  goodsQualityRowFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  goodsPromotionPriceRowFlex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center'
  },
  goodsQualityColumnFlex: {
    paddingTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heightBorder: {
    borderStyle: 'solid',
    borderRightWidth: 1,
    height: 26,
    borderColor: '#F0F0F0'
  },
  goodsQualityName: {
    fontSize: 12,
    color: '#A3A09B',
    fontWeight: '600'
  },
  goodsQualityValue: {
    fontSize: 12,
    marginLeft: 3,
    color: '#B3B3B3',
    fontWeight: '600'
  },
  goodsMaxBorder: {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#FBFBFB'
  },
  goodsDetailTitle: {
    fontSize: 15,
    color: '#333333',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 15
  },
  goodsDetailImage: {
    width: '100%',
    height: 375
  },
  imagesContent: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  topTab: {
    position: 'relative',
    height: 44,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // iPhoneX头部兼容处理
    marginTop: isIPhoneXMarginTop(0)
  },
  shareTouchableOpacity: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
    top: 13
  },
  itemTitle: {
    fontSize: 14,
    color: '#333333'
  },
  itemEvaluateTitle: {
    fontSize: 14,
    color: '#333333',
    marginHorizontal: 32
  },
  footCart: {
    flex: 1,
    width,
    position: 'absolute',
    bottom: 0
  }
})
