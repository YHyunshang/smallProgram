/**
 * Created by 李华良 on 2019-07-18
 */
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FitImage from 'react-native-fit-image'
import Icon from '../Icon'
import styles from './ProductItem.styles'

export interface Props {
}

function ProductItem({ data: { imgUrl, label, name,  price, productDesc, promotionPrice } }: Props) {
  const isPromotion = promotionPrice < price

  return (
    <View style={styles.container}>
      <View style={styles.productImgBox}>
        <FitImage style={styles.productImg} source={{ uri: imgUrl }} resizeMode="contain" />
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
          <TouchableOpacity onPress={console.log}>
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