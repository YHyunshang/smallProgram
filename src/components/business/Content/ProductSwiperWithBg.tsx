import * as React from 'react'
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import styles from './ProductSwiperWithBg.styles'
import FitImage from 'react-native-fit-image'
import { Native, Img } from '@utils'
import { Product } from './typings'

interface Props {
  backgroundImage: string
  products: Product[]
}

export default function ProductSwiperWithBg({
  backgroundImage,
  products,
}: Props) {
  const navigateToProductDetail = (productCode, storeCode) => {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'A003,A003',
      params: { productCode, storeCode },
    })
  }

  const productRenderer = ({
    code,
    thumbnail,
    name,
    price,
    shopCode,
  }: Product) => {
    const fitThumbnail = Img.loadRatioImage(thumbnail, 100)

    return (
      <TouchableWithoutFeedback
        key={code}
        onPress={() => navigateToProductDetail(code, shopCode)}
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
