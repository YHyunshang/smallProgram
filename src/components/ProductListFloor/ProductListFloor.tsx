/**
 * Created by 李华良 on 2019-07-12
 */
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FitImage from 'react-native-fit-image'
import { Button } from 'react-native-vector-icons'
import ProductItem from './ProductItem'
import styles from './ProductList.styles'

interface Props {
  data: array<object>
}

export default function ProductListFloor (props: Props) {
  const { data } = props
  const length = data.length
  return (
    <View style={styles.container}>
      {data.map((ele, idx) => (
        <View style={(idx <= length -1) ? styles.productItem : styles.productLastItem} key={ele.code}>
          <ProductItem data={ele} />
        </View>
      ))}
    </View>
  )
}