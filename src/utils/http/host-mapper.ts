/*
 * @Description: host-mapper
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-16 09:55:16
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-23 13:53:22
 */
/**
 * Created by 李华良 on 2019-07-26
 */
export default {
  dev: {
    cart: 'http://xszt-dev.2c-order.devgw.yonghui.cn',
    goodsDetail: 'http://xszt-dev.yh-soi-2c-productcenter.devgw.yonghui.cn',
<<<<<<< HEAD
    userCenter: 'http://xszt-dev.yh-sod-usercenter.devgw.yonghui.cn',
    mock: 'https://easy-mock.com/mock/5d391b1acf550c1615de1cba/mess',
=======
    userCenter: 'http://xszt-sit.yh-sod-usercenter.sitgw.yonghui.cn',
    productCenter: 'http://xszt-dev.yh-soi-2c-productcenter.devgw.yonghui.cn',
>>>>>>> master
  },
  test: {
    cart: 'http://xszt-sit.2c-order.sitapis.yonghui.cn',
    goodsDetail:
      'http://xszt-sit.yh-soi-2c-productcenter.xszt-001.sitapis.yonghui.cn',
    userCenter: 'http://xszt-sit.yh-sod-usercenter.sitapis.yonghui.cn',
    productCenter:
      'http://xszt-sit.yh-soi-2c-productcenter.xszt-001.sitapis.yonghui.cn',
  },
  preProd: {
    cart: 'http://xszt-sit.2c-order.sitgw.yonghui.cn',
    userCenter: 'https://yh-sod-usercenter.yonghui.cn',
    productCenter: 'http://xszt-dev.yh-soi-2c-productcenter.devgw.yonghui.cn',
  },
  prod: {
    cart: 'https://yh-soi-2c-order.yonghui.cn',
    goodsDetail: 'https://yh-soi-2c-productcenter.yonghui.cn',
    userCenter: 'https://yh-sod-usercenter.yonghui.cn',
    productCenter: 'https://yh-soi-2c-productcenter.yonghui.cn',
  },
}
