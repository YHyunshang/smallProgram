/*
 * @Author: 李华良
 * @Date: 2019-09-05 18:26:23
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-05 21:32:37
 */
import * as React from 'react'
import styles from './CountOperator.styles'
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Easing,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { plus, minusCircle, addToCart } from '@const/resources'
import theme from '@theme'

interface Props {
  count: number
  max: number
  onChange: (count: number) => void
  disabled: boolean
}

interface State {
  animatedVal: Animated.Value
}

export default class CountOperator extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      animatedVal: new Animated.Value(props.count === 0 ? 0 : 1),
    }
  }

  componentWillReceiveProps(props) {
    if (props.count === 0 && this.props.count === 1) {
      Animated.timing(this.state.animatedVal, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    }
  }

  onModifyCount = c => {
    const { max, count, onChange } = this.props
    const { animatedVal } = this.state
    const nextCount = c <= 0 ? 0 : c >= max ? max : c
    onChange(nextCount)
    if (count === 0 && nextCount === 1) {
      Animated.timing(animatedVal, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    } else if (count === 1 && nextCount === 0) {
      Animated.timing(animatedVal, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    }
  }

  render() {
    const { animatedVal } = this.state
    const { count, max, disabled } = this.props

    const cartBtnScaleX = animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.cartBtnBox,
            {
              transform: [{ scaleX: cartBtnScaleX }],
            },
          ]}
        >
          <View>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => this.onModifyCount(count + 1)}
              disabled={disabled}
            >
              <View style={styles.cartBtnBox}>
                <LinearGradient
                  style={styles.gradientBox}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  colors={[theme.primary, theme.secondary]}
                >
                  <Image style={styles.addIcon} source={plus} />
                  <Text style={styles.cartBtnText}>购物车</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View
          style={[styles.countOperatorBox, { opacity: count <= 0 ? 0 : 1 }]}
        >
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => this.onModifyCount(count - 1)}
          >
            <Image style={styles.operImg} source={minusCircle} />
          </TouchableOpacity>
          <Text style={styles.countText}>{count}</Text>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => this.onModifyCount(count + 1)}
          >
            <Image style={styles.operImg} source={addToCart} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
