/**
 * 单张广告图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View, Dimensions } from 'react-native'
import FitImage from 'react-native-fit-image'
import styles from './AdSingle.styles'
import { Native, Img } from '@utils'

export interface Props {
  image: string // 图片链接
  link: {} // 跳转地址类型
}

function AdSingle({ image, link }: Props) {
  const fitImg = Img.loadRatioImage(image, Img.FullWidth)
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
        <FitImage
          style={styles.image}
          source={{ uri: fitImg }}
          resizeMode="cover"
          indicator={false}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default AdSingle
