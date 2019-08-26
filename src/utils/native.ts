/**
 * Created by 李华良 on 2019-07-29
 */
import { NativeModules, Platform, Dimensions, StatusBar } from 'react-native'
import * as Log from './log'

/**
 * navigate based on native router
 * @param type link type: 0 - native, 1 - RN, 2 - h5
 * @param uri link uri
 * @param params parameters passed to the linked page
 */
export async function navigateTo({ type, uri, params = {} }) {
  let navigate: Function
  try {
    navigate = NativeModules.HomeNativeManager.pushToNewPage
  } catch (e) {
    throw new Error('Native error: no HomeNativeManager.pushToNewPage function')
  }

  let _uri_ = uri
  let _extraData_ = { ...params }

  const _type_ =
    {
      1: '0', // 原生
      2: '1', // RN 活动
      3: '2', // h5
    }[type] || type

  if (!_type_) return

  if (_type_ === '0') {
    let uriArr = uri.split(',')
    _uri_ =
      Platform.OS === 'ios'
        ? uriArr[0]
        : Platform.OS === 'android'
        ? uriArr[1]
        : ''
  } else if (_type_ === '1') {
    _uri_ = 'RNActivity'
    _extraData_ = { params: { activityCode: uri, type: 'activity' } }
  }

  Log.debug(
    'calling HomeNativeManager.pushToNewPage:',
    _type_,
    _uri_,
    _extraData_
  )
  return navigate(_type_, _uri_, JSON.stringify(_extraData_))
}

/**
 * get native constants
 * @param key native key name
 */
export async function getConstant(key: string): Promise<any> {
  return NativeModules.HomeNativeManager[key]
}

/**
 * 设置页面标题
 * @param title 页面 title
 */
export function setTitle(title = '') {
  return NativeModules.HomeNativeManager.setTitle(title)
}

/**
 * 展示 toast
 * @param message 消息文本
 * @param type 类型：成功 1 / 失败 0
 */
export function showToast(message: string, type = '0') {
  return NativeModules.RnAppModule.showToast(message, type)
}

/**
 * 设置当前首页第一个 tab 的激活状态
 * @param isActive 是否是激活的
 */
export function setHomeFirstTabActiveStatus(isActive) {
  return NativeModules.HomeNativeManager.changeRNTab(isActive ? '0' : '1')
}

// iPhone X、iPhone XS
const X_WIDTH = 375
const X_HEIGHT = 812

// iPhone XR、iPhone XS Max
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896

const DEVICE_SIZE = Dimensions.get('window')
const { height: D_HEIGHT, width: D_WIDTH } = DEVICE_SIZE

/**
 * 是否是 iOS 设备
 */
export const isiOS = () => Platform.OS === 'ios'

/**
 * 是否是 iPhoneX
 */
export const isiPhoneX = () => {
  return (
    (isiOS() &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  )
}

/**
 * 获取系统 StatusBar 高度
 */
export const getStatusBarHeight = () =>
  isiOS() ? (isiPhoneX() ? 44 : 20) : StatusBar.currentHeight
