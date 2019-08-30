/**
 * Created by 李华良 on 2019-08-30
 */
import { Platform } from 'react-native'

const os = Platform.OS

export const cartGray =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_cartgray.png' }
    : require('@img/cart-gray.png')

export const cart =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_cart.png' }
    : require('@img/cart.png')

export const emptyActivity =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_emptyactivity.png' }
    : require('@img/empty-activity.png')

export const emptyBag =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_emptybag.png' }
    : require('@img/empty-bag.png')

export const hotSaleBanner =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_hotsalebanner.png' }
    : require('@img/hot-sale-banner.png')

export const hotSaleTabBg =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_hotsaletabbg.png' }
    : require('@img/hot-sale-tab-bg.png')

export const iconChecked =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_iconchecked.png' }
    : require('@img/icon-checked.png')

export const iconSortAsc =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_iconsortasc.png' }
    : require('@img/icon-sort-asc.png')

export const iconSortDesc =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_iconsortdesc.png' }
    : require('@img/icon-sort-desc.png')

export const iconSort =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_iconsort.png' }
    : require('@img/icon-sort.png')

export const iconUnchecked =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_iconunchecked.png' }
    : require('@img/icon-unchecked.png')

export const minusCircleDisabled =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_minuscircledisabled.png' }
    : require('@img/minus-circle-disabled.png')

export const minusCircle =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_minuscircle.png' }
    : require('@img/minus-circle.png')

export const placeholderBox =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_placeholderbox.png' }
    : require('@img/placeholder-box.png')

export const placeholderProduct =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_placeholderproduct.png' }
    : require('@img/placeholder-product.png')

export const plusCircleDisabled =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_pluscircledisabled.png' }
    : require('@img/plus-circle-disabled.png')

export const plusCircle =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_pluscircle.png' }
    : require('@img/plus-circle.png')

export const plus =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_plus.png' }
    : require('@img/plus.png')

export const productConditions =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_productconditions.png' }
    : require('@img/product-conditions.png')

export const productPlace =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_productplace.png' }
    : require('@img/product-place.png')

export const productSpecific =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_productspecific.png' }
    : require('@img/product-specific.png')

export const wechatFriend =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_wechatfriend.png' }
    : require('@img/wechat-friend.png')

export const wechatMoments =
  os === 'android'
    ? { uri: 'assets:/src_assets_imgs_wechatmoments.png' }
    : require('@img/wechat-moments.png')
