/*
 * @Descripttion: 活动或商品数据为空时的页面展示
 * @Author: yuwen.liu
 * @Date: 2019-12-09 18:24:16
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-12-10 10:24:55
 */
import * as React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { emptyBag, emptyActivity } from '@const/resources'
import styles from './Empty.styles'
interface Props {
  type: number //类型，1:活动，2:商品
  textColor1: string
  textColor2: string
}
export default function Empty({ type, textColor1, textColor2 }: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={type === 1 ? emptyActivity : emptyBag}
      />
      <Text style={[styles.h1, { color: textColor1 }]}>
        {type === 1 ? '暂时没有相关活动' : '暂时没有相关商品'}
      </Text>
      <Text style={[styles.h2, { color: textColor2 }]}>看看其他的吧</Text>
    </View>
  )
}
