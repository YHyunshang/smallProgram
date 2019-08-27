/*
 * @Description: 商品详情页面样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-27 11:08:46
 */
import {StyleSheet, Dimensions} from 'react-native'
import {isIPhoneXMarginTop} from '../../utils/IsIphoneX'
const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    height: height - 50,
    zIndex: 100,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#ffffff'
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
    fontWeight: 'bold'
  },
  goodsPriceSymbol: {
    fontSize: 18,
    color: '#FA8500',
    paddingLeft: 15,
    paddingRight: 2,
    paddingTop: 5,
    fontWeight: 'bold'
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
    justifyContent: 'flex-start'
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
    marginTop: 9,
    marginLeft: 15
  },
  goodsDetailImage: {
    width: '100%',
    height: 306,
    marginTop: 10
  },
  imagesContent: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  topTabWraper: {
    position: 'relative',
    // top: 20,
    // right: 17,
    flexDirection: 'row'
  },
  topTab: {
    width: '100%',
    height: 44,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // iPhoneX头部兼容处理
    marginTop: isIPhoneXMarginTop(0)
  },
  blankContent: {
    width: '100%',
    height: 44
  },
  leftIcon: {
    marginLeft: 15
  },
  rightShareIcon: {
    position: 'absolute',
    right: 17,
    top: 44
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
