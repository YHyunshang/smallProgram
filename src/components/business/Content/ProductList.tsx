/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import {View} from 'react-native'
import styles from './ProductList.styles'
import ProductListItem from '@components/business/Content/ProductListItem'
import {Product} from '@common/typings'

interface Props {
  products: Product[]
  afterModifyCount: Function
}

export default function ProductList({ products, afterModifyCount }: Props) {
  const total = products.length
  return (
    <View style={styles.container}>
      {products.map((product, idx) => (
        <View style={styles.productBox} key={product.code}>
          <ProductListItem {...product} afterModifyCount={afterModifyCount} />
          {idx < total - 1 && <View style={styles.fakeBorder}></View>}
        </View>
      ))}
    </View>
  )
}
