/**
 * 商品列表项
 * Created by 李华良 on 2019-08-19
 */
import * as React from 'react'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'
import styles from './ProductListItem.styles'
import ProductCountOperator from '../ProductCountOperator'
import { Native } from '@utils'
import ProductCart from '../ProductCart'
import withCartCountModify from './HOC/withCountInCartModifier'
import { Product } from './typings'
import Tag from './Tag'
import PromotionTag from './PromotionTag'

function ProductListItem({
  thumbnail,
  code,
  name,
  desc,
  productTags = [],
  priceTags = [],
  spec,
  price,
  slashedPrice,
  count,
  inventoryLabel,
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
            <View style={styles.productTagRow}>
              {productTags.slice(0, 2).map((tag, idx) => (
                <Tag color={['#EF2F41', '#208DDC'][idx]} key={idx}>
                  {tag}
                </Tag>
              ))}
            </View>

            {!!inventoryLabel && (
              <View style={styles.inventoryBox}>
                <View style={styles.inventoryLabelBg}>
                  <Text style={styles.inventoryLabel}>{inventoryLabel}</Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
            <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
              {desc}
            </Text>
            <View style={styles.tagRow}>
              {priceTags.map((tag, idx) =>
                /满.+减/.test(tag) ? (
                  <PromotionTag title="满减" content={tag} key={idx} />
                ) : (
                  <Text style={styles.tag} key={idx}>
                    {tag}
                  </Text>
                )
              )}
              {!!spec && <Text style={styles.spec}>{spec}</Text>}
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>
                <Text style={styles.pricePrefix}>¥ </Text>
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
        <ProductCountOperator
          size={24}
          count={count}
          onChange={onModifyCount}
          disabled={!!inventoryLabel}
        />
      </View>
    </View>
  )
}

export default withCartCountModify(ProductListItem)
