/**
 * 1v2 广告图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { View, TouchableWithoutFeedback, Animated } from 'react-native'
import styles from './Ad1v2.styles'
import { Native, Img } from '@utils'
import FastImage from 'react-native-fast-image'
import { usePlaceholder } from '@utils/hooks'
import { placeholder } from '@const/resources'

interface Props {
  data: {
    image: string
    link: Native.Navigation
  }[]
}

function SideImg({
  style,
  image,
  link,
}: {
  style?: any
  image: string
  link: Native.Navigation
}) {
  const fitImg = Img.loadRatioImage(image, Img.FullWidth / 2)
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()
  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
      <View style={styles.innerImgBox}>
        <FastImage
          source={{ uri: fitImg }}
          style={[style]}
          resizeMode="contain"
          onLoad={onLoad}
        />
        {placeholderVis && (
          <Animated.View
            style={[styles.placeholderBox, placeholderOpacityStyle]}
          >
            <FastImage
              style={styles.placeholder}
              source={placeholder}
              resizeMode="contain"
            />
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Ad1v2({ data }: Props) {
  const [left, rightTop, rightBtm] = data

  return (
    <View style={styles.container}>
      <View style={styles.leftImgBox}>
        <SideImg style={styles.leftImg} {...left} />
      </View>
      <View style={styles.rightImgBox}>
        <View style={styles.rightTopImgBox}>
          <SideImg style={styles.rightTopImg} {...rightTop} />
        </View>
        <View style={styles.rightBtmImgBox}>
          <SideImg style={styles.rightBtmImg} {...rightBtm} />
        </View>
      </View>
    </View>
  )
}
