/*
 * @Description: Tag标签组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-27 13:57:29
 */

import React from 'react'
import {
  Text,
  View
} from 'react-native'
import styles from './Tag.styles'
export default class Tag extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={[styles.goodsTag, {marginLeft: this.props.marginLeft}, {minWidth: this.props.width, backgroundColor: this.props.backgroundColor}]}>
        <Text style={[styles.goodsTagValue, {color: this.props.color}]}>{this.props.textValue}</Text>
      </View>
    )
  }
}
