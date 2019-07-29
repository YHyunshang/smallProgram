/**
 * Created by 李华良 on 2019-07-12
 */
import React from 'react'
import { Image, StyleSheet, View, Dimension } from 'react-native'
import FitImage from 'react-native-fit-image'

interface Props {
  image: string  // 图片链接
  uriType?: string  // 跳转地址类型
  uri?: string  // 跳转地址
  onPress: Function  // 点击回调
}

function AdSingleFloor({ image, uriType, uri, onPress}: Props) {
  return (
    <View style={styles.container} onPress={() => onPress(uriType, uri)}>
      <FitImage style={styles.image} source={{ uri: image }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  image: {
  }
})

export default AdSingleFloor
