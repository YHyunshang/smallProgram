import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity, Image, View, Animated, Easing } from 'react-native'
import styles from './ProductCart.styles'
import ProductCountOperator from './ProductCountOperator'

let preCount = null

export default function ProductCart({ count, onCountChange }) {
  const animatedVal = new Animated.Value(0)
  const [cartBoxVis, setCartBoxVis] = React.useState(count <= 0)

  React.useEffect(() => {
    if (preCount === null) {
      preCount = count || 0
    }
    if (preCount === 0 && count > 0) {
      Animated.timing(animatedVal, {
        toValue: 1,
        duration: 400,
        easing: Easing.ease,
      }).start(() => setCartBoxVis(false))
    }
  }, [count])

  return (
    <View style={styles.container}>
      {cartBoxVis ? (
        <Animated.View
          style={[
            styles.cartBox,
            {
              transform: [
                {
                  scaleX: animatedVal.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
                {
                  scaleY: animatedVal.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => onCountChange(1)}
          >
            <LinearGradient
              style={styles.gradientBox}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={['#FF3914', '#FF6042']}
            >
              <Image style={styles.cartImg} source={require('@img/cart.png')} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.countOperBox}>
          <ProductCountOperator count={count} onCountChange={onCountChange} />
        </View>
      )}
    </View>
  )
}
