/**
 * 1v2 广告图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from 'react-native'
import FitImage from 'react-native-fit-image'
import styles from './Ad1v2.styles'
import { Native } from '@utils'

interface Props {
  data: {
    image: string
    link: {}
  }[]
}

function Img({ style, image, link }: { style?: any; image: string; link: {} }) {
  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
      <Image
        source={{ uri: image }}
        style={[style, { width: '100%', height: '100%' }]}
        resizeMode="cover"
      />
    </TouchableWithoutFeedback>
  )
}

export default function Ad1v2({ data }: Props) {
  const [left, rightTop, rightBtm] = data

  return (
    <View style={styles.container}>
      <View style={styles.leftImgBox}>
        <Img {...left} />
      </View>
      <View style={styles.rightImgBox}>
        <View style={styles.rightTopImgBox}>
          <Img style={styles.rightTopImg} {...rightTop} />
        </View>
        <View style={styles.rightBtmImgBox}>
          <Img style={styles.rightBtmImg} {...rightBtm} />
        </View>
      </View>
    </View>
  )
}
