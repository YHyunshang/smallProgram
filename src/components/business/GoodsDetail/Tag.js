/*
 * @Description: Tag标签组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-12-09 11:30:09
 */

import React from 'react'
import {
  Text,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import styles from './Tag.styles'
export default class Tag extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    marginLeft: PropTypes.number, // 离左边的margin值
    backgroundColor: PropTypes.string, // 颜色值
    color: PropTypes.string // 颜色值
  }
  render() {
    return (
      <View style={[styles.goodsTag, {marginLeft: this.props.marginLeft}, {minWidth: this.props.width, backgroundColor: this.props.backgroundColor}]}>
        <Text style={[styles.goodsTagValue, {color: this.props.color}]}>{this.props.textValue}</Text>
      </View>
    )
  }
}
