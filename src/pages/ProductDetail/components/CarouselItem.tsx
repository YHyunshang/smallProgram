import * as React from 'react'
import { View, Animated, Easing, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './CarouselItem.styles'
import { placeholder } from '@const/resources'

export interface CarouselItemProps {
  image: string
  priority: FastImage.Priority
}

const CarouselItem: React.FunctionComponent<CarouselItemProps> = ({
  image,
  priority = FastImage.priority.normal,
}) => {
  const [placeholderOpacity] = React.useState(new Animated.Value(1))
  const [placeholderVis, setPlaceholderVis] = React.useState(true)
  const onImgLoad = () => {
    Animated.timing(placeholderOpacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setPlaceholderVis(false))
  }

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.contentImg}
        source={{ uri: image, priority }}
        resizeMode="contain"
        onLoad={onImgLoad}
      />
      {placeholderVis && (
        <Animated.View
          style={[styles.placeholderBox, { opacity: placeholderOpacity }]}
        >
          <FastImage
            style={styles.placeholderImg}
            source={placeholder}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </View>
  )
}

export default CarouselItem
