/**
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { View } from 'react-native'
import ProductItem, { Props as ProductItemProps} from './ProductItem'
import styles from './ProductListFloor.styles'

interface Props {
  data: Array<ProductItemProps>
}

export default function ProductListFloor ({ data }: Props) {
  const length = data.length
  return (
    <View style={styles.container}>
      {data.map((ele, idx) => (
        <React.Fragment key={ele.code}>
          <View style={styles.productItem}>
          <ProductItem data={ele} />
        </View>
      {(idx <= length -1) && (
        <View style={styles.divider} />
        )}
        </React.Fragment>
      ))}
    </View>
  )
}