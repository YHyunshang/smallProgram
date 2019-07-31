/**
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import FitImage from 'react-native-fit-image'
import styles from './AdSingleFloor.styles'
import {Native} from "@utils"

interface Props {
  image: string  // 图片链接
  link?: {
    type: string | number
    uri: string
    params?: {}
  }  // 跳转地址类型
}

function AdSingleFloor({ image, link }: Props) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Native.navigateTo(link.type, link.uri, link.params)}>
        <FitImage style={styles.image} source={{ uri: image }} resizeMode="cover" />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default AdSingleFloor
