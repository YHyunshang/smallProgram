/*
 * @Description: mouTaiActivity
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-16 09:54:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-31 14:02:55
 */
import {Http} from '@utils'
import {NativeModules, NativeEventEmitter} from 'react-native'
/**
 * 根据storeCode，productCode获取商品详情的数据
 * @param storeCode {string} 门店编码,
 * @param productCode {string} 商品编码
 * @return {Promise} Http request instance
 */
export const getGoodsDetailData = (storeCode, productCode) => Http.get('goodsDetail', '/app/product/queryProductDetailByCode', {storeCode, productCode})

/**
 * 添加 native 规则说明弹窗事件监听
 * @param handler 事件处理函数
 */
export function subscriptRuleModalChange(handler) {
  const eventEmitter = new NativeEventEmitter(NativeModules.SendRNEventManager)
  return eventEmitter.addListener('notifyRulePopup', handler)
}
