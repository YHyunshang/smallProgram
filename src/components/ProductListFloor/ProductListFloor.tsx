/**
 * Created by 李华良 on 2019-07-12
 */
import React from 'react'
import { View } from 'react-native'
import ProductItem, { Props as ProductItemProps} from './ProductItem'
import styles from './ProductListFloor.styles'

interface Props {
  data: Array<ProductItemProps>
}

export default function ProductListFloor (props: Props) {
  const { data } = props
  const length = data.length
  return (
    <View style={styles.container}>
      {data.map((ele, idx) => (
        <React.Fragment>
        <View style={styles.productItem} key={ele.code}>
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