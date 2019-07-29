/**
 * Created by 李华良 on 2019-07-18
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text } from 'react-native'
import ProductItem from './ProductItem'
import styles from './ProductScrollFloor.styles'

interface Props {
  data: Array<object>
}

function ProductScrollFloor({ data }: Props) {
  return (
    <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
      {data.map(ele => (
        <View style={styles.productItem} key={ele.code}>
          <ProductItem data={ele} />
        </View>
      ))}
    </ScrollView>
  )
}

ProductScrollFloor.propTypes = {
}

export default ProductScrollFloor