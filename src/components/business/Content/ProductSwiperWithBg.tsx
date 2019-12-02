import * as React from 'react'
import {Image, ScrollView, Text, TouchableWithoutFeedback, View,} from 'react-native'
import styles from './ProductSwiperWithBg.styles'
import FitImage from 'react-native-fit-image'
import {Img, Native} from '@utils'
import {Product} from '@common/typings'

interface Props {
  backgroundImage: string
  products: Product[]
}

export default function ProductSwiperWithBg({
  backgroundImage,
  products,
}: Props) {
  const navigateToProductDetail = ({ code, shopCode, name, desc, thumbnail, price, slashedPrice, count, spec }: Product) => {
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
          thumbnail,
        })
      },
    })
  }

  const productRenderer = (product: Product) => {
    const {
      code,
      thumbnail,
      name,
      price,
    } = product
    const fitThumbnail = Img.loadRatioImage(thumbnail, 100)

    return (
      <TouchableWithoutFeedback
        key={code}
        onPress={() => navigateToProductDetail({ ...product, thumbnail: fitThumbnail })}
      >
        <View style={styles.productBox}>
          <Image style={styles.thumbnail} source={{ uri: fitThumbnail }} />
          <Text style={styles.name} lineBreakMode="tail" numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.price}>
            <Text style={styles.pricePrefix}>¥</Text>
            {price / 100}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const fitBg = Img.loadRatioImage(backgroundImage, Img.FullWidth)

  return (
    <View style={styles.container}>
      <FitImage style={styles.bgImg} source={{ uri: fitBg }} />
      <ScrollView
        style={styles.swiper}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {products.map(productRenderer)}
      </ScrollView>
    </View>
  )
}
