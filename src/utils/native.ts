/*
 * @Descripttion: 原生通用方法封装
 * @Author: yuwen.liu
 * @Date: 2019-10-12 11:25:52
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-16 16:18:51
 */
import {
  NativeModules,
  Platform,
  Dimensions,
  StatusBar,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native'
import * as Log from './log'
import { Product } from '@components/business/Content/typings'

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
  if (type === NavPageType.H5 || type === NavPageType.RN) platformUri = uri
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
    JSON.stringify({ params: { ...params, title } })
  )

  return navigate(
    pageType,
    pageUri,
    JSON.stringify({ params: { ...params, title: title || '永辉买菜' } })
  )
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
  return NativeModules.HomeNativeManager.setTitle(title || '')
}

/**
 * 首页1元新人礼包调用原生弹窗
 * @param showPromotionProductListDialog  首页弹出新人购弹窗事件
 * @param params 参数
 */
export function jumpToNativeDialog(showPromotionProductListDialog: string, params: string) {
  //RN模块调用原生的通用方法
  return NativeModules.RnAppModule.sendEventToNative(showPromotionProductListDialog, params)
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
export const isiOS = (() => Platform.OS === 'ios')()

/**
 * 是否是 iPhoneX
 */
export const isiPhoneX = (() => {
  return (
    (isiOS &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  )
})()

/**
 * 获取系统 StatusBar 高度
 *
 * iPhone X* 预设 44；其他 iPhone 预设 20
 * Android 统一为当前 StatusBar 高度 + 5（美人尖高度）
 */
export const getStatusBarHeight = () =>
  isiOS ? (isiPhoneX ? 44 : 20) : StatusBar.currentHeight + 5

/**
 * 监听购物车变化
 * @param handler
 */
export function onCartChange(handler: (...args: any) => any) {
  return DeviceEventEmitter.addListener('notifyRefreshCartNum', handler)
}

/**
 * 展示商品备注，用户选择后添加到购物车
 * @param products 商品对象
 */
export function showRemarkPickerBeforeAddToCart(
  product: Product
): Promise<number> {
  console.log(product)
  const price =
    product.price < product.slashedPrice ? product.slashedPrice : product.price
  const promotionPrice =
    product.price < product.slashedPrice ? product.price : 0
  NativeModules.RnAppModule.addToCartWithRemark(
    JSON.stringify({
      productName: product.name,
      price,
      promotionPrice,
      noteContentList: product.remarks,
      imageUrl: product.thumbnail,
      productNum: 0,
      productCode: product.code,
      productSpecific: product.spec,
      stockQuantity: 9999,
    })
  )
  return new Promise((resolve, reject) => {
    const eventEmitter = new NativeEventEmitter(
      NativeModules.SendRNEventManager
    )
    eventEmitter.addListener(
      'setItemNumberByProductcode',
      ({ productCode, productNumber }) => {
        Log.debug('[show remark result]', productCode, productNumber)
        return productNumber == 1
          ? resolve(Number(productNumber))
          : reject(new Error('add to cart failed'))
      }
    )
  })
}

/**
 * 监听 native 事件
 */
export const onNativeEvent = (function() {
  const emitter = new NativeEventEmitter(NativeModules.SendRNEventManager)
  let cbMapper: { [eventName: string]: Function[] } = {}
  let listenerMapper: { [eventName: string]: { remove: Function } } = {}

  return (event: string, handler: Function) => {
    if (!cbMapper[event] || cbMapper[event].length === 0) {
      cbMapper[event] = [handler]
      listenerMapper[event] = emitter.addListener(event, function(
        ...args: any[]
      ) {
        Log.debug(`EVENT::${event}, payload:`, ...args)
        cbMapper[event].forEach(cb => cb(...args))
      })
    } else {
      cbMapper[event].push(handler)
    }

    return () => {
      cbMapper[event] = cbMapper[event].filter(cb => cb !== handler)

      if (cbMapper[event].length === 0) {
        listenerMapper[event].remove()
        delete cbMapper[event]
        delete listenerMapper[event]
      }
    }
  }
})()
