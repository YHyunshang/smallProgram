/*
 * @Descripttion: 
 * @Author: yuwen.liu
 * @Date: 2019-10-12 11:25:52
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-12-05 15:30:33
 */
import {NativeEventEmitter, NativeModules} from 'react-native'
import {Http, Log, Native} from '@utils'
import {Product, ProductDeliveryType, ProductLabels, ProductType} from "@common/typings";

/**
 * 获取 CMS 初始数据
 * @param shopCode {string} 门店编码
 * @return {Promise} Http request instance
 */
export function getHomeTabs(shopCode) {
  return Http.get('productCenter', `/v2/cms/mobile/${shopCode}/getHomePage?version=2`)
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
    `/cms/mobile/${tabId}/getDetailPage/${shopCode}?version=2`
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
    `/cms/mobile/${activityCode}/getActivePage/${shopCode}?version=2`
  )
}

/**
 * 根据tabId和categoryCode获取左侧分类下的商品数据
 * @param tabId  tabId
 * @param categoryCode 分类 categoryCode
 * @param shopCode 门店 code
 */
export function getDataByCategory(categoryCode: string, tabId: string, shopCode: string) {
  return Http.get(
    'productCenter',
    `/cms/mobile/${shopCode}/tabBar?tabId=${tabId}&categoryCode=${categoryCode}`
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
  Log.debug('addToCart:', JSON.stringify({
    productCode,
    productNum,
    productPrice,
    remark,
    shopCode,
  }))
  return new Promise((resolve, reject) => {
    NativeModules.HomeNativeManager.addToCart(
      'post',
      Http.formatUrl('cart', '/app/v2/shoppingCart/product'),
      JSON.stringify({
        isNewVersion: true,
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
        return resolve(res)
      }
    )
  })
}

/**
 * 获取发现页数据
 * @param shopCode 门店编码
 */
export function getFoundPageData(shopCode: string) {
  return Http.get('productCenter', `/cms/mobile/${shopCode}/getDiscoveryPage?version=2`)
}

/**
 * 将 CMS 中的跳转数据格式化为 native 识别的格式
 * @param param0 CMS 元数据，如图片等
 * @param storeCode 门店编码
 */
export function formatLink({
  link,
  linkType,
  code,
}: {
  link: string
  linkType: number
  code: string
}, storeCode?: string) {
  return linkType === 1
    ? {
        type: Native.NavPageType.NATIVE,
        uri: link,
        params: {},
      }
    : linkType === 2 ? {
        type: Native.NavPageType.RN,
        uri: 'RNActivity',
        params: { activityCode: link, type: 'activity' },
      }
    : linkType === 3 ? {
        type: Native.NavPageType.H5,
        uri: link,
        params: {},
      }
    : linkType === 4 ? {
        type: Native.NavPageType.RN,
        uri: 'RNProductDetail',
        params: { productCode: code, storeCode },
      }
    : {}
}

/**
 * 跳转到茅台专售活动的专用链接
 */
export function mouTaiActivityLink(productCode: string,shopCode: string) {
  return {
    type: Native.NavPageType.RN,
    uri: 'RNPreviewPurchase',
    params:{ activityCode: productCode, shopCode},
  }
}

/**
 * 格式化 CMS 商品数据
 * @param data CMS 商品数据
 * @param shopCode 门店编码
 */
export function formatProduct(data: { [index: string]: any }, shopCode: string = ''):Product {
  const remarkOptions = (data.resProdcutNoteNewVO || { noteContentName: [] })
    .noteContentName
  const defaultRemark = remarkOptions.find(r => r.isDefault)
  const remarks = defaultRemark
    ? [
        defaultRemark.name,
        ...remarkOptions.filter(r => !r.isDefault).map(ele => ele.name),
      ]
    : remarkOptions.map(ele => ele.name)

  const type = (data.advanceSaleProduct || { isAdvanceSale: 0 }).isAdvanceSale === 1
    ? ProductType.PreSale
    : ProductType.Normal

  return {
    type,
    cartId: data.cartId,
    code: data.code,
    categoryCode: data.categoryCode,
    thumbnail: data.imgUrl,
    name: data.name,
    desc: data.productDesc,
    spec: data.productSpecific || '',
    price: data.promotionPrice < data.price ? data.promotionPrice : data.price,
    slashedPrice: data.promotionPrice < data.price ? data.price : undefined,
    count: data.productNum || 0,
    inventoryLabel: type === ProductType.PreSale ? '' : data.inventoryLabel,
    remark: data.remark,
    remarks,
    labels: data.labelList || [],
    deliveryType: {
      1: ProductDeliveryType.InTime,
      2: ProductDeliveryType.NextDay,
    }[data.deliveryType] || ProductDeliveryType.Other,
    isPreSale: type === ProductType.PreSale,
    shopCode,
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
export function groupTags(tags: string[]): ProductLabels {
  let result: ProductLabels = {}
  tags.forEach(ele => {
    if (/\d+(\.\d+)?折/.test(ele) || /满\d/.test(ele) || /第\d+件/.test(ele)) {
      result.activity = result.activity ? [ ele ] : [...result.activity, ele]
    } else {
      result.product = result.product ? [ ele ] : [...result.product, ele]
    }
  })
  return result
}
