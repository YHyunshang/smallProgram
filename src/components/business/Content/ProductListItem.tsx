/**
 * 商品列表项
 * Created by 李华良 on 2019-08-19
 */
import * as React from 'react'
import { Text, TouchableWithoutFeedback, View, Animated } from 'react-native'
import styles from './ProductListItem.styles'
import ProductCountOperator from '../ProductCountOperator'
import { Img } from '@utils'
import withCartCountModify from './HOC/withCountInCartModifier'
import withProductDetailNav from './HOC/withProductDetailNav'
import { Product, ProductDeliveryType } from '@common/typings'
import Tag from './Tag'
import FastImage from 'react-native-fast-image'
import theme from '@theme'
import {
  iconDeliveryNextDay,
  placeholderProductThumbnail,
} from '@const/resources'
import { transPenny } from '@utils/FormatUtil'
import { usePlaceholder } from '@utils/hooks'

interface Props extends Product {
  disableAdd?: boolean
  getDetailNavigator: (thumbnail: string) => () => void
}

function ProductListItem({
  thumbnail,
  name,
  desc,
  spec,
  price,
  slashedPrice,
  count,
  inventoryLabel,
  onModifyCount,
  disableAdd,
  getDetailNavigator,
  isPreSale,
  deliveryType,
  labels = [],
}: Props) {
  const fitThumbnail = Img.loadRatioImage(thumbnail, 100)
  const navigateToProductDetail = getDetailNavigator(fitThumbnail)
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigateToProductDetail}>
        <View style={styles.productBox}>
          <View style={styles.thumbnailBox}>
            <FastImage
              style={styles.thumbnail}
              source={{ uri: fitThumbnail }}
              resizeMode="contain"
              onLoad={onLoad}
            />
            {placeholderVis && (
              <Animated.View
                style={[
                  styles.thumbnailPlaceholderBox,
                  placeholderOpacityStyle,
                ]}
              >
                <FastImage
                  style={styles.thumbnailPlaceholder}
                  source={placeholderProductThumbnail}
                  resizeMode="contain"
                />
              </Animated.View>
            )}
            <View style={styles.productTagRow}>
              {isPreSale ? (
                <Tag color={theme.white} backgroundColor={theme.preSaleTagBg}>
                  预售
                </Tag>
              ) : deliveryType === ProductDeliveryType.NextDay ? (
                <FastImage
                  source={iconDeliveryNextDay}
                  style={{ width: 38, height: 16 }}
                />
              ) : null}
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
            <View style={styles.specRow}>
              {!!spec && <Text style={styles.spec}>{spec}</Text>}
            </View>
            <View style={styles.tagRow}>
              {labels.slice(0, 2).map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </View>
            <Text style={styles.priceRow}>
              <Text style={styles.currentPrice}>
                <Text style={styles.pricePrefix}>¥&nbsp;</Text>
                {transPenny(price)}
              </Text>
              {!!slashedPrice && (
                <>
                  <Text>&nbsp;&nbsp;</Text>
                  <Text style={styles.slashedPrice}>
                    ¥{transPenny(slashedPrice)}
                  </Text>
                </>
              )}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.cartBox}>
        {!!inventoryLabel ? (
          <Text style={styles.soldOutText}>今日已售罄</Text>
        ) : (
          <ProductCountOperator
            size={24}
            count={count}
            onChange={onModifyCount}
            disableAdd={disableAdd}
          />
        )}
      </View>
    </View>
  )
}

export default withCartCountModify(withProductDetailNav(ProductListItem))
