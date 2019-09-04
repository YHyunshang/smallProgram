/*
 * @Description: 购物车加减动画组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-31 10:28:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-04 16:10:40
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Map} from '../../utils/FormatUtil'
import theme from '@theme'
import LinearGradient from 'react-native-linear-gradient'
import {addToCart, subscriptCartNumberChange} from '../../services/goodsDetail'
import {StyleSheet, Text, View, TouchableOpacity, Animated, Easing} from 'react-native'
let map = new Map()
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
    const {goodsItem} = this.props
    if (goodsItem.productNum > 0) {
      this._startAnimated()
      this.setState({isShowMin: true})
    }
    // 相似商品列表购物车数量变化native 事件监听
    this.nativeSubscription = subscriptCartNumberChange(
      this.onNativeCartNumberChange
    )
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      goodsItem: nextProps.goodsItem,
      cartNumber: nextProps.goodsItem.productNum
    })
  }
  componentWillUnmount() {
    this.nativeSubscription && this.nativeSubscription.remove()
  }
  /**
   * @param {productCode}
   * @param {productNumber}
   * @description: 相似商品列表添加购物车返回productCode和productNumber
   */
  onNativeCartNumberChange = ({productCode, productNumber}) => {
    map.put(productCode, productNumber)// 将添加到购物车的商品编码和商品数量存到map中
  }
  /**
   * @description 开始动画的方法
   */
  _startAnimated() {
    this.state.animatedValue.setValue(0)
    this.rotateAnimated.start()
  }
  /**
   * @description: 相似商品列表添加到购物车
   */
  handleCart=(item, type) => {
    let number = map.get(item.productCode)// 获取之前保存到map里面的商品数量
    if (number) { // 如果map里面存在就从map里面取，否则直接从当前添加的商品取
      item.productNum = Number(number)
    }
    addToCart(JSON.stringify(item), type)
  }
  /**
   * @description 加购物车的操作
   */
  handleAddCart() {
    const {goodsItem} = this.props
    this.state.cartNumber == 0 ? this._startAnimated() : ''
    this.setState({isShowMin: true})
    this.handleCart(goodsItem, '1')
    this.setState({cartNumber: this.state.cartNumber + 1})
  }
  /**
   * @description 减购物车的操作
   */
  handleMinCart() {
    const {goodsItem} = this.props
    this.handleCart(goodsItem, '0')
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
    const {cartWidth, cartHeight} = this.props
    const {cartNumber} = this.state
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
    const rotatePlus = cartNumber == 0 ? plusPositiveZ : plusNegativeZ
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
            cartNumber > 0 ?
              <Animated.View style={{minWidth: 30, marginRight}}>
                <Text style={styles.numberText}>{cartNumber}</Text>
              </Animated.View>
              : null
          }
          <LinearGradient style={[styles.linearGradient, {width: cartWidth, height: cartHeight}]} colors={[theme.primary, theme.secondary]}>
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
