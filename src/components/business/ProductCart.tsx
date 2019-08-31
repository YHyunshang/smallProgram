import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Image, View } from 'react-native'
import styles from './ProductCart.styles'

export default function ProductCart({ count, onCountChange }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradientBox}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={['#FF3914', '#FF6042']}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            onCountChange(count + 1)
          }}
        >
          <Image style={styles.cartImg} source={require('@img/cart.png')} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}
