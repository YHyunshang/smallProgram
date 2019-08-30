/*
 * @Description: goodsDetail
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-16 09:54:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-30 16:33:49
 */
/**
 * Created by 李华良 on 2019-07-26
 */
import {Http} from '@utils'
import {NativeModules, NativeEventEmitter} from 'react-native'
/**
 * 根据storeCode，productCode获取商品详情的数据
 * @param storeCode {string} 门店编码,
 * @param productCode {string} 商品编码
 * @return {Promise} Http request instance
 */
export const getGoodsDetailData = (storeCode, productCode) => Http.get('goodsDetail', '/app/product/queryProductDetailByCode', {storeCode, productCode})
/**
 * 根据productParams获取生成海报的图片地址
 * @param productParams {Object} 商品信息
 * @return {Promise} Http request instance
 */
export const getPosterImgUrl = (productParams) => Http.post('goodsDetail', '/share/product', {}, productParams)

/**
 * 根据商品编码、门店编码获取相似商品列表
 * @param params {Object} storeCode，productCode
 * @return {Promise} Http request instance
 */
export const getSimilarProduct = (productCode, storeCode) => Http.get('goodsDetail', '/app/product/querySimilarProductByCode', {productCode, storeCode})
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
