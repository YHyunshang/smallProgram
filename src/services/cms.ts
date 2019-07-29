/**
 * Created by 李华良 on 2019-07-26
 */
import { NativeModules } from 'react-native'
import { Http, Log } from '@utils'

/**
 * 获取 CMS 初始数据
 * @param shopCode {string} 门店编码
 * @return {Promise} Http request instance
 */
export function getInitialData(shopCode) {
  return Http.get('cms', `/cms/mobile/${shopCode}/getHomePage`)
}

/**
 * 根据 tab id 获取 CMS 数据
 * @param tabId {number|string} CMS tab id
 * @param shopCode {number|string} shopCode
 * @return {Promise} Http request instance
 */
export function getFloorDataByTab(tabId, shopCode) {
  return Http.get('cms', `/cms/mobile/${tabId}/getDetailPage/${shopCode}`)
}

// todo: fill add cart
export function addToCart() {
}

/**
 * 向 native 推送页面滚动信息
 * @param x {string | number} x 轴偏移量
 * @param y {string | number} y 轴偏移量
 */
export function pushScrollToNative(x, y) {
  Log.debug(`calling HomeNativeManager.sendContentOffset(${x}, ${y})`)
  return NativeModules.HomeNativeManager.sendContentOffset(x.toString(), y.toString())
}
