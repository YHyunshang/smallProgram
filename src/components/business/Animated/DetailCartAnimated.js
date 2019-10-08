/*
 * @Description: 商品详情购物车加减动画组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-31 10:28:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-06 16:44:51
 */
import React from 'react'
import PropTypes from 'prop-types'
import {minusCircle, plusCircle, plusCircleDisabled} from '@const/resources'
import {addToCart, subscriptCartNumberChange} from '../../../services/goodsDetail'
import {StyleSheet, View, TouchableOpacity, Animated, Easing} from 'react-native'
export default class DetailCartAnimated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsItem: {},
      cartNumber: 0, // 添加购物车数量
      animatedValue: new Animated.Value(props.goodsItem.productNum <= 0 ? 0 : 1)
    }
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
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ).start()
  }
  /**
   * @description 加购物车的操作
   */
  handleAddCart() {
    const {goodsItem} = this.props
    const {cartNumber} = this.state
    this.handleCart(goodsItem, '1')
    if (cartNumber == 0 && goodsItem.stockQuantity != 0) {
      Animated.timing(
        this.state.animatedValue,
        {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.linear
        }
      ).start()
      this.setState({cartNumber: 1})
    }
  }
  /**
   * @description 减购物车的操作
   */
  handleMinCart() {
    const {goodsItem, cartNumber} = this.state
    this.handleCart(goodsItem, '0')
    if (cartNumber == 1) {
      Animated.timing(
        this.state.animatedValue,
        {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.linear
        }
      ).start()
      this.setState({cartNumber: 0})
    }
  }
  render() {
    const {cartWidth, cartHeight} = this.props
    const {goodsItem, cartNumber} = this.state
    // 将减号在X轴向左偏移
    const translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0] // 线性插值，0对应50,1对应0
    })
    // 将数量文本在x轴向左偏移
    const cartNumberTranslateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 0]
    })
    // 将加号沿z轴逆时针旋转90度
    const rotatePlus = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-90deg']
    })
    // 将减号沿z轴逆时针旋转180度
    const minPositiveZ = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    })
    return (
      <View style={styles.container}>
        <View style={styles.cartWrapper}>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.handleMinCart()
            }} >
            <Animated.View style={{transform: [{translateX}]}}>
              <Animated.Image style={{width: cartWidth, height: cartHeight, transform: [{rotate: minPositiveZ}]}} source={minusCircle}>
              </Animated.Image>
            </Animated.View>
          </TouchableOpacity>

          <Animated.Text
            style={[styles.numberText, {transform: [{translateX: cartNumberTranslateX}]}]}
            numberOfLines={1}
          >
            {cartNumber > 0 ? cartNumber : ''}
          </Animated.Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.handleAddCart()
            }} >
            <Animated.Image style={[{width: cartWidth, height: cartHeight}, {transform: [{rotate: rotatePlus}]}]} source={ cartNumber >= goodsItem.stockQuantity ? plusCircleDisabled : plusCircle}></Animated.Image>
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
    minWidth: 25,
    textAlign: 'center',
    paddingHorizontal: 2,
    color: '#331B00'
  }
})
