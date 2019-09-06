import * as React from 'react'
import styles from './ProductCountOperator.styles'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native'
import { addToCart, minusCircle } from '@const/resources'

interface Props {
  size?: number
  count: number
  max?: number
  onChange: (count: number) => void
  disabled?: boolean
}

interface State {
  animatedVal: Animated.Value
}

export default class ProductCountOperator extends React.Component<
  Props,
  State
> {
  constructor(props) {
    super(props)
    this.state = {
      animatedVal: new Animated.Value(props.count <= 0 ? 0 : 1),
    }
  }

  componentWillReceiveProps(props) {
    if (props.count === 0 && this.props.count === 1) {
      Animated.timing(this.state.animatedVal, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    }
  }

  onModifyCurrentCount = (c: number) => {
    const { max, onChange, count } = this.props
    const { animatedVal } = this.state
    const nextCount = c <= 0 ? 0 : c >= max ? max : c
    onChange(nextCount)
    if (count === 0 && nextCount === 1) {
      Animated.timing(animatedVal, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    } else if (count === 1 && nextCount === 0) {
      Animated.timing(animatedVal, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    }
  }

  render() {
    const { count, max, disabled, size } = this.props
    const { animatedVal } = this.state

    const addRotate = animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-90deg'],
    })
    const minusRotate = animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg'],
    })
    const minusTranslateX = animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: [25 + size, 0],
    })
    const countTranslateX = animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 0],
    })
    const minusAndCountOpacity = animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => this.onModifyCurrentCount(count - 1)}
        >
          <Animated.View
            style={{ transform: [{ translateX: minusTranslateX }] }}
          >
            <Animated.Image
              style={[
                styles.operImg,
                {
                  width: size,
                  height: size,
                  opacity: minusAndCountOpacity,
                  transform: [{ rotate: minusRotate }],
                },
              ]}
              source={minusCircle}
            />
          </Animated.View>
        </TouchableOpacity>

        <Animated.Text
          style={[
            styles.countText,
            {
              fontSize: Math.max(size * 0.6, 10),
              opacity: minusAndCountOpacity,
              transform: [{ translateX: countTranslateX }],
            },
          ]}
          numberOfLines={1}
        >
          {count}
        </Animated.Text>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => this.onModifyCurrentCount(count + 1)}
          disabled={disabled || count >= max}
        >
          <Animated.Image
            style={[
              styles.operImg,
              {
                width: size,
                height: size,
                transform: [{ rotate: addRotate }],
              },
            ]}
            source={addToCart}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
