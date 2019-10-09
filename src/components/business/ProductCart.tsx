import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Image, View } from 'react-native'
import styles from './ProductCart.styles'
import { addToCart } from '@const/resources'
import { Native } from '@utils'

interface Props {
  count: number
  onCountChange: (count: number) => void
}

export default function ProductCart({ count, onCountChange }: Props) {
  const onPress = () => {
    onCountChange(count + 1)
  }
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <Image style={styles.cartImg} source={addToCart} />
    </TouchableOpacity>
  )
}
