/**
 * 商品格单元
 * Created by 李华良 on 2019-08-19
 */
import * as React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import useTheme from './ProductGridItem.styles'
import { FitImg } from '@components'
import ProductCart from '../ProductCart'
import { Product } from './typings'
import withCartCountModify from './HOC/withCountInCartModifier'
import { Native } from '@utils'

enum ThemeChoices {
  TWO_PER_ROW = '2x',
  THREE_PER_ROW = '3x',
}

export interface Props extends Product {
  theme: ThemeChoices
}

function ProductGridItem({
  thumbnail,
  name,
  code,
  tag,
  price,
  slashedPrice,
  theme,
  count,
  onModifyCount = (count: number) => null,
}) {
  const styles = useTheme(theme)
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
            <FitImg
              imageProps={{ source: { uri: thumbnail }, resizeMode: 'contain' }}
            />
            <View style={styles.tagRow}>
              {!!tag && <Text style={styles.tag}>{tag}</Text>}
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.slashedPrice}>
                {!!slashedPrice ? `¥${slashedPrice / 100}` : ''}
              </Text>
              <Text style={styles.currentPrice}>
                <Text style={styles.pricePrefix}>¥</Text>
                {price / 100}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.cartBox}>
        <ProductCart onPress={() => onModifyCount(count + 1)} />
      </View>
    </View>
  )
}
export default withCartCountModify(ProductGridItem)
