/**
 * 分割图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { View } from 'react-native'
import FitImage from 'react-native-fit-image'
import styles from './Divider.styles'
import { Img } from '@utils'

interface Props {
  image: string
}

export default function Divider({ image }: Props) {
  const fitImg = Img.loadRatioImage(image, Img.FullWidth)
  return (
    <View style={styles.container}>
      <FitImage source={{ uri: fitImg }} indicator={false} />
    </View>
  )
}
