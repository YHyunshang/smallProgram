/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import styles from './ProductSwiper.styles'
import { FlatList, View, ViewToken } from 'react-native'
import ProductSwiperItem from './ProductSwiperItem/ProductSwiperItem'
import { Product } from '@common/typings'
import withProductVisChange from './HOC/withProductVisChange'

interface Props {
  products: Product[]
  afterModifyCount: Function
  onViewableItemsChanged: (info: {
    viewableItems: ViewToken[]
    changed: ViewToken[]
  }) => void
  keyExtractor: (item: Product, index: number) => string
}

function ProductSwiper({
  products,
  afterModifyCount,
  onViewableItemsChanged,
  keyExtractor,
}: Props) {
  const total = products.length

  const floorRenderer = ({ item: product, index: idx }) => (
    <View
      style={[styles.productBox, idx < total - 1 && styles.productBoxNotLast]}
      key={product.code}
    >
      <ProductSwiperItem
        {...product}
        afterModifyCount={c => afterModifyCount(c, product.code)}
      />
    </View>
  )

  return (
    <FlatList
      style={styles.container}
      horizontal
      data={products}
      renderItem={floorRenderer}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  )
}

export default withProductVisChange(ProductSwiper)
