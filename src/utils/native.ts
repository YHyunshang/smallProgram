/**
 * Created by 李华良 on 2019-07-29
 */
import { NativeModules, Platform, Dimensions, StatusBar } from 'react-native'
import * as Log from './log'

export enum NavPageType {
  NATIVE = '0',
  RN = '1',
  H5 = '2',
}
export interface Navigation {
  type: NavPageType
  uri: string
  params?: {}
  title?: string
}
/**
 * 跳转页面
 * @param param0 type：页面类型，使用枚举 NavPageType;
 *               uri：native 页面 Key / RN 页面 module 名称；
 *               params： 跳转页面所需参数
 *               title：页面标题
 */
export async function navigateTo({ type, uri, params, title }: Navigation) {
  let navigate: Function
  try {
    navigate = NativeModules.HomeNativeManager.pushToNewPage
  } catch (e) {
    throw new Error('Native error: no HomeNativeManager.pushToNewPage function')
  }

  let platformUri: string
  if (type === NavPageType.H5) platformUri = uri
  else {
    const uriArr = uri.split(',')
    platformUri = (Platform.OS === 'ios' ? uriArr[0] : uriArr[1]) || ''
  }

  const pageType = type
  const pageUri = platformUri

  Log.debug(
    'calling HomeNativeManager.pushToNewPage with arguments',
    pageType,
    pageUri,
    JSON.stringify({ params, title })
  )

  return navigate(pageType, pageUri, JSON.stringify({ params, title }))
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
 *
 * iPhone X* 预设 44；其他 iPhone 预设 20
 * Android 统一为当前 StatusBar 高度 + 5（美人尖高度）
 */
export const getStatusBarHeight = () =>
  isiOS() ? (isiPhoneX() ? 44 : 20) : StatusBar.currentHeight + 5
