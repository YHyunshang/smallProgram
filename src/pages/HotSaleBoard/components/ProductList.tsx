/*
 * @Author: 李华良
 * @Date: 2019-08-21 20:46:20
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-08-24 16:59:09
 */
import * as React from 'react'
import { View, Text } from 'react-native'
import ProductListItem, {
  Props as ProductListItemProps,
} from '@components/business/Content/ProductListItem'
import styles from './ProductList.styles'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
  products: ProductListItemProps[]
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
