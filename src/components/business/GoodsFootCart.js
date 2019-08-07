/*
 * @Description: 商品详情底部购物车组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-07 14:21:09
 */

import React from 'react'
import {
  Text,
  View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../../components/Icon'
import styles from './GoodsFootCart.styles'
export default class GoodsFootCart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperBg}>
          <LinearGradient colors={['#EE4239', '#FF766F']} style={styles.leftWrapper}>
            <Icon name='cart' size={26} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.cartGoodsBg}>
            <Text style={styles.cartGoodsNumber}>2</Text>
          </View>
        </View>
        <LinearGradient colors={['#D8433B', '#FF766F']} style={styles.rightWrapper}>
          <Icon name='minus' size={18} color="#FFFFFF" />
          <Text style={styles.textColor}>2</Text>
          <Icon name='plus' size={18} color="#FFFFFF" />
        </LinearGradient>
      </View>
    )
  }
}
