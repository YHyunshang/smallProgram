import { string } from 'prop-types'
/**
 * Created by 李华良 on 2019-07-26
 */
import { NativeEventEmitter, NativeModules } from 'react-native'
import { Http, Log, Native } from '@utils'

/**
 * 获取 CMS 初始数据
 * @param shopCode {string} 门店编码
 * @return {Promise} Http request instance
 */
export function getHomeTabs(shopCode) {
  return Http.get('productCenter', `/cms/mobile/${shopCode}/getHomePage`)
}

/**
 * 根据 tab id 获取 CMS 数据
 * @param tabId {number|string} CMS tab id
 * @param shopCode {number|string} shopCode
 * @return {Promise} Http request instance
 */
export function getFloorDataByTab(tabId, shopCode) {
  return Http.get(
    'productCenter',
    `/cms/mobile/${tabId}/getDetailPage/${shopCode}`
  )
}

/**
 * 添加商品到购物车
 * @param productCode 商品编码
 * @param productNum 商品数量
 * @param productPrice 商品价格
 */
export function addToCart(
  productCode: string,
  productNum: number,
  productPrice: number | string
) {
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
  return NativeModules.HomeNativeManager.sendContentOffset(
    x.toString(),
    y.toString()
  )
}

/**
 * 添加 native 门店变化事件监听
 * @param handler 事件处理函数
 */
export function subscriptShopChange(handler: (...args: any[]) => any) {
  const eventEmitter = new NativeEventEmitter(NativeModules.SendRNEventManager)
  return eventEmitter.addListener('storeChange', handler)
}

/**
 * 获取活动数据
 * @param activityCode 活动 code
 * @param shopCode 门店 code
 */
export function getActivity(activityCode: string, shopCode: string) {
  return Http.get(
    'productCenter',
    `/cms/mobile/${activityCode}/getActivePage/${shopCode}`
  )
}

/**
 * 更新商品在购物车中的数量
 * @param productCode 商品编码
 * @param productNum 数量
 * @param productPrice 价格
 * @param remark 备注
 * @param shopCode 门店编码
 */
export function updateProductCountInCart(
  productCode: string,
  productNum: number,
  productPrice: number,
  remark = '',
  shopCode: string
) {
  return new Promise((resolve, reject) => {
    NativeModules.HomeNativeManager.addToCart(
      'post',
      Http.formatUrl('cart', '/app/shoppingCart/product'),
      JSON.stringify({
        productCode,
        productNum,
        productPrice,
        remark,
        shopCode,
      }),
      (errMsg, responseData) => {
        if (errMsg) {
          Native.showToast('添加到购物车失败')
          return reject('update cart failed')
        }
        const res = JSON.parse(responseData)
        if (res.code !== 200000) {
          Native.showToast(res.message || '系统异常')
          return reject(res.message)
        }
        return resolve(responseData)
      }
    )
  })
}

/**
 * 获取发现页数据
 * @param shopCode 门店编码
 */
export function getFoundPageData(shopCode: string) {
  return Http.get('productCenter', `/cms/mobile/${shopCode}/getDiscoveryPage`)
}

/**
 * 将 CMS 中的跳转数据格式化为 native 识别的格式
 * @param param0 CMS 元数据，如图片等
 */
export function formatLink({
  link,
  linkType,
}: {
  link: string
  linkType: string
}) {
  const apiType2NativeType = {
    1: Native.NavPageType.NATIVE,
    2: Native.NavPageType.RN,
    3: Native.NavPageType.H5,
  }
  const type = apiType2NativeType[linkType]
  return {
    type: type,
    uri: type === Native.NavPageType.RN ? 'RNActivity' : link,
    params:
      type === Native.NavPageType.RN
        ? { activityCode: link, type: 'activity' }
        : {},
  }
}

/**
 * 格式化 CMS 商品数据
 * @param data CMS 商品数据
 */
export function formatProduct(data: { [index: string]: any }) {
  return {
    cartId: data.cartId,
    code: data.code,
    thumbnail: data.imgUrl,
    name: data.name,
    desc: data.productDesc,
    tag: (data.labelList || [])[0] || '',
    spec: data.productSpecific || '',
    price: data.promotionPrice < data.price ? data.promotionPrice : data.price,
    slashedPrice: data.promotionPrice < data.price ? data.price : undefined,
    count: data.productNum || 0,
  }
}

/**
 * 获取购物车概况：商品数量、总金额等
 * @param shopCode 门店编码
 */
export function getCartInfo(shopCode: string) {
  return Http.post(
    'cart',
    '/app/cart/selectNumTotalNumAmount',
    {},
    { shopCode }
  )
}
