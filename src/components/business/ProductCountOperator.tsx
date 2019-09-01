import * as React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './ProductCountOperator.styles'
import LinearGradient from 'react-native-linear-gradient'
import { minusCircle, plusCircle } from '@const/resources'

export interface Props {
  count: number
  onCountChange: Function
}

export default function ProductCountOperator({
  count = 0,
  onCountChange,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => count - 1 >= 0 && onCountChange(count - 1)}
      >
        <Image style={styles.operatorImg} source={minusCircle} />
      </TouchableOpacity>
      <Text style={styles.countText} numberOfLines={1} ellipsizeMode="tail">
        {count}
      </Text>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => onCountChange(count + 1)}
      >
        <Image style={styles.operatorImg} source={plusCircle} />
      </TouchableOpacity>
    </View>
  )
}
