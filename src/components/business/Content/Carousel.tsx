/**
 * 轮播图
 * Created by 李华良 on 2019-08-19
 */
import * as React from 'react'
import { View, Image, TouchableWithoutFeedback, Animated } from 'react-native'
import Swiper from 'react-native-swiper'
import Styles from './Carousel.styles'
import { Native, Img } from '@utils'
import FastImage from 'react-native-fast-image'
import { usePlaceholder } from '@utils/hooks'
import { placeholder } from '@const/resources'

interface Props {
  imageHeight: number
  data: {
    key: string
    image: string
    link: Native.Navigation
  }[]
}

export default function Carousel({ imageHeight = 290, data }: Props) {
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()
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
            <TouchableWithoutFeedback
              key={key}
              onPress={() => link.type && Native.navigateTo(link)}
            >
              <View style={Styles.slider}>
                <FastImage
                  style={[Styles.image, { height: imageHeight }]}
                  source={{ uri: fitImg }}
                  resizeMode="contain"
                  onLoad={onLoad}
                />
                {placeholderVis && (
                  <Animated.View
                    style={[Styles.placeholderBox, placeholderOpacityStyle]}
                  >
                    <FastImage
                      style={Styles.placeholder}
                      source={placeholder}
                      resizeMode="contain"
                    />
                  </Animated.View>
                )}
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </Swiper>
    </View>
  )
}
