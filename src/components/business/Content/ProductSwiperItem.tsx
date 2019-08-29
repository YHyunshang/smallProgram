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
import { Product } from './typings'

function ProductSwiperItem({
  code,
  thumbnail,
  name,
  price,
  slashedPrice,
  count,
  shopCode,
  onModifyCount,
}: Product) {
  const navigateToProductDetail = () => {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'A003,A003',
      params: { productCode: code, storeCode: shopCode },
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
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => onModifyCount(count + 1)}
        >
          <View style={styles.cartBtnBox}>
            <LinearGradient
              style={styles.gradientBox}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={['#FF3914', '#FF6042']}
            >
              <Image style={styles.addIcon} source={require('@img/plus.png')} />
              <Text style={styles.cartBtnText}>购物车</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default withCartCountModify(ProductSwiperItem)
