/**
 * Created by 李华良 on 2019-07-26
 */
import {Http} from '@utils'

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
export const getPosterImgUrl = (productParams) => Http.post('userCenter', '/public/getWXComposeImg', {}, JSON.stringify(productParams))
