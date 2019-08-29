import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Image, View } from 'react-native'
import styles from './ProductCart.styles'

export default function ProductCart({ onPress }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradientBox}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={['#FF3914', '#FF6042']}
      >
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.cartImg} source={require('@img/cart.png')} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}
