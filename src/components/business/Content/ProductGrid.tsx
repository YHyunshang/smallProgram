/**
 * Created by 李华良 on 2019-08-22
 */
import * as React from 'react'
import { FlatList, View, ViewToken } from 'react-native'
import useTheme from './ProductGrid.styles'
import ProductGridItem, {
  Props as ProductGridItemProps,
} from './ProductGridItem'
import { Native } from '@utils'
import withProductVisChange from './HOC/withProductVisChange'
import { Product } from '@common/typings'

// IMPORTANT: update it after modify ProductGridItem layout
const CellHeight2X = 241.5
const CellHeight3X = 193

interface Props {
  products: ProductGridItemProps[]
  columnNumber: number
  afterModifyCount
  onViewableItemsChanged: (info: {
    viewableItems: ViewToken[]
    changed: ViewToken[]
  }) => void
  keyExtractor: (item: Product, index: number) => string
}

function ProductGrid({
  products,
  columnNumber,
  afterModifyCount,
  onViewableItemsChanged,
  keyExtractor,
}: Props) {
  const theme = { 2: '2x', 3: '3x' }[columnNumber]
  const styles = useTheme(theme || '2x')

  const afterCountChange = (count, { result }) => {
    if (!(result && result.toast)) {
      Native.showToast('添加成功', '1')
    }
    afterModifyCount && afterModifyCount(count)
  }

  const totalRow = Math.ceil(products.length / columnNumber)
  const colWidth = `${100 / columnNumber}%`
  const floorRenderer = ({ item, index }) => (
    <View
      style={[
        Math.floor(index / columnNumber) === 0 && styles.rowFirst,
        Math.floor(index / columnNumber + 1) === totalRow && styles.rowLast,
        styles.col,
        index % columnNumber === 0 && styles.colFirst,
        index % columnNumber === columnNumber - 1 && styles.colLast,
        { width: colWidth },
      ]}
    >
      <View style={styles.productCell}>
        <ProductGridItem
          {...item}
          theme={theme}
          afterModifyCount={afterCountChange}
        />
      </View>
    </View>
  )

  const CellHeight = columnNumber === 2 ? CellHeight2X : CellHeight3X
  const getItemLayout = (data, index) => ({
    length: CellHeight,
    offset: CellHeight * index,
    index,
  })

  const ItemSeparator = () => <View style={styles.floorSeparator} />

  return (
    <FlatList
      style={styles.container}
      data={products}
      renderItem={floorRenderer}
      keyExtractor={keyExtractor}
      numColumns={columnNumber}
      getItemLayout={getItemLayout}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparator}
      columnWrapperStyle={styles.columnWrapperStyle}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  )
}

export default withProductVisChange(ProductGrid)
