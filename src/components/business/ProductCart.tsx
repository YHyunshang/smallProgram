import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Image, View } from 'react-native'
import styles from './ProductCart.styles'
import { addToCart } from '@const/resources'

export default function ProductCart({ count, onCountChange }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        console.log('press add to cart')
        onCountChange(count + 1)
      }}
    >
      <Image style={styles.cartImg} source={addToCart} />
    </TouchableOpacity>
  )
}
