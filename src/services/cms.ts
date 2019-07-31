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
 * 添加商品到购物车
 * @param productCode 商品编码
 * @param productNum 商品数量
 * @param productPrice 商品价格
 */
export function addToCart(productCode:string, productNum:number, productPrice:number|string) {
  return NativeModules.HomeNativeManager.addToCart(
    'post',
    Http.formatUrl('cart', '/shopping_cart/product'),
    JSON.stringify({ productCode, productNum, productPrice }),
    (errMsg, responseData) => {
      if (errMsg) {
        Log.error('add to cart failed')
      }
    }
  )
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
