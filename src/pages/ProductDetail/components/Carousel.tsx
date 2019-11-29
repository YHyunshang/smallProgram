/**
 * Created by 李华良 on 2019-11-26
 */
import * as React from 'react'
import {Animated, Easing, Text, View} from "react-native";
import styles from './Carousel.styles'
import {placeholderProduct} from "@const/resources";
import FastImage from "react-native-fast-image";
import {Global, Img} from "@utils";
import Swiper from 'react-native-swiper'
import memorize from "memoize-one";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)

const loadFitImg = memorize(imgSrc => Img.loadRatioImage(imgSrc, Img.FullWidth))

export interface CarouselProps {
  placeholder: string
  images: string[]
}

const Carousel: React.FunctionComponent<CarouselProps> = ({ placeholder, images }) => {
  const [ placeholderOpacity ] = React.useState(new Animated.Value(0))
  const [ placeholderVis, setPlaceholderVis ] = React.useState(true)

  let loadedCount = 0
  const onImgLoadEnd = () => {
    loadedCount += 1
    if (loadedCount === images.length) {
      Animated.timing(placeholderOpacity, {
        toValue: 0,
        duration: 350,
        easing: Easing.linear,
        useNativeDriver: true,
      })
        .start(() => setPlaceholderVis(false))
    }
  }

  return (
    <View style={styles.container}>
      <Swiper
        height={Global.WindowWidth}
        loop
        autoplay
        autoplayTimeout={10}
        dotStyle={styles.dot}
        activeDotStyle={[ styles.dot, styles.activeDot ]}
        paginationStyle={styles.paginationStyle}
        removeClippedSubviews={false}
      >
        {images.map((ele, index) => (
          <FastImage
            key={index}
            style={styles.image}
            source={{ uri: loadFitImg(ele) }}
            resizeMode="contain"
            onLoadEnd={onImgLoadEnd}
          />
        ))}
      </Swiper>
      {placeholderVis && (
        <AnimatedFastImage
          style={[ styles.defaultImage, { opacity: placeholderOpacity } ]}
          source={placeholder ? { uri: placeholder } : placeholderProduct}
          resizeMode="contain"
        />
      )}
    </View>
  )
}

export default Carousel
