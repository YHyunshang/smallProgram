/**
 * Created by 李华良 on 2019-07-18
 */
import * as React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Icon, FitImg} from '@components'
import styles from './ProductItem.styles'
import {Native} from "@utils"
import {CMSServices} from "@services"

const productPlaceholderImg = Platform.OS === 'ios' ? require('@img/placeholder-product.png') : { uri: 'asset:/src_assets_imgs_placeholderproduct.png' }

export interface Props {
  data: {
    [index:string]: string|number
  }
}

function ProductItem({ data: { imgUrl, label, name,  price, productDesc, promotionPrice, code } }: Props) {
  const isPromotion = promotionPrice < price
  const productImg = imgUrl ? { uri: imgUrl } : productPlaceholderImg

  return (
    <View style={styles.container}>
      <View style={styles.productImgBox}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => Native.navigateTo('1', 'A003,A003', { params: { productCode: code } })}
        >
          <FitImg imageProps={{ style: styles.productImg, source: productImg, resizeMod: 'contain' }} />
        </TouchableOpacity>
        <LinearGradient colors={[ '#FF5247', '#FF873E' ]} style={styles.productTagBox}>
          {label && (<Text style={styles.productTag}>{ label }</Text>)}
        </LinearGradient>
      </View>
      <View style={styles.productDetailBox}>
        <Text style={styles.productName} numberOfLines={1}>{ name }</Text>
        <Text style={styles.productDesc} numberOfLines={1}>{ productDesc }</Text>
        <View style={styles.btmBox}>
          <View style={styles.priceBox}>
            <Text style={styles.slashedPrice}>{isPromotion ? `¥${price / 100}` : ''}</Text>
            <Text style={styles.productPrice}>
              <Text style={styles.pricePrefix}>¥</Text>
              {(isPromotion ? promotionPrice : price) / 100}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => CMSServices.addToCart(code, 1, price)}>
            <View style={styles.cartBtn}>
              <Icon name="cart" style={styles.cartIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ProductItem