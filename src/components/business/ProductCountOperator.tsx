import * as React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './ProductCountOperator.styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'

export interface Props {
  initialCount: number
  product: {
    code: string
  }
}

export default function ProductCountOperator({
  initialCount = 0,
  product,
}: Props) {
  const [count, setCount] = React.useState(initialCount)
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.operatorImg}
          source={require('@img/minus-circle.png')}
        />
      </TouchableOpacity>
      <Text style={styles.countText} numberOfLines={1} ellipsizeMode="tail">
        {count}
      </Text>
      <TouchableOpacity>
        <Image
          style={styles.operatorImg}
          source={require('@img/plus-circle.png')}
        />
      </TouchableOpacity>
    </View>
  )
}
