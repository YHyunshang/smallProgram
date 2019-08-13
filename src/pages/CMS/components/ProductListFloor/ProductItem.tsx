/**
 * Created by 李华良 on 2019-07-16
 */
import * as React from 'react'
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Icon} from '@components'
import styles from './ProductItem.styles'
import {Native} from "@utils"
import {CMSServices} from "@services"

const productPlaceholderImg = Platform.OS === 'ios' ? require('@img/placeholder-product.png') : { uri: 'asset:/src_assets_imgs_placeholderproduct.png' }

export interface Props {
  data: {   // 商品数据
    [index:string]: string|number
  }
}

export default function ProductItem ({ data: {imgUrl, name, productDesc, label, price, promotionPrice, code} }: Props) {
  const isPromotion = promotionPrice < price
  const productImg = imgUrl ? { uri: imgUrl } : productPlaceholderImg

  return (
    <View style={styles.container}>
      <View style={styles.productImgBox}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => Native.navigateTo('1', 'A003,A003', { params: { productCode: code } })}
        >
          <Image style={styles.productImg} source={productImg} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetailBox}>
        <Text style={styles.productName} numberOfLines={1}>{ name }</Text>
        <Text style={styles.productDesc} numberOfLines={1}>{ productDesc }</Text>
        <View style={styles.btmBox}>
          <LinearGradient colors={[ '#FF5247', '#FF873E' ]} style={styles.productTagBox}>
            {label && (<Text style={styles.productTag}>{ label }</Text>)}
          </LinearGradient>
          <View style={styles.priceBox}>
            <Text style={styles.productPrice}>
              <Text style={styles.pricePrefix}>¥</Text>
              {Number(isPromotion ? promotionPrice : price) / 100}
            </Text>
            <Text style={styles.slashedPrice}>{isPromotion ? `¥${Number(price) / 100}` : ''}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.cartBtn} onPress={() => CMSServices.addToCart(code, 1, price)}>
            <View>
              <Icon name="cart" style={styles.cartIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
