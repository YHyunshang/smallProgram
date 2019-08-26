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

export interface Props {
  code: string // 商品编码
  thumbnail: string // 缩略图
  name: string // 商品名称
  tag?: string // 标签
  spec: string // 规格
  price: number // 当前价格
  slashedPrice?: number // 划线价
  count?: 0 // 当前数量
  onModifyCount: Function
}

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
