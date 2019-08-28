/**
 * 商品列表项
 * Created by 李华良 on 2019-08-19
 */
import * as React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import styles from './ProductListItem.styles'
import ProductCountOperator from '../ProductCountOperator'
import { Native } from '@utils'
import ProductCart from '../ProductCart'
import withCartCountModify from './HOC/withCountInCartModifier'
import { Product } from './typings'

function ProductListItem({
  thumbnail,
  code,
  name,
  tag,
  spec,
  price,
  slashedPrice,
  count,
  onModifyCount,
  shopCode,
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
          <View style={styles.infoBox}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
            <View style={styles.tagRow}>
              {!!tag && <Text style={styles.tag}>{tag}</Text>}
              {!!spec && <Text style={styles.spec}>{spec}</Text>}
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>
                <Text style={styles.pricePrefix}>¥</Text>
                {price / 100}
              </Text>
              {!!slashedPrice && (
                <Text style={styles.slashedPrice}>¥{slashedPrice / 100}</Text>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.cartBox}>
        {/* <TouchableWithoutFeedback>
          <ProductCountOperator initialCount={count} product={arguments[0]} />
        </TouchableWithoutFeedback> */}
        <ProductCart onPress={() => onModifyCount(count + 1)} />
      </View>
    </View>
  )
}

export default withCartCountModify(ProductListItem)
