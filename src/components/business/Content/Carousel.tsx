/**
 * 轮播图
 * Created by 李华良 on 2019-08-19
 */
import * as React from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import Swiper from 'react-native-swiper'
import Styles from './Carousel.styles'
import { Native } from '@utils'

interface Props {
  imageHeight: number
  data: {
    key: string
    image: string
    link: Native.Navigation
  }[]
}

export default function Carousel({ imageHeight = 290, data }: Props) {
  console.log('carousel links', data.map(ele => ele.link))
  return (
    <View style={Styles.container}>
      <Swiper
        height={imageHeight}
        autoplay
        loop
        paginationStyle={Styles.pagination}
        dotStyle={Styles.dot}
        activeDotStyle={Styles.activeDot}
      >
        {data.map(({ image, link, key }) => (
          <TouchableWithoutFeedback
            key={key}
            onPress={() => link.type && Native.navigateTo(link)}
          >
            <View style={Styles.slider}>
              <Image
                style={[Styles.image, { height: imageHeight }]}
                source={{ uri: image }}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </Swiper>
    </View>
  )
}
