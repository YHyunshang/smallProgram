/*
 * @Description: 商品详情底部购物车组件样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-07 14:20:14
 */

import {
  StyleSheet
} from 'react-native'
export default StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrapperBg: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  leftWrapper: {
    flex: 2,
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#EE4239',
    marginLeft: 15,
    marginVertical: 5
  },
  cartGoodsBg: {
    position: 'absolute',
    left: 39,
    bottom: 33,
    width: 15,
    height: 15,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EE4239'
  },
  cartGoodsNumber: {
    fontSize: 15,
    color: '#FFFFFF'
  },
  rightWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 164,
    height: 50,
    backgroundColor: '#EE4239'
  },
  textColor: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  }
})
