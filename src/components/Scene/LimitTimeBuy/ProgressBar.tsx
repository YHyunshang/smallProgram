/**
 * Created by 李华良 on 2019-09-30
 */
import * as React from 'react'
import {View, Text} from "react-native"
import styles from './ProgressBar.styles'

interface Props {
  percentage: number, // 占比 80 表示 80%
  text: string,
}

export default function ProgressBar({ percentage, text }: Props) {
  const filledWidth = percentage > 100 ? '100%' : `${percentage}%`
  return (
    <View style={styles.container}>
      <View style={[styles.filled, { width: filledWidth }]} />
      <View style={styles.textBox}>
        <Text style={styles.text}>{text}{filledWidth}</Text>
      </View>
    </View>
  )
}