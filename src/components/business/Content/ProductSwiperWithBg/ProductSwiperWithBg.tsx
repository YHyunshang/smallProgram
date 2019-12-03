import * as React from 'react'
import {ScrollView, View} from 'react-native'
import styles from './ProductSwiperWithBg.styles'
import FitImage from 'react-native-fit-image'
import {Img} from '@utils'
import {Product} from '@common/typings'
import ProductItem from './ProductItem'

interface Props {
  backgroundImage: string
  products: Product[]
}

export default function ProductSwiperWithBg({
  backgroundImage,
  products,
}: Props) {
  const fitBg = Img.loadRatioImage(backgroundImage, Img.FullWidth)
  const productList = products.map(ele => <ProductItem {...ele} />)

  return (
    <View style={styles.container}>
      <FitImage style={styles.bgImg} source={{ uri: fitBg }} />
      <ScrollView
        style={styles.swiper}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {productList}
      </ScrollView>
    </View>
  )
}
