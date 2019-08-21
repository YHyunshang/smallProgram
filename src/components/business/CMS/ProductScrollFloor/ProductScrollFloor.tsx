/**
 * Created by 李华良 on 2019-07-18
 */
import * as React from 'react'
import { ScrollView, View, Text } from 'react-native'
import ProductItem from './ProductItem'
import styles from './ProductScrollFloor.styles'

interface Props {
  data: {
    [index: string]: string | number
  }[]
}

function ProductScrollFloor({ data }: Props) {
  return (
    <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
      {data.map(ele => (
        <View style={styles.productItem} key={ele.id}>
          <ProductItem data={ele} />
        </View>
      ))}
    </ScrollView>
  )
}

export default ProductScrollFloor