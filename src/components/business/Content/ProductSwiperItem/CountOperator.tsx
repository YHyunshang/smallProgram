/*
 * @Author: 李华良
 * @Date: 2019-09-05 18:26:23
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-18 22:37:24
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
import { Native } from '@utils'

interface Props {
  count: number
  max?: number
  onChange: (count: number) => void
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

  static defaultProps = {
    max: Infinity,
  }

  componentWillReceiveProps(props) {
    if (props.count <= 0 && this.props.count === 1) {
      Animated.timing(this.state.animatedVal, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    } else if (props.count > 0 && this.props.count <= 0) {
      Animated.timing(this.state.animatedVal, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    } else {
      this.state.animatedVal.setValue(props.count <= 0 ? 0 : 1)
    }
  }

  onModifyCount = c => {
    const { max, onChange } = this.props
    const nextCount = c <= 0 ? 0 : c >= max ? max : c
    onChange(nextCount)
  }

  render() {
    const { animatedVal } = this.state
    const { count } = this.props

    const cartBtnScaleX = animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })
    const cartBtnTranslateX = animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 65],
    })
    const cartBtnOpacity = animatedVal.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    })
    return (
      <View style={styles.container}>
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

        <Animated.View
          style={[
            styles.cartBtnBox,
            {
              opacity: cartBtnOpacity,
              transform: [{ scaleX: cartBtnScaleX }],
              zIndex: count <= 0 ? 1 : -1,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.cartBtn}
            activeOpacity={0.75}
            onPressIn={() => this.onModifyCount(count + 1)}
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
        </Animated.View>
      </View>
    )
  }
}
