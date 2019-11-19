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
import { Native } from '@utils'

interface Props {
  products: ProductGridItemProps[]
  columnNumber: number
  afterModifyCount
}

export default function ProductGrid({
  products,
  columnNumber,
  afterModifyCount,
}: Props) {
  const gridProducts = chunk(products, columnNumber)
  const theme = { 2: '2x', 3: '3x' }[columnNumber]
  const styles = useTheme(theme || '2x')
  const rowTotal = gridProducts.length

  const afterCountChange = (count, { result }) => {
    if (!(result && result.toast)) {
      Native.showToast('添加成功', '1')
    }
    afterModifyCount && afterModifyCount(count)
  }

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
          <ProductGridItem
            {...product}
            theme={theme}
            afterModifyCount={afterCountChange}
          />
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
