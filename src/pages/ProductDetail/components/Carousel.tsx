/**
 * Created by 李华良 on 2019-11-26
 */
import * as React from 'react'
import { View, Animated, Easing } from 'react-native'
import styles from './Carousel.styles'
import { Global, Img } from '@utils'
import Swiper from 'react-native-swiper'
import memorize from 'memoize-one'
import CarouselItem from './CarouselItem'
import FastImage from 'react-native-fast-image'
import { placeholderProductCarousel } from '@const/resources'

const loadFitImg = memorize(imgSrc => Img.loadRatioImage(imgSrc, Img.FullWidth))

export interface CarouselProps {
  images: string[]
}

const Carousel: React.FunctionComponent<CarouselProps> = ({ images = [] }) => {
  const [placeholderVis, setPlaceholderVis] = React.useState(
    images.length === 0
  )
  const [placeholderOpacity] = React.useState(new Animated.Value(1))
  React.useEffect(() =>
    Animated.timing(placeholderOpacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setPlaceholderVis(false))
  )

  return (
    <View style={styles.container}>
      <Swiper
        key={images.length}
        height={Global.WindowWidth}
        loop
        autoplay
        autoplayTimeout={10}
        dotStyle={styles.dot}
        activeDotStyle={[styles.dot, styles.activeDot]}
        paginationStyle={styles.paginationStyle}
        removeClippedSubviews={false}
      >
        {images.map((ele, index) => (
          <CarouselItem
            image={loadFitImg(ele)}
            key={ele}
            priority={
              index === 0 ? FastImage.priority.high : FastImage.priority.normal
            }
          />
        ))}
      </Swiper>
      {placeholderVis && (
        <Animated.View
          style={[styles.placeholderBox, { opacity: placeholderOpacity }]}
        >
          <FastImage
            style={styles.placeholderImg}
            source={placeholderProductCarousel}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </View>
  )
}

export default Carousel
