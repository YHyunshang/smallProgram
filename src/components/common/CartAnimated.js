/*
 * @Description: 购物车加减动画组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-31 10:28:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-04 20:00:59
 */
import React from 'react'
import PropTypes from 'prop-types'
import {minusCircle, plusCircle} from '@const/resources'
import {StyleSheet, Text, View, TouchableOpacity, Animated, Easing} from 'react-native'
export default class CartAnimated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsItem: {},
      cartNumber: 0, // 添加购物车数量
      isShowMin: false, // 是否展示减号
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
  componentDidMount() {
    if (this.props.goodsItem.productNum > 0) {
      this._startAnimated()
      this.setState({isShowMin: true})
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      goodsItem: nextProps.goodsItem
    })
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
    const {goodsItem, handleCart} = this.props
    if (handleCart) {
      handleCart(goodsItem, '1')
      goodsItem.productNum == 0 ? this._startAnimated() : ''
      this.setState({isShowMin: true})
    }
  }
  /**
   * @description 减购物车的操作
   */
  handleMinCart() {
    const {handleCart} = this.props
    const {goodsItem} = this.state
    if (handleCart) {
      handleCart(goodsItem, '0')
    }
    if (goodsItem.productNum == 1) {
      this.state.animatedValue.setValue(0)
      this.rotateAnimated.start(
        () => {
          // 这里可以添加动画之后要执行的函数
          setTimeout(() => {
            this.setState({isShowMin: false})
          }, 100)
        }
      )
    }
  }
  render() {
    const {cartWidth, cartHeight} = this.props
    const {goodsItem} = this.state
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
      outputRange: ['0deg', '180deg']
    })
    const rotatePlus = goodsItem.productNum == 0 ? plusPositiveZ : plusNegativeZ
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

                <Animated.Image style={{width: cartWidth, height: cartHeight, marginRight, marginLeft, transform: [{rotateZ: minPositiveZ}]}} source={minusCircle}>
                  {/* <View style={[styles.minWrapper, {width: cartWidth, height: cartHeight}]}>
                    <Text style={styles.minText}>－</Text>
                  </View> */}
                </Animated.Image>
              </TouchableOpacity>
              : null
          }
          {
            goodsItem.productNum > 0 ?
              <Animated.View style={{minWidth: 30}}>
                <Text style={styles.numberText}>{goodsItem.productNum}</Text>
              </Animated.View>
              : null
          }
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.handleAddCart()
            }} >
            <Animated.Image style={[{width: cartWidth, height: cartHeight}, {transform: [{rotateZ: rotatePlus}]}]} source={plusCircle}></Animated.Image>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  minWrapper: {
    borderWidth: 1,
    borderColor: '#82BF3C',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  minText: {
    color: '#82BF3C',
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
    fontSize: 14,
    color: '#331B00'
  }
})
