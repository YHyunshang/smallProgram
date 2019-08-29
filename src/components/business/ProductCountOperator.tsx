import * as React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './ProductCountOperator.styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'

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
        <Image
          style={styles.operatorImg}
          source={require('@img/minus-circle.png')}
        />
      </TouchableOpacity>
      <Text style={styles.countText} numberOfLines={1} ellipsizeMode="tail">
        {count}
      </Text>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => onCountChange(count + 1)}
      >
        <Image
          style={styles.operatorImg}
          source={require('@img/plus-circle.png')}
        />
      </TouchableOpacity>
    </View>
  )
}
