/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import styles from './ProductSwiper.styles'
import { ScrollView, View } from 'react-native'
import ProductSwiperItem, {
  Props as ProductSwiperItemProps,
} from './ProductSwiperItem'

interface Props {
  products: ProductSwiperItemProps[]
}

export default function ProductSwiper({ products }: Props) {
  const total = products.length
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {products.map((product, idx) => (
        <View
          style={[
            styles.productBox,
            idx < total - 1 && styles.productBoxNotLast,
          ]}
          key={product.code}
        >
          <ProductSwiperItem {...product} />
        </View>
      ))}
    </ScrollView>
  )
}
