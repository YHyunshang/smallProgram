/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import { FlatList, View, ViewToken } from 'react-native'
import styles from './ProductList.styles'
import ProductListItem from '@components/business/Content/ProductListItem'
import { Product } from '@common/typings'
import withProductVisChange from './HOC/withProductVisChange'

// IMPORTANT: update it after modify ProductListItem layout
const FloorHeight = 147.5

interface Props {
  products: Product[]
  afterModifyCount: Function
  onViewableItemsChanged: (info: {
    viewableItems: ViewToken[]
    changed: ViewToken[]
  }) => void
  keyExtractor: (item: Product, index: number) => string
}

function ProductList({
  products,
  afterModifyCount,
  onViewableItemsChanged,
}: Props) {
  const total = products.length

  const floorRenderer = ({ item }) => (
    <View style={styles.productBox}>
      <ProductListItem {...item} afterModifyCount={afterModifyCount} />
    </View>
  )

  const getItemLayout = (data, index) => ({
    length: FloorHeight,
    offset: FloorHeight * index,
    index,
  })

  return (
    <FlatList
      style={styles.container}
      data={products}
      renderItem={floorRenderer}
      keyExtractor={item => `${item.code}`}
      // getItemLayout={getItemLayout}
      ItemSeparatorComponent={() => <View style={styles.fakeBorder} />}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  )
}

export default withProductVisChange(ProductList)
