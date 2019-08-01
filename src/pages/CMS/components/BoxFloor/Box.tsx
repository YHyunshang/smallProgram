/**
 * Created by 李华良 on 2019-07-04
 */
import * as React from 'react'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import { Native } from '@utils'
import styles from './Box.styles'

interface Props {
  link?: {
    type: string
    uri: string
  }  // 跳转链接
  image: string  // 图片 url
  title?: string  // 标题
}

function Box({ link, image, title }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link.type, link.uri)}>
      <View style={styles.box}>
        <Image style={styles.boxImg} source={{ uri: image }} resizeMode="contain" />
        <Text style={styles.boxText} selectable={false} ellipsizeMode="clip" numberOfLines={1}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Box