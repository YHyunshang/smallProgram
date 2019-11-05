/*
 * @Descripttion: 
 * @Author: yuwen.liu
 * @Date: 2019-10-12 11:25:52
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-04 16:36:17
 */
import { NativeEventEmitter, NativeModules, Alert } from 'react-native'
import { Http, Log, Native } from '@utils'

/**
 * 获取 CMS 初始数据
 * @param shopCode {string} 门店编码
 * @return {Promise} Http request instance
 */
export function getHomeTabs(shopCode) {
  return Http.get('productCenter', `/v2/cms/mobile/${shopCode}/getHomePage`)
}

/**
 * 根据token来判断是否是新人，如果是新人则显示1元新人礼包banner图
 * @return {Promise} Http request instance
 */
export function getNewPersonBanner() {
  return Http.get(
    'productCenter',
    `/newcomer/banner`
  )
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
 * 添加 newcomer 新人身份变化事件监听
 * @param handler 事件处理函数
 */
export function subscriptNewcomerChange(handler: (...args: any[]) => any) {
  const eventEmitter = new NativeEventEmitter(NativeModules.SendRNEventManager)
  return eventEmitter.addListener('newcomerChange', handler)
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
        if (errMsg === '未登录')
          return reject('update cart failed: anonymous user')

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
  return Http.get('productCenter', `/cms/mobile/${shopCode}/getDiscoveryPage?version=1`)
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
 * 跳转到茅台专售活动的专用链接
 */
export function mouTaiActivityLink(link: string) {
  return {
    type: Native.NavPageType.RN,
    uri: 'RNPreviewPurchase',
    params:{ activityCode: link},
  }
}

/**
 * 格式化 CMS 商品数据
 * @param data CMS 商品数据
 */
export function formatProduct(data: { [index: string]: any }) {
  const [priceTags, productTags] = groupTags(data.labelList || [])

  const remarkOptions = (data.resProdcutNoteNewVO || { noteContentName: [] })
    .noteContentName
  const defaultRemark = remarkOptions.find(r => r.isDefault)
  const remarks = defaultRemark
    ? [
        defaultRemark.name,
        ...remarkOptions.filter(r => !r.isDefault).map(ele => ele.name),
      ]
    : remarkOptions.map(ele => ele.name)

  return {
    cartId: data.cartId,
    code: data.code,
    thumbnail: data.imgUrl,
    name: data.name,
    desc: data.productDesc,
    priceTags,
    productTags,
    spec: data.productSpecific || '',
    price: data.promotionPrice < data.price ? data.promotionPrice : data.price,
    slashedPrice: data.promotionPrice < data.price ? data.price : undefined,
    count: data.productNum || 0,
    inventoryLabel: data.inventoryLabel,
    remark: data.remark,
    remarks,
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

/**
 * 将标签列表按照 价格标签 / 商品标签 分组
 * @param tags 标签列表
 * @returns [ 价格标签列表，商品标签列表 ]
 */
export function groupTags(tags: string[]): [string[], string[]] {
  return tags.reduce(
    ([priceTagLst, productTagLst], cur) => {
      return /\d+(\.\d+)?折/.test(cur) ||
        /满\d/.test(cur) ||
        /第\d+件/.test(cur)
        ? [[...priceTagLst, cur], productTagLst]
        : [priceTagLst, [...productTagLst, cur]]
    },
    [[], []]
  )
}
