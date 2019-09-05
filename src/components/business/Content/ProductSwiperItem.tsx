import * as React from 'react'
import theme from '@theme'
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
import { plus } from '@const/resources'
import Tag from './Tag'

function ProductSwiperItem({
  code,
  thumbnail,
  name,
  productTags = [],
  priceTags = [],
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
  const tag = priceTags.find(ele => ele.match(/满.+减/))
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
            <View style={styles.tagRow}>
              {tag && (
                <Tag color="#FFE5E0">
                  <Text style={styles.tag}>{tag}</Text>
                </Tag>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              <Text style={styles.pricePrefix}>¥ </Text>
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
              colors={[theme.primary, theme.secondary]}
            >
              <Image style={styles.addIcon} source={plus} />
              <Text style={styles.cartBtnText}>购物车</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default withCartCountModify(ProductSwiperItem)
