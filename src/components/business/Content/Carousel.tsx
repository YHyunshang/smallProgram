/**
 * 轮播图
 * Created by 李华良 on 2019-08-19
 */
import * as React from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import Swiper from 'react-native-swiper'
import Styles from './Carousel.styles'
import { Native, Img } from '@utils'
import FastImage from 'react-native-fast-image'

interface Props {
  imageHeight: number
  data: {
    key: string
    image: string
    link: Native.Navigation
  }[]
}

export default function Carousel({ imageHeight = 290, data }: Props) {
  return (
    <View style={Styles.container} onStartShouldSetResponder={() => true}>
      <Swiper
        removeClippedSubviews={false}
        height={imageHeight}
        autoplay
        loop
        paginationStyle={Styles.pagination}
        dotStyle={Styles.dot}
        activeDotStyle={Styles.activeDot}
        autoplayTimeout={4}
      >
        {data.map(({ image, link, key }) => {
          const fitImg = Img.loadRatioImage(image, Img.FullWidth)
          return (
            <View style={Styles.slider} key={key}>
              <TouchableWithoutFeedback
                onPress={() => link.type && Native.navigateTo(link)}
              >
                <FastImage
                  style={[Styles.image, { height: imageHeight }]}
                  source={{ uri: fitImg }}
                />
              </TouchableWithoutFeedback>

            </View>
          )
        })}
      </Swiper>
    </View>
  )
}
