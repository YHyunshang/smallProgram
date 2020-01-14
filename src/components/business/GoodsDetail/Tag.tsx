/*
 * @Description: Tag标签组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-14 15:03:17
 */
import * as React from 'react'
import { Text, View } from 'react-native'
import styles from './Tag.styles'

interface Props {
  marginLeft: string // 活动编码
  color: string // 颜色值
  width: number // 宽度
  textValue: string // 文本值
  backgroundColor: string // 背景颜色值
}

export default class Tag extends React.Component<Props> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View
        style={[
          styles.goodsTag,
          { marginLeft: this.props.marginLeft },
          {
            minWidth: this.props.width,
            backgroundColor: this.props.backgroundColor,
          },
        ]}
      >
        <Text style={[styles.goodsTagValue, { color: this.props.color }]}>
          {this.props.textValue}
        </Text>
      </View>
    )
  }
}
