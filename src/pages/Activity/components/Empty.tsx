import * as React from 'react'
import styles from './Empty.styles'
import { View, Image, Text } from 'react-native'

export default function Empty() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('@img/empty-activity.png')}
      ></Image>
      <Text style={styles.h1}>暂时没有相关活动</Text>
      <Text style={styles.h2}>看看其他的吧</Text>
    </View>
  )
}