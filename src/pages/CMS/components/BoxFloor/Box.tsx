/**
 * Created by 李华良 on 2019-07-04
 */
import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export interface Props {
  url?: string;  // 跳转链接
  image: string;  // 图片 url
  title?: string;  // 标题
}

function Box({ url, image, title }: Props) {
  return (
    <View style={styles.box}>
      <Image style={styles.boxImg} source={{ uri: image }} resizeMode="contain" />
      <Text style={styles.boxText} selectable={false}>{ title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  boxImg: {
    width: 48,
    height: 48,
    marginBottom: 5,
  },
  boxText: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    color: '#333',
  }
})

export default Box