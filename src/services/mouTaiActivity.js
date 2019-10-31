/*
 * @Description: mouTaiActivity
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-16 09:54:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-31 19:51:18
 */
import {Http} from '@utils'
import {NativeModules, NativeEventEmitter} from 'react-native'
/**
 * 根据shopCode获取茅台专售数据
 * @param shopCode {string} 门店编码
 * @return {Promise} Http request instance
 */
export const getPurchaseActivity = (shopCode) => Http.get('productCenter', '/integralExchange/info', {shopCode})

/**
 * 根据查询资格查询积分列表
 */
export const getIntegralList = () => Http.get('productCenter', '/integralExchange/integralList', {})

/**
 * 查询可预约名店列表
 */
export const getReservationShopList = () => Http.get('productCenter', '/integralExchange/reservationShopList', {})

/**
 * 查询积分兑换活动规则
 */
export const getRuleDescription = (ruleCode) => Http.get('productCenter', '/integralExchange/ruleDescription', {ruleCode})

/**
 *【立即购买】按钮（去结算)
 * @return {Promise} Http request instance
 */
export const handleOrderAmount = (orderParams) => Http.post('productCenter', '/repurchaseActivity/order/amount', {}, orderParams)
/**
 * 添加 native 规则说明弹窗事件监听
 * @param handler 事件处理函数
 */
export function subscriptRuleModalChange(handler) {
  const eventEmitter = new NativeEventEmitter(NativeModules.SendRNEventManager)
  return eventEmitter.addListener('notifyRulePopup', handler)
}
