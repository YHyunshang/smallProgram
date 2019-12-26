import * as React from 'react'
import {ScrollView, TouchableWithoutFeedback, View} from 'react-native'
import styles from './ProductSwiperWithBg.styles'
import FitImage from 'react-native-fit-image'
import {Img, Native} from '@utils'
import {Product} from '@common/typings'
import ProductItem from './ProductItem'

interface ProductSwiperWithBgProps {
  backgroundImage: string
  backgroundImageLink: Native.Navigation
  products: Product[]
}

const ProductSwiperWithBg: React.FunctionComponent<ProductSwiperWithBgProps> = (
  { backgroundImage, backgroundImageLink, products }
) => {
  const fitBg = Img.loadRatioImage(backgroundImage, Img.FullWidth)
  const productList = products.map(ele => <ProductItem {...ele} />)

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Native.navigateTo(backgroundImageLink)}>
        <FitImage style={styles.bgImg} source={{ uri: fitBg }} />
      </TouchableWithoutFeedback>
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

export default ProductSwiperWithBg
