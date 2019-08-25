import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Image } from 'react-native'
import styles from './ProductCart.styles'

export default function ProductCart({ onPress }) {
  return (
    <LinearGradient style={styles.container} colors={['#FF3914', '#FF6042']}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.cartImg} source={require('@img/cart.png')} />
      </TouchableOpacity>
    </LinearGradient>
  )
}
