import * as React from 'react'

import styles from './ProductSwiperItem.styles'
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Native } from '@utils'
import withCartCountModify from './HOC/withCountInCartModifier'

export interface Props {
  cartId: string
  code: string
  thumbnail: string // 缩略图
  name: string // 商品名称
  price: number // 当前价格
  slashedPrice?: number // 划线价
  count?: 0 // 当前数量
  onModifyCount: Function
}

function ProductSwiperItem({
  cartId,
  code,
  thumbnail,
  name,
  price,
  slashedPrice,
  count,
  onModifyCount,
}: Props) {
  const navigateToProductDetail = () => {
    Native.navigateTo({
      type: 1,
      uri: 'A003,A003',
      params: { params: { productCode: code } },
    })
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigateToProductDetail}>
        <View style={styles.productBox}>
          <View style={styles.thumbnailBox}>
            <Image
              style={styles.thumbnail}
              source={{ uri: thumbnail }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              <Text style={styles.pricePrefix}>¥</Text>
              {price / 100}
            </Text>
            {slashedPrice && (
              <Text style={styles.slashedPrice}>¥{slashedPrice / 100}</Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.cartBox}>
        <TouchableOpacity onPress={() => onModifyCount(count + 1)}>
          <LinearGradient
            colors={['#FF3914', '#FF6042']}
            style={styles.cartBtnBox}
          >
            <Image style={styles.addIcon} source={require('@img/plus.png')} />
            <Text style={styles.cartBtnText}>购物车</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default withCartCountModify(ProductSwiperItem)
