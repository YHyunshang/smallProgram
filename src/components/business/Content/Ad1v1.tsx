/**
 * 1v1 广告图
 * Created by 李华良 on 2019-08-21
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Native, Img } from '@utils'
import styles from './Ad1v1.styles'
import FastImage from 'react-native-fast-image'

interface Props {
  data: {
    image: string
    link: Native.Navigation
  }[]
}

export default function Ad1v1({ data }: Props) {
  const imgLst = data.slice(0, 2)

  return (
    <View style={styles.container}>
      {imgLst.map(({ image, link }, index) => {
        const fitImg = Img.loadRatioImage(image, Img.FullWidth / 2)
        return (
          <View
            style={[styles.imgBoxL, styles.imgBoxR][index]}
            key={index}
          >
            <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
              <FastImage
                source={{ uri: fitImg }}
                style={[styles.imgL, styles.imgR][index]}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableWithoutFeedback>
          </View>
        )
      })}
    </View>
  )
}
