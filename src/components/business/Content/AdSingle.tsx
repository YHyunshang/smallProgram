/**
 * 单张广告图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import FitImage from 'react-native-fit-image'
import styles from './AdSingle.styles'
import { Native } from '@utils'

export interface Props {
  image: string // 图片链接
  link: {} // 跳转地址类型
}

function AdSingle({ image, link }: Props) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
        <FitImage
          style={styles.image}
          source={{ uri: image }}
          resizeMode="cover"
          indicator={false}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default AdSingle
