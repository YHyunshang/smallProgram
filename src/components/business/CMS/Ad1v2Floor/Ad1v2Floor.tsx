/**
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import FitImage from 'react-native-fit-image'
import styles from './Ad1v2Floor.styles'
import {Native} from "@utils";

interface Props {
  data: object[]
}

function Img({style, imgUrl, link, linkType}: {style: any, imgUrl: string, link: string, linkType: string|number}) {
  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(linkType, link)}>
      <FitImage style={style} source={{ uri: imgUrl }} indicator={false} resizeMode="cover" />
    </TouchableWithoutFeedback>
  )
}

export default function Ad1v2Floor({ data }: Props) {
  const [ left, rightTop, rightBtm ] = data

  return (
    <View style={styles.container}>
      <View style={styles.leftImgBox}>
        <Img {...left} />
      </View>
      <View style={styles.rightImgBox}>
        <Img style={styles.rightTopImg} {...rightTop} />
        <Img style={styles.rightBtmImg} {...rightBtm} />
      </View>
    </View>
  )
}