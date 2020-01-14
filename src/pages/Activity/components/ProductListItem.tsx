import * as React from 'react'
import styles from './ProductListItem.styles'
import { Product } from '@common/typings'
import ProductListItemBase from '@components/business/Content/ProductListItem'
import { View } from 'react-native'

export interface ProductListItemProps {
  product: Product
  isFirst: boolean
}

const ProductListItem: React.FunctionComponent<ProductListItemProps> = ({
  product,
  isFirst,
}) => {
  return (
    <View style={styles.container}>
      <ProductListItemBase {...product} />
      {!isFirst && <View style={styles.fakeDivider} />}
    </View>
  )
}

export default ProductListItem
