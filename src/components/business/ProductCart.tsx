import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Image, View } from 'react-native'
import styles from './ProductCart.styles'
import { addToCart } from '@const/resources'
import { Native } from '@utils'

interface Props {
  count: number
  onCountChange: (count: number) => void
  disabled: boolean
}

export default function ProductCart({ count, onCountChange, disabled }: Props) {
  const onPress = () => {
    if (disabled) {
      Native.showToast('不能添加更多了')
      return
    }
    onCountChange(count + 1)
  }
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <Image style={styles.cartImg} source={addToCart} />
    </TouchableOpacity>
  )
}
