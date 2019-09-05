/*
 * @Description: Tag标签组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-05 19:45:49
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
      <View style={[styles.goodsTag, {marginLeft: this.props.marginLeft}]}>
        <Text style={styles.goodsTagValue}>{this.props.textValue}</Text>
      </View>
    )
  }
}
