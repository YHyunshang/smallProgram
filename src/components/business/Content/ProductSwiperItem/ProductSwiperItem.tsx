import * as React from 'react'
import styles from './ProductSwiperItem.styles'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import { Native } from '@utils'
import withCartCountModify from '../HOC/withCountInCartModifier'
import { Product } from '../typings'
import Tag from '../Tag'
import CountOperator from './CountOperator'

function ProductSwiperItem({
  code,
  thumbnail,
  name,
  productTags = [],
  priceTags = [],
  price,
  slashedPrice,
  count,
  inventoryLabel,
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

            {!!tag && (
              <View style={styles.tagRow}>
                <Tag color="#FFE5E0">
                  <Text style={styles.tag}>{tag}</Text>
                </Tag>
              </View>
            )}

            {!!inventoryLabel && (
              <View style={styles.inventoryBox}>
                <View style={styles.inventoryLabelBg}>
                  <Text style={styles.inventoryLabel}>{inventoryLabel}</Text>
                </View>
              </View>
            )}
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
        <CountOperator
          count={count}
          onChange={onModifyCount}
          disabled={!!inventoryLabel}
        />
      </View>
    </View>
  )
}
export default withCartCountModify(ProductSwiperItem)
