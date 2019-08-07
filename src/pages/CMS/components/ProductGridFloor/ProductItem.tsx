/**
 * Created by 李华良 on 2019-07-17
 */
import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Icon, FitImg } from '@components'
import styles from './ProductItem.styles'
import {Native} from "@utils"
import { CMSServices } from '@services'

const productPlaceholderImg = require('@img/placeholder-product.svg')

export interface Props {
  data: any
}

function ProductItem({ data: { imgUrl, label, name, price, productDesc, promotionPrice, code } }: Props) {
  const isPromotion = promotionPrice < price
  // const productImage = imgUrl ? { uri: imgUrl } : productPlaceholderImg
  const productImage = productPlaceholderImg

  return (
    <View style={styles.container}>
      <View style={styles.productImgBox}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => Native.navigateTo('1', 'A003,A003', { params: { productCode: code } })}
        >
          <FitImg imageProps={{ style: styles.productImg, source: productImage, resizeMode: 'contain' }} />
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
            <Text style={styles.slashedPrice}>{isPromotion ? `¥${price}` : ''}</Text>
            <Text style={styles.productPrice}>
              <Text style={styles.pricePrefix}>¥</Text>
              {isPromotion ? promotionPrice : price}
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