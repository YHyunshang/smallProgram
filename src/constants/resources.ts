/*
 * @Descripttion: resources.ts
 * @Author: yuwen.liu
 * @Date: 2019-09-06 13:54:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-29 20:52:03
 */
import {Platform} from 'react-native'

const os = Platform.OS
const isAndroid = os === 'android'

export const cartGray = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/cart-gray.png'}
  : require('@img/cart-gray.png')

export const cart = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/cart.png'}
  : require('@img/cart.png')

export const emptyActivity = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/empty-activity.green.png'}
  : require('@img/empty-activity.png')

export const emptyBag = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/empty-bag.green.png'}
  : require('@img/empty-bag.png')

export const hotSaleBanner = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/hot-sale-banner.green.png'}
  : require('@img/hot-sale-banner.png')

export const hotSaleTabBg = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/hot-sale-tab-bg.green.png'}
  : require('@img/hot-sale-tab-bg.png')

export const iconChecked = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-checked.green.png'}
  : require('@img/icon-checked.png')

export const iconSortAsc = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-sort-asc.green.png'}
  : require('@img/icon-sort-asc.png')

export const iconSortDesc = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-sort-desc.green.png'}
  : require('@img/icon-sort-desc.png')

export const iconSort = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-sort.png'}
  : require('@img/icon-sort.png')

export const iconUnchecked = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-unchecked.png'}
  : require('@img/icon-unchecked.png')

export const minusCircleDisabled = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/minus-circle-disabled.png'}
  : require('@img/minus-circle-disabled.png')

export const minusCircle = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/minus-circle.green.png'}
  : require('@img/minus-circle.png')

export const placeholderBox = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/placeholder-box.png'}
  : require('@img/placeholder-box.png')

export const placeholderProduct = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/placeholder-product.png'}
  : require('@img/placeholder-product.png')

export const plusCircleDisabled = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/plus-circle-disabled.png'}
  : require('@img/plus-circle-disabled.png')

export const plusCircle = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/plus-circle.green.png'}
  : require('@img/plus-circle.png')

export const plus = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/plus.png'}
  : require('@img/plus.png')

export const productConditions = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/product-conditions.png'}
  : require('@img/product-conditions.png')

export const productPlace = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/product-place.png'}
  : require('@img/product-place.png')

export const productSpecific = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/product-specific.png'}
  : require('@img/product-specific.png')

export const wechatFriend = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/wechat-friend.png'}
  : require('@img/wechat-friend.png')

export const wechatMoments = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/wechat-moments.png'}
  : require('@img/wechat-moments.png')

export const addToCart = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/add-to-cart.green.png'}
  : require('@img/add-to-cart.png')

export const iconExpand = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-expand.png'}
  : require('@img/icon-expand.png')

export const iconArrowRight = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-arrow-right.png'}
  : require('@img/icon-arrow-right.png')

export const bannerLimitTimeBuy = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/banner-limit-time-buy.png'}
  : require('@img/banner-limit-time-buy.png')

export const iconPlusCircleRed = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-plus-circle-red.png'}
  : require('@img/icon-plus-circle-red.png')

export const iconMinusCircleRed = isAndroid
  ? {uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-minus-circle-red.png'}
  : require('@img/icon-minus-circle-red.png')
export const buyLimit =isAndroid
    ? { uri: 'https://static-yh.yonghui.cn/app/assets/xszt-RN/buy-limit.png' }
    : require('@img/buy-limit.png')
export const yellowWarn =isAndroid
    ? { uri: 'https://static-yh.yonghui.cn/app/assets/xszt-RN/yellow-info.png' }
    : require('@img/yellow-info.png')

