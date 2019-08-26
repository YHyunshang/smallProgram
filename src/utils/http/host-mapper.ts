/*
 * @Description: host-mapper
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-16 09:55:16
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-26 09:53:17
 */
/**
 * Created by 李华良 on 2019-07-26
 */
export default {
  dev: {
    cart: 'http://xszt-dev.2c-order.devgw.yonghui.cn',
    goodsDetail: 'http://xszt-dev.yh-soi-2c-productcenter.devgw.yonghui.cn',
    productCenter: 'http://xszt-dev.yh-soi-2c-productcenter.devgw.yonghui.cn',
  },
  test: {
    cart: 'http://xszt-sit.2c-order.sitapis.yonghui.cn',
    goodsDetail:
      'http://xszt-sit.yh-soi-2c-productcenter.xszt-001.sitapis.yonghui.cn',
    productCenter:
      'http://xszt-sit.yh-soi-2c-productcenter.xszt-001.sitapis.yonghui.cn',
  },
  preProd: {
    cart: 'http://xszt-sit.2c-order.sitgw.yonghui.cn',
    productCenter: 'http://xszt-dev.yh-soi-2c-productcenter.devgw.yonghui.cn',
  },
  prod: {
    cart: 'https://yh-soi-2c-order.yonghui.cn',
    goodsDetail: 'https://yh-soi-2c-productcenter.yonghui.cn',
    productCenter: 'https://yh-soi-2c-productcenter.yonghui.cn',
  },
}
