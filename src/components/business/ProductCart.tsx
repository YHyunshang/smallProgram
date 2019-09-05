import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Image, View } from 'react-native'
import styles from './ProductCart.styles'
import { addToCart } from '@const/resources'

interface Props {
  count: number
  onCountChange: (count: number) => void
  disabled: boolean
}

export default function ProductCart({ count, onCountChange, disabled }: Props) {
  const onPress = () => {
    console.debug(`press cart btn, update count to ${count + 1}`)
    onCountChange(count + 1)
  }
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled}
    >
      <Image style={styles.cartImg} source={addToCart} />
    </TouchableOpacity>
  )
}
