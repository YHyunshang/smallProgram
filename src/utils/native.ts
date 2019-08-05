/**
 * Created by 李华良 on 2019-07-29
 */
import { NativeModules, Platform } from "react-native"
import * as Log from "./log"

/**
 * navigate based on native router
 * @param type link type: 0 - native, 1 - RN, 2 - h5
 * @param uri link uri
 * @param params parameters passed to the linked page
 */
export async function navigateTo(type: string | number, uri: string, params={}) {
  let navigate: Function
  try {
    navigate = NativeModules.HomeNativeManager.pushToNewPage
  } catch (e) {
    throw new Error('Native error: no HomeNativeManager.pushToNewPage function')
  }

  let _uri_ = uri
  let _extraData_ = { ...params }

  const _type_ = {
    1: '0',  // 原生
    2: '1',  // RN 活动
    3: '2',  // h5
  }[type] || type

  if (!_type_) return

  if (_type_ === '0') {
    let uriArr = uri.split(',')
    _uri_ = Platform.OS === 'ios' ? uriArr[0]
      : Platform.OS === 'android' ? uriArr[1]
      : ''
  } else if (_type_ === '1') {
    _uri_ = 'RNCMS'
    _extraData_ = { params: { activityCode: uri, type: 'activity' } }
  }

  Log.debug('calling HomeNativeManager.pushToNewPage:', _type_, _uri_, _extraData_)
  return navigate(_type_, _uri_, JSON.stringify(_extraData_))
}

/**
 * get native constants
 * @param key native key name
 */
export async function getConstant(key:string) {
  return NativeModules.HomeNativeManager[key]
}

/**
 * 设置页面标题
 * @param title 页面 title
 */
export function setTitle(title='') {
  return NativeModules.HomeNativeManager.setTitle(title)
}