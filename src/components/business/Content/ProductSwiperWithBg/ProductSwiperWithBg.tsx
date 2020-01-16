import * as React from 'react'
import {
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Animated,
} from 'react-native'
import styles from './ProductSwiperWithBg.styles'
import { Img, Native } from '@utils'
import { Product } from '@common/typings'
import ProductItem from './ProductItem'
import { usePlaceholder } from '@utils/hooks'
import FastImage from 'react-native-fast-image'
import { placeholder } from '@const/resources'

interface ProductSwiperWithBgProps {
  backgroundImage: string
  backgroundImageLink: Native.Navigation
  products: Product[]
}

const ProductSwiperWithBg: React.FunctionComponent<
  ProductSwiperWithBgProps
> = ({ backgroundImage, backgroundImageLink, products }) => {
  const fitBg = Img.loadRatioImage(backgroundImage, Img.FullWidth)
  const productList = products.map(ele => (
    <ProductItem key={ele.code} {...ele} />
  ))
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

  return (
    <View style={styles.container}>
      <View style={styles.fakeBorder} />
      <TouchableWithoutFeedback
        onPress={() => Native.navigateTo(backgroundImageLink)}
      >
        <View style={styles.bgBox}>
          <FastImage
            style={styles.bgImg}
            source={{ uri: fitBg }}
            resizeMode="contain"
            onLoad={onLoad}
          />

          {placeholderVis && (
            <Animated.View
              style={[styles.thumbnailPlaceholderBox, placeholderOpacityStyle]}
            >
              <FastImage
                style={styles.thumbnailPlaceholder}
                source={placeholder}
                resizeMode="contain"
              />
            </Animated.View>
          )}
        </View>
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
