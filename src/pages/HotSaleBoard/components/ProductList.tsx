/*
 * @Author: 李华良
 * @Date: 2019-08-21 20:46:20
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-08-29 21:23:38
 */
import * as React from 'react'
import {Text, View} from 'react-native'
import ProductListItem from '@components/business/Content/ProductListItem'
import styles from './ProductList.styles'
import LinearGradient from 'react-native-linear-gradient'
import {Product} from '@common/typings'

interface Props {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  const total = products.length
  const renderItem = (ele, index) => {
    const positionStr = (index + 1).toString().padStart(2, '0')
    return (
      <View
        style={[
          styles.productBox,
          index < total - 1 && styles.productBoxNotLast,
        ]}
        key={ele.code}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#FF6042', '#FF3914']}
          style={styles.positionTextBox}
        >
          <Text style={styles.positionText}>NO.{positionStr}</Text>
        </LinearGradient>
        <ProductListItem {...ele} />
      </View>
    )
  }
  return <View style={styles.container}>{products.map(renderItem)}</View>
}
