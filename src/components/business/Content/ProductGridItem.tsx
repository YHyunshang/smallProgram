/**
 * 商品格单元
 * Created by 李华良 on 2019-08-19
 */
import * as React from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import useTheme from './ProductGridItem.styles'
import ProductCart from '../ProductCart'
import { Product } from './typings'
import withCartCountModify from './HOC/withCountInCartModifier'
import { Native, Img } from '@utils'

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
  productTags = [],
  priceTags = [],
  price,
  slashedPrice,
  theme,
  count,
  inventoryLabel,
  shopCode,
  onModifyCount = (count: number) => null,
}) {
  const styles = useTheme(theme)
  const navigateToProductDetail = () => {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'A003,A003',
      params: { productCode: code, storeCode: shopCode },
    })
  }
  const [thumbnailWidth, setThumbnailWidth] = React.useState()
  const tag = [...priceTags, ...productTags][0]
  const fitThumbnail = Img.loadRatioImage(thumbnail, 200)
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
            <Image
              style={[
                styles.thumbnail,
                thumbnailWidth && {
                  width: thumbnailWidth,
                  height: thumbnailWidth,
                },
              ]}
              source={{ uri: fitThumbnail }}
              resizeMode="cover"
            />
            <View style={styles.tagRow}>
              {!!tag && <Text style={styles.tag}>{tag}</Text>}
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
        <ProductCart
          count={count}
          onCountChange={onCountChange}
        />
      </View>
    </View>
  )
}
export default withCartCountModify(ProductGridItem)
