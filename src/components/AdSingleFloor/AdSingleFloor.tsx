/**
 * Created by 李华良 on 2019-07-12
 */
import React from 'react'
import { Image, StyleSheet, View, Dimension } from 'react-native'
import FitImage from 'react-native-fit-image';

interface Props {
  image: string  // 图片链接
  url?: string  // 跳转地址
}

function handleImageLoad() {
  console.log('--->>>', arguments)
}

function AdSingleFloor(props: Props) {
  const { image, url } = props

  return (
    <View style={styles.container}>
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
