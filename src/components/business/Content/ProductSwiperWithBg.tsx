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
import { Native } from '@utils'
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
  return (
    <View style={styles.container}>
      <FitImage style={styles.bgImg} source={{ uri: backgroundImage }} />
      <ScrollView
        style={styles.swiper}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {products.map(({ code, thumbnail, name, price, shopCode }) => (
          <TouchableWithoutFeedback
            key={code}
            onPress={() => navigateToProductDetail(code, shopCode)}
          >
            <View style={styles.productBox}>
              <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
              <Text style={styles.name} lineBreakMode="tail" numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.price}>
                <Text style={styles.pricePrefix}>¥</Text>
                {price / 100}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  )
}
