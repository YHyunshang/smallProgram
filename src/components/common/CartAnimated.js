/*
 * @Description: 购物车加减动画组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-31 10:28:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-01 15:14:32
 */

import React from 'react'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import {StyleSheet, Text, View, TouchableOpacity, Animated, Easing} from 'react-native'
export default class CartAnimated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowMin: false, // 是否展示减号
      cartNumber: 0,
      animatedValue: new Animated.Value(0)
    }
    // 定义Animated动画
    this.rotateAnimated = Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }
    )
  }
  static propTypes = {
    cartWidth: PropTypes.number,
    cartHeight: PropTypes.number
  }
  static defaultProps = {
    cartWidth: 24,
    cartHeight: 24 // 购物车加减按钮的默认大小
  }

  /**
   * @description 开始动画的方法
   */
  _startAnimated() {
    this.state.animatedValue.setValue(0)
    this.rotateAnimated.start()
  }
  /**
   * @description 加购物车的操作
   */
  handleAddCart() {
    this.state.cartNumber == 0 ? this._startAnimated() : ''
    this.setState({cartNumber: this.state.cartNumber + 1, isShowMin: true})
    const {handleCart} = this.props
    if (handleCart) {
      handleCart(this.state.cartNumber)
    }
  }
  /**
   * @description 减购物车的操作
   */
  handleMinCart() {
    this.setState({cartNumber: this.state.cartNumber - 1})
    if (this.state.cartNumber == 1) {
      this.state.animatedValue.setValue(0)
      this.rotateAnimated.start()
      setTimeout(
        () => this.setState({isShowMin: false}),
        100
      )
    }
  }
  render() {
    // 右边偏移量
    const marginRight = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 0]
    })
    // 左边偏移量
    const marginLeft = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [20, -10]
    })
    // 将加号沿z轴顺时针旋转90度
    const plusPositiveZ = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg']
    })
    // 将加号沿z轴逆时针旋转90度
    const plusNegativeZ = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-90deg']
    })
    // 将减号沿z轴逆时针旋转180度
    const minPositiveZ = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-180deg', '0deg']
    })
    const rotatePlus = this.state.cartNumber == 0 ? plusPositiveZ : plusNegativeZ
    const {cartWidth, cartHeight} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.cartWrapper}>
          {
            this.state.isShowMin ?
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  this.handleMinCart()
                }} >

                <Animated.View style={{marginRight, marginLeft, transform: [{rotateZ: minPositiveZ}]}}>
                  <View style={[styles.minWrapper, {width: cartWidth, height: cartHeight}]}>
                    <Text style={styles.minText}>－</Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
              : null
          }
          {
            this.state.cartNumber > 0 ?
              <Animated.View style={{minWidth: 30, marginRight}}>
                <Text style={styles.numberText}>{this.state.cartNumber}</Text>
              </Animated.View>
              : null
          }
          <LinearGradient style={[styles.linearGradient, {width: cartWidth, height: cartHeight}]} colors={['#FE5D3F', '#FF3914']}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                this.handleAddCart()
              }} >
              <Animated.Text style={[styles.plusText, {transform: [{rotateZ: rotatePlus}]}]}>+</Animated.Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    )
  }
}
/**
 * @description: CartAnimated组件样式
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cartWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  minWrapper: {
    borderWidth: 1,
    borderColor: '#FF3914',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  minText: {
    color: '#FF3914',
    fontWeight: 'bold',
    fontSize: 16
  },
  linearGradient: {
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  numberText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#331B00'
  }
})
