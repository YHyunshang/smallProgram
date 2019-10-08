/*
 * @Author: 李华良
 * @Date: 2019-09-05 18:26:23
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-18 22:37:24
 */
import * as React from 'react'
import styles from './ProductCountOperatorLTB.styles'
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Easing,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {iconMinusCircleRed, iconPlusCircleRed} from '@const/resources'
import theme from '@theme'
import {Native} from '@utils'

interface Props {
  count: number
  max?: number
  onChange: (count: number) => void
  disabled: boolean
}

interface State {
  animatedVal: Animated.Value
}

export default class ProductCountOperatorLTB extends React.Component<Props, State> {
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
    const {max, onChange, disabled} = this.props
    if (disabled) {
      Native.showToast('不能添加更多了')
      return
    }
    const nextCount = c <= 0 ? 0 : c >= max ? max : c
    onChange(nextCount)
  }

  render() {
    const {animatedVal} = this.state
    const {count, max, disabled, children} = this.props

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
          style={[styles.countOperatorBox, {opacity: count <= 0 ? 0 : 1}]}
        >
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => this.onModifyCount(count - 1)}
          >
            <Image style={styles.operImg} source={iconMinusCircleRed}/>
          </TouchableOpacity>
          <Text style={styles.countText}>{count}</Text>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => this.onModifyCount(count + 1)}
          >
            <Image style={styles.operImg} source={iconPlusCircleRed}/>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.cartBtnBox,
            {
              opacity: cartBtnOpacity,
              transform: [{scaleX: cartBtnScaleX}],
              zIndex: count <= 0 ? 1 : -1,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.cartBtn}
            activeOpacity={0.75}
            onPress={() => this.onModifyCount(count + 1)}
            disabled={disabled}
          >
            <View style={styles.cartBtnBox}>
              <LinearGradient
                style={[styles.gradientBox,
                  !disabled && {
                    shadowColor: '#EE4239',
                    shadowOpacity: 0.23,
                    shadowRadius: 4,
                  }
                ]}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={!disabled ? ['#FF3914', '#FF6042'] : ['#BBBBBB', '#BBBBBB']}
              >
                <Text style={styles.cartBtnText}>{children}</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}
