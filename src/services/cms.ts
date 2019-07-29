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

/**
 * 从 native 获取常量
 * @param key {string} 从 native 获取常量
 */
export async function getNativeConstant(key:string) {
  const result = NativeModules.HomeNativeManager[key]
  Log.debug(`HomeNativeManager.${key} returned ${result}`)
  return result
}

/**
 * 通过 native 跳转页面
 * @param type {string|number} 跳转页面类型
 * @param uri {string} 跳转页面路径/code
 * @param extraData {object} 跳转传参
 */
export function navigateTo(type:string|number, uri:string, extraData={}) {
  let _uri_ = uri
  let _extraData_ = { ...extraData }
  if (type === 2) {
    _uri_ = ''
    _extraData_['activityCode'] = uri
  }
  const _type_ = {
    1: '0',  // 原生
    2: '1',  // RN 活动
    3: '2',  // h5
  }[type] || type

  Log.debug('calling HomeNativeManager.pushToNewPage:', type, uri, extraData)
  return NativeModules.HomeNativeManager.pushToNewPage(_type_, _uri_, JSON.stringify(_extraData_))
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
