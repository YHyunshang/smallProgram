/**
 * 商品格单元
 * Created by 李华良 on 2019-08-19
 */
import * as React from 'react'
import {Text, TouchableWithoutFeedback, View} from 'react-native'
import useTheme from './ProductGridItem.styles'
import ProductCart from '../ProductCart'
import {Product, ProductDeliveryType} from '@common/typings'
import withCartCountModify from './HOC/withCountInCartModifier'
import {Img, Native} from '@utils'
import FastImage from 'react-native-fast-image'
import withProductDetailNav from "./HOC/withProductDetailNav";
import Tag from "@components/business/Content/Tag";
import GlobalTheme from "@theme";
import {iconDeliveryNextDay} from "@const/resources";
import {FitImg} from "@components";
import {transPenny} from "@utils/FormatUtil";

export enum ThemeChoices {
  TWO_PER_ROW = '2x',
  THREE_PER_ROW = '3x',
}

export interface Props extends Product {
  theme: ThemeChoices
  getDetailNavigator: (thumbnail: string) => () => void
}

function _ProductGridItem_({
  thumbnail,
  name,
  price,
  slashedPrice,
  theme,
  count,
  inventoryLabel,
  onModifyCount = (count: number) => null,
  isPreSale,
  deliveryType,
  labels = [],
  getDetailNavigator,
}: Props) {
  const styles = useTheme(theme)
  const fitThumbnail = Img.loadRatioImage(thumbnail, 200)
  const navigateToProductDetail = getDetailNavigator(fitThumbnail)
  const [thumbnailWidth, setThumbnailWidth] = React.useState()
  const onCountChange = c => {
    if (inventoryLabel) {
      Native.showToast('商品补货中')
    } else {
      onModifyCount(c)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigateToProductDetail}>
        <View style={styles.productBox}>
          <View
            style={styles.thumbnailBox}
            onLayout={e => setThumbnailWidth(e.nativeEvent.layout.width)}
          >
            <FastImage
              style={[
                styles.thumbnail,
                thumbnailWidth && {
                  width: thumbnailWidth,
                  height: thumbnailWidth,
                },
              ]}
              source={{ uri: fitThumbnail }}
              resizeMode="contain"
            />
            <View style={styles.tagRow}>
              {isPreSale ? (
                <Tag color={GlobalTheme.white} backgroundColor={GlobalTheme.preSaleTagBg}>预售</Tag>
              ) : deliveryType === ProductDeliveryType.NextDay ? (
                <FastImage source={iconDeliveryNextDay} style={{width: 38, height: 16}}/>
              ) : labels.slice(0, 1).map(ele => (
                <Tag>{ele}</Tag>
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
            <View style={styles.priceRow}>
              <Text style={styles.slashedPrice}>
                {(!!slashedPrice && slashedPrice > price) ? `¥${transPenny(slashedPrice)}` : ''}
              </Text>
              <Text style={styles.currentPrice}>
                <Text style={styles.pricePrefix}>¥</Text>
                {transPenny(price)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.cartBox}>
        <ProductCart
          count={count}
          onCountChange={onCountChange}
        />
      </View>
    </View>
  )
}

export const ProductGridItem = withProductDetailNav(_ProductGridItem_)

export default withCartCountModify(
  withProductDetailNav(_ProductGridItem_)
)
