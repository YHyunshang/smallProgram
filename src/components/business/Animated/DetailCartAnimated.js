/*
 * @Description: 商品详情购物车加减动画组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-31 10:28:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-05 19:33:41
 */
import React from 'react'
import PropTypes from 'prop-types'
import {minusCircle, plusCircle, plusCircleDisabled} from '@const/resources'
import {addToCart, subscriptCartNumberChange} from '../../../services/goodsDetail'
import {StyleSheet, Text, View, TouchableOpacity, Animated, Easing} from 'react-native'
export default class DetailCartAnimated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsItem: {},
      cartNumber: 0, // 添加购物车数量
      isShowMin: false, // 是否展示减号
      animatedValue: new Animated.Value(0)
    }
    // 定义X轴平移动画
    this.translateAnimated = Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }
    )
    // 定义Z轴旋转动画
    this.translateZAnimated = Animated.timing(
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
    // 相似商品列表购物车数量变化native 事件监听
    this.nativeSubscription = subscriptCartNumberChange(
      this.onNativeCartNumberChange
    )
  }
  componentWillUnmount() {
    this.nativeSubscription && this.nativeSubscription.remove()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      cartNumber: nextProps.goodsItem.productNum,
      goodsItem: nextProps.goodsItem
    })
  }
  /**
   * @param {productCode}
   * @param {productNumber}
   * @description: 相似商品列表添加购物车返回productCode和productNumber
   */
  onNativeCartNumberChange = ({productCode, productNumber}) => {
    const {refreshGoodsList} = this.props
    refreshGoodsList(productCode, productNumber)
  }
  /**
   * @description: 相似商品列表添加到购物车
   */
  handleCart=(item, type) => {
    addToCart(JSON.stringify(item), type)
  }
  /**
   * @description 开始动画的方法
   */
  _startAnimated() {
    this.state.animatedValue.setValue(0)
    // 组合动画，将translateAnimated和translateZAnimated动画组合
    Animated.parallel([
      this.translateAnimated,
      this.translateZAnimated
    ]).start()
  }
  /**
   * @description 加购物车的操作
   */
  handleAddCart() {
    const {goodsItem} = this.props
    const {cartNumber} = this.state
    cartNumber == 0 ? this._startAnimated() : ''
    if (cartNumber == 0) {
      this.setState({cartNumber: 1})
    }
    this.setState({isShowMin: true})
    this.handleCart(goodsItem, '1')
  }
  /**
   * @description 减购物车的操作
   */
  handleMinCart() {
    const {goodsItem, cartNumber} = this.state
    this.handleCart(goodsItem, '0')
    if (cartNumber == 1) {
      this.setState({cartNumber: 0})
      this.state.animatedValue.setValue(0)
      // 组合动画，将translateAnimated和translateZAnimated动画组合
      Animated.parallel([
        this.translateAnimated,
        this.translateZAnimated
      ]).start(
        () => {
          // 这里可以添加动画之后要执行的函数
          this.setState({isShowMin: false})
        }
      )
    }
  }
  render() {
    const {cartWidth, cartHeight} = this.props
    const {goodsItem, cartNumber} = this.state
    // X轴偏移量
    const translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 0] // 线性插值，0对应15,1对应0
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
    // 将减号沿z轴顺时针旋转180度
    const minPositiveZ = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '0deg']
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

                <Animated.Image style={{width: cartWidth, height: cartHeight, transform: [{translateX}, {rotateZ: minPositiveZ}]}} source={minusCircle}>
                </Animated.Image>
              </TouchableOpacity>
              : null
          }
          {
            cartNumber > 0 ?
              <Animated.View style={[styles.cartWrapper, {minWidth: 30, transform: [{translateX}]}]}>
                <Text style={styles.numberText}>{cartNumber}</Text>
              </Animated.View>
              : null
          }
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.handleAddCart()
            }} >
            <Animated.Image style={[{width: cartWidth, height: cartHeight}, {transform: [{rotateZ: rotatePlus}]}]} source={ cartNumber >= goodsItem.stockQuantity ? plusCircleDisabled : plusCircle}></Animated.Image>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
/**
 * @description: DetailCartAnimated组件样式
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cartWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
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
    fontSize: 14,
    color: '#331B00'
  }
})
