/*
 * @Description: goodsDetail
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-16 09:54:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-23 18:48:01
 */
/**
 * Created by 李华良 on 2019-07-26
 */
import {Http} from '@utils'
import {NativeModules} from 'react-native'
const rnAppModule = NativeModules.RnAppModule// 原生模块
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
export const addToCart = (productCode, productNum, productPrice) => {
  NativeModules.HomeNativeManager.addToCart(
    'post',
    Http.formatUrl('cart', '/shopping_cart/product'),
    {productCode, productNum, productPrice},
    (errMsg, responseData) => {
      if (errMsg) {
        rnAppModule.showToast(errMsg, '0')
      }
    }
  )
}
