/*
 * @Description: goodsDetail
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-16 09:54:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-29 15:03:40
 */
import { Http } from '@utils'
import { NativeModules, NativeEventEmitter } from 'react-native'
import * as WeChat from 'react-native-wechat'
import { WXAppId, WeChatMP } from '@common/config'
import { showToast, ENV } from '@utils/native'

/**
 * 根据storeCode，productCode获取商品详情的数据
 * @param storeCode {string} 门店编码,
 * @param productCode {string} 商品编码
 * @return {Promise} Http request instance
 */
export const getGoodsDetailData = (storeCode, productCode) =>
  Http.get('goodsDetail', '/app/product/queryProductDetailByCode', {
    storeCode,
    productCode,
  })
/**
 * 根据productParams获取生成海报的图片地址
 * @param productParams {Object} 商品信息
 * @return {Promise} Http request instance
 */
export const getPosterImgUrl = productParams =>
  Http.post('goodsDetail', '/share/product', {}, productParams)

/**
 * 根据商品编码、门店编码获取相似商品列表
 * @param params {Object} storeCode，productCode
 * @return {Promise} Http request instance
 */
export const getSimilarProduct = (productCode, storeCode) =>
  Http.get('goodsDetail', '/app/product/querySimilarProductByCode', {
    productCode,
    storeCode,
  })
/**
 * 相似商品列表里面添加购物车
 * @param params  productCode，productNum,productPrice
 * @return {Promise} Http request instance
 */
export const addToCart = (item, type) => {
  NativeModules.GoodsDetailsNativeManager.addToCart(item, type)
}

/**
 * 添加 native 相似商品列表购物车数量事件监听
 * @param handler 事件处理函数
 */
export function subscriptCartNumberChange(handler) {
  const eventEmitter = new NativeEventEmitter(NativeModules.SendRNEventManager)
  return eventEmitter.addListener('setItemNumberByProductcode', handler)
}
/**
 * 保存图片至相册申请存储权限到方法
 * @return {Promise} Http request instance
 */
export const applyPermission = () => {
  NativeModules.GoodsDetailsNativeManager.applyPermission()
}

/**
 * 添加 native 保存图片到相册到权限申请事件监听
 * @param handler 事件处理函数
 */
export function subscriptApplyPermissionChange(handler) {
  const eventEmitter = new NativeEventEmitter(NativeModules.SendRNEventManager)
  return eventEmitter.addListener('applyResult', handler)
}

/**
 * 获取预售商品详情信息
 * @param productCode 商品编码
 * @param storeCode 门店编码
 * @param activityCode 预售活动编码
 * @return {*|void|Promise<AxiosResponse<T>>}
 */
export const getPreSaleProduct = (productCode, storeCode, activityCode) =>
  Http.post('goodsDetail', '/app/product/queryAdvanceSaleDetail', {
    productCode,
    storeCode,
    activityCode,
  })

/**
 * 获取商品海报
 * @return {*|void|Promise<AxiosResponse<T>>}
 */
export const getPoster = ({ name, price, code, storeCode, thumbnail }) =>
  Http.post(
    'goodsDetail',
    '/share/product',
    {},
    {
      appId: WeChatMP.appId,
      productName: name,
      pageUrl: WeChatMP.pages.productDetail,
      productPrice: price,
      productImgUrl: thumbnail,
      sceneValue: `${code},${storeCode}`,
      width: 246,
    }
  )

/**
 * 通过小程序分享商品给微信好友
 * @type {function({name: *, code: *, storeCode: *, thumbnail?: *, desc?: *}): Promise<T | never>}
 */
export const shareToWxFriends = (function() {
  WeChat.registerApp(WXAppId)

  return ({ name, code, storeCode, thumbnail, desc }) =>
    WeChat.isWXAppInstalled().then(installed => {
      if (!installed) {
        showToast('没有安装微信软件，请您安装微信之后再试', '0')
        return new Error('WeChat is not installed')
      }
      return WeChat.shareToSession({
        type: 'miniProgram',
        title: name,
        thumbImage: thumbnail,
        description: desc,
        miniProgramType: ENV === 'prod' ? 0 : 2, // 分享小程序版本 正式版:0，测试版:1，体验版:2
        userName: WeChatMP.id, // 小程序原生id非appid
        webpageUrl:
          'http://static-yh.yonghui.cn/downloadApp/buyVegetables/download.html',
        path: `/pages/product-detail/product-detail?productCode=${code}&storeCode=${storeCode}`, // 小程序商品详情页面路径
      })
    })
})()
