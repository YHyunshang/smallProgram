import * as React from 'react'
import styles from './ProductSwiperItem.styles'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import { Native, Img } from '@utils'
import withCartCountModify from '../HOC/withCountInCartModifier'
import { Product } from '../typings'
import Tag from '../Tag'
import CountOperator from './CountOperator'
import FastImage from 'react-native-fast-image'
import ProductImage from '@components/business/ProductImage'
interface Props extends Product {
  disableAdd: boolean
}

function ProductSwiperItem({
  code,
  thumbnail,
  name,
  desc,
  spec,
  productTags = [],
  priceTags = [],
  price,
  slashedPrice,
  count,
  inventoryLabel,
  shopCode,
  onModifyCount,
  disableAdd,
}: Props) {
  const fitThumbnail = Img.loadRatioImage(thumbnail, 100)

  const navigateToProductDetail = () => {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'A003,A003',
      params: {
        productCode: code,
        storeCode: shopCode,
        directTransmitParams: JSON.stringify({
          name,
          subTitle: desc,
          price: price,
          slashedPrice: slashedPrice || price,
          spec,
          count,
          thumbnail: fitThumbnail,
        })
      },
    })
  }
  const tag = priceTags.find(ele => /满.+减/.test(ele))
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigateToProductDetail}>
        <View style={styles.productBox}>
          <View style={styles.thumbnailBox}>
            {/* <FastImage
              style={styles.thumbnail}
              source={{ uri: fitThumbnail }}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
            <ProductImage source={{ uri: fitThumbnail }} size={97} />
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
        {!!inventoryLabel ? (
          <Text style={styles.soldOutText}>今日已售罄</Text>
        ) : (
          <CountOperator
            count={count}
            onChange={onModifyCount}
            disableAdd={disableAdd}
          />
        )}
      </View>
    </View>
  )
}
export default withCartCountModify(ProductSwiperItem)
