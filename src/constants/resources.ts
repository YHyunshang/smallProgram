/**
 * Created by 李华良 on 2019-08-30
 */
import { Platform } from 'react-native'

const os = Platform.OS

export const cartGray =
  os === 'android'
    ? { uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/cart-gray.png' }
    : require('@img/cart-gray.png')

export const cart =
  os === 'android'
    ? { uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/cart.png' }
    : require('@img/cart.png')

export const emptyActivity =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/empty-activity.green.png',
      }
    : require('@img/empty-activity.png')

export const emptyBag =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/empty-bag.green.png',
      }
    : require('@img/empty-bag.png')

export const hotSaleBanner =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/hot-sale-banner.green.png',
      }
    : require('@img/hot-sale-banner.png')

export const hotSaleTabBg =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/hot-sale-tab-bg.green.png',
      }
    : require('@img/hot-sale-tab-bg.png')

export const iconChecked =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-checked.green.png',
      }
    : require('@img/icon-checked.png')

export const iconSortAsc =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-sort-asc.green.png',
      }
    : require('@img/icon-sort-asc.png')

export const iconSortDesc =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-sort-desc.green.png',
      }
    : require('@img/icon-sort-desc.png')

export const iconSort =
  os === 'android'
    ? { uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-sort.png' }
    : require('@img/icon-sort.png')

export const iconUnchecked =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-unchecked.png',
      }
    : require('@img/icon-unchecked.png')

export const minusCircleDisabled =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/minus-circle-disabled.png',
      }
    : require('@img/minus-circle-disabled.png')

export const minusCircle =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/minus-circle.green.png',
      }
    : require('@img/minus-circle.png')

export const placeholderBox =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/placeholder-box.png',
      }
    : require('@img/placeholder-box.png')

export const placeholderProduct =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/placeholder-product.png',
      }
    : require('@img/placeholder-product.png')

export const plusCircleDisabled =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/plus-circle-disabled.png',
      }
    : require('@img/plus-circle-disabled.png')

export const plusCircle =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/plus-circle.green.png',
      }
    : require('@img/plus-circle.png')

export const plus =
  os === 'android'
    ? { uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/plus.png' }
    : require('@img/plus.png')

export const productConditions =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/product-conditions.png',
      }
    : require('@img/product-conditions.png')

export const productPlace =
  os === 'android'
    ? {
        uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/product-place.png',
      }
    : require('@img/product-place.png')

export const productSpecific =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/product-specific.png',
      }
    : require('@img/product-specific.png')

export const wechatFriend =
  os === 'android'
    ? {
        uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/wechat-friend.png',
      }
    : require('@img/wechat-friend.png')

export const wechatMoments =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/wechat-moments.png',
      }
    : require('@img/wechat-moments.png')

export const addToCart =
  os === 'android'
    ? {
        uri:
          'http://static-yh.yonghui.cn/app/assets/xszt-RN/add-to-cart.green.png',
      }
    : require('@img/add-to-cart.png')

export const iconExpand =
  os === 'android'
    ? { uri: 'http://static-yh.yonghui.cn/app/assets/xszt-RN/icon-expand.png' }
    : require('@img/icon-expand.png')
