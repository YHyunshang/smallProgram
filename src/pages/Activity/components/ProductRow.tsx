import * as React from 'react'
import { Product } from '@common/typings'
import useTheme from './ProductRow.styles'
import { View } from 'react-native'
import ProductGridItemBase from '@components/business/Content/ProductGridItem'
import { Native } from '@utils'

interface ProductRowProps {
  isFirst: boolean
  products: Product[]
  columns: 2 | 3
}

const ProductRow: React.FunctionComponent<ProductRowProps> = ({
  isFirst,
  products,
  columns,
}) => {
  const theme = { 2: '2x', 3: '3x' }[columns]
  const styles = useTheme(theme || '2x')

  const colWidth = `${100 / columns}%`

  const itemRenderer = (item, index) => {
    const afterCountChange = (count, { result }) => {
      if (!(result && result.toast)) {
        Native.showToast('添加成功', '1')
      }
      item.afterModifyCount instanceof Function && item.afterModifyCount(count)
    }

    return (
      <View
        style={[
          isFirst && styles.colInFirstRow,
          styles.col,
          index % columns === 0 && styles.colFirst,
          index % columns === columns - 1 && styles.colLast,
          { width: colWidth },
        ]}
      >
        <View style={styles.productCell}>
          <ProductGridItemBase
            {...item}
            theme={theme}
            afterModifyCount={afterCountChange}
          />
        </View>
      </View>
    )
  }

  return <View style={[styles.container]}>{products.map(itemRenderer)}</View>
}

export default ProductRow
