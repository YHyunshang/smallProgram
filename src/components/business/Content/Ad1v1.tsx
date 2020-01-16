/**
 * 1v1 广告图
 * Created by 李华良 on 2019-08-21
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View, Animated } from 'react-native'
import { Native, Img } from '@utils'
import styles from './Ad1v1.styles'
import FastImage from 'react-native-fast-image'
import { placeholder } from '@const/resources'
import { usePlaceholder } from '@utils/hooks'

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

export default function Ad1v1({ data }: Props) {
  const imgLst = data.slice(0, 2)

  return (
    <View style={styles.container}>
      {imgLst.map(({ image, link }, index) => (
        <View style={[styles.imgBoxL, styles.imgBoxR][index]} key={index}>
          <SideImg
            style={[styles.imgL, styles.imgR][index]}
            image={image}
            link={link}
          />
        </View>
      ))}
    </View>
  )
}
