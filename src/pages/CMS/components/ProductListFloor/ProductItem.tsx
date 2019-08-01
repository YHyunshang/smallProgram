/**
 * Created by 李华良 on 2019-07-16
 */
import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Icon} from '@components'
import styles from './ProductItem.styles'
import {Native} from "@utils"
import {CMSServices} from "@services";

export interface Props {
  data: {   // 商品数据
    code: string  // 编码
    imgUrl: string  // 图片
    name: string  // 名称
    productDesc: string  // 简述
    label: string  // 标签
    price: number  // 价格
    promotionPrice: number  // 促销价格
  }
}

export default function ProductItem ({ data: {imgUrl, name, productDesc, label, price, promotionPrice, code} }: Props) {
  const isPromotion = promotionPrice < price

  return (
    <View style={styles.container}>
      <View style={styles.productImgBox}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => Native.navigateTo('1', 'A003,A003', { params: { productCode: code } })}
        >
          <Image style={styles.productImg} source={{ uri: imgUrl }} resizeMode="contain" />
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
              {isPromotion ? promotionPrice : price}
            </Text>
            <Text style={styles.slashedPrice}>{isPromotion ? `¥${price}` : ''}</Text>
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
