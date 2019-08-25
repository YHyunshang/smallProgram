/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import { View } from 'react-native'
import styles from './ProductList.styles'
import ProductListItem, {
  Props as ProductListItemProps,
} from '@components/business/Content/ProductListItem'

interface Props {
  products: ProductListItemProps[]
}

export default function ProductList({ products }: Props) {
  const total = products.length
  return (
    <View style={styles.container}>
      {products.map((product, idx) => (
        <View style={styles.productBox} key={product.code}>
          <ProductListItem {...product} />
          {idx < total - 1 && <View style={styles.fakeBorder}></View>}
        </View>
      ))}
    </View>
  )
}
