/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import chunk from 'lodash/chunk'
import { View } from 'react-native'
import useTheme from './ProductGrid.styles'
import ProductGridItem, {
  Props as ProductGridItemProps,
} from './ProductGridItem'

interface Props {
  products: ProductGridItemProps[]
  columnNumber: number
}

export default function ProductGrid({ products, columnNumber }: Props) {
  const gridProducts = chunk(products, columnNumber)
  const styles = useTheme({ 2: '2x', 3: '3x' }[columnNumber] || '2x')
  const rowTotal = gridProducts.length

  const colRender = columns =>
    columns.map((product, colIdx) => (
      <View
        style={[
          styles.column,
          colIdx % columnNumber < columnNumber - 1 && styles.columnNotLast,
        ]}
        key={product.code}
      >
        <View style={styles.productBox}>
          <ProductGridItem {...product} />
        </View>
      </View>
    ))

  return (
    <View style={styles.container}>
      {gridProducts.map((columns, rowIdx) => (
        <View
          style={[styles.row, rowIdx < rowTotal - 1 && styles.rowNotLast]}
          key={rowIdx}
        >
          {colRender(columns)}
        </View>
      ))}
    </View>
  )
}
