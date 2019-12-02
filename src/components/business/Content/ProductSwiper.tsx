/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import styles from './ProductSwiper.styles'
import {ScrollView, View} from 'react-native'
import ProductSwiperItem from './ProductSwiperItem/ProductSwiperItem'
import {Product} from '@common/typings'

interface Props {
  products: Product[]
  afterModifyCount: Function
}

export default function ProductSwiper({ products, afterModifyCount }: Props) {
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
          <ProductSwiperItem {...product} afterModifyCount={afterModifyCount} />
        </View>
      ))}
    </ScrollView>
  )
}
