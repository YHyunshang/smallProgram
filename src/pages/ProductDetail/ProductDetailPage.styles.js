/*
 * @Description: 商品详情页面样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-08 12:40:47
 */
import {StyleSheet, Dimensions} from 'react-native'
import {isIPhoneXMarginTop, isIPhoneXFooter} from '../../utils/IsIphoneX'
const {width} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#ffffff'
  },
  goodsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 14,
    paddingBottom: 11,
    paddingHorizontal: 15
  },
  goodsName: {
    width: width - 65,
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'left'
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
    fontSize: 14,
    color: '#EE4239',
    fontWeight: '600',
    paddingLeft: 15
  },
  goodsMinBorder: {
    borderStyle: 'solid',
    borderWidth: 0.6,
    marginHorizontal: 12,
    marginTop: 11,
    borderColor: '#F0F0F0'
  },
  goodsQualityFlex: {
    height: 67,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  goodsQualityRowFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 13
  },
  goodsMaxBorder: {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#FBFBFB'
  },
  goodsDetailTitle: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '900',
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
    paddingHorizontal: 15,
    //iPhoneX底部兼容处理
    marginBottom: isIPhoneXFooter(0)
  },
  topTab: {
    width: '100%',
    height: 44,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //iPhoneX头部兼容处理
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
    marginRight: 22
  },
  topTabInfo: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
