import * as React from 'react'
import styles from './ProductSwiperItem.styles'
import {Text, TouchableWithoutFeedback, View} from 'react-native'
import {Img} from '@utils'
import withCartCountModify from '../HOC/withCountInCartModifier'
import {Product, ProductDeliveryType} from '@common/typings'
import Tag from '../Tag'
import CountOperator from './CountOperator'
import FastImage from 'react-native-fast-image'
import withProductDetailNav from "../HOC/withProductDetailNav";
import GlobalTheme from "@theme";
import {iconDeliveryNextDay} from "@const/resources";

interface Props extends Product {
  disableAdd: boolean
  getDetailNavigator: (thumbnail: string) => () => void
}

function ProductSwiperItem({
  thumbnail,
  name,
  price,
  slashedPrice,
  count,
  inventoryLabel,
  onModifyCount,
  isPreSale,
  deliveryType,
  labels = [],
  disableAdd,
  getDetailNavigator,
}: Props) {
  const fitThumbnail = Img.loadRatioImage(thumbnail, 100)
  const navigateToProductDetail = getDetailNavigator(fitThumbnail)
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigateToProductDetail}>
        <View style={styles.productBox}>
          <View style={styles.thumbnailBox}>
            <FastImage
              style={styles.thumbnail}
              source={{ uri: fitThumbnail }}
              resizeMode={FastImage.resizeMode.contain}
            />

            <View style={styles.tagRow}>
              {isPreSale ? (
                <Tag color={GlobalTheme.white} backgroundColor={GlobalTheme.preSaleTagBg}>预售</Tag>
              ) : deliveryType === ProductDeliveryType.NextDay ? (
                <FastImage source={iconDeliveryNextDay} style={{width: 38, height: 16}}/>
              ) : labels.slice(0, 1).map((ele, index) => (
                <Tag key={index}>{ele}</Tag>
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
export default withCartCountModify(
  withProductDetailNav(ProductSwiperItem)
)
