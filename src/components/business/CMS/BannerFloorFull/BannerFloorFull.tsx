/*
 * @Author: 李华良
 * @Date: 2019-08-19 10:18:07
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-08-19 10:51:51
 */
import * as React from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import Swiper from 'react-native-swiper'
import Styles from './BannerFloorFull.styles'
import { Native } from '@utils'

interface Props {
  imageHeight: number
  data: {
    imgUrl: string
    link: string
    linkType: string
    id: string
  }[]
}

export default function BannerFloorFull({ imageHeight, data }: Props) {
  return (
    <View style={Styles.container}>
      <Swiper
        height={290}
        autoplay
        loop
        paginationStyle={Styles.pagination}
        dotStyle={Styles.dot}
        activeDotStyle={Styles.activeDot}
      >
        {data.map(({ imgUrl, link, linkType, id }) => (
          <TouchableWithoutFeedback
            key={id}
            onPress={() => Native.navigateTo(linkType, link)}
          >
            <View style={Styles.slider}>
              <Image
                style={[Styles.image, { height: imageHeight }]}
                source={{ uri: imgUrl }}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </Swiper>
    </View>
  )
}

BannerFloorFull.defaultProps = {
  imageHeight: 290,
}
