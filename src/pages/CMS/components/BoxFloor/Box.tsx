/**
 * Created by 李华良 on 2019-07-04
 */
import * as React from 'react'
import { View, Image, Text, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import { Native } from '@utils'
import styles from './Box.styles'

const boxPlaceholder = require('@img/placeholder-box.png')

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
        <ImageBackground style={styles.boxImg} source={boxPlaceholder}>
          <Image style={styles.boxImg} source={{ uri: image }} resizeMode="contain" />
        </ImageBackground>
        <Text style={styles.boxText} selectable={false} ellipsizeMode="clip" numberOfLines={1}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Box