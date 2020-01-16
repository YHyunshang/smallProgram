import * as React from 'react'
import { View, Animated } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './CarouselItem.styles'
import { placeholder } from '@const/resources'
import { usePlaceholder } from '@utils/hooks'

export interface CarouselItemProps {
  image: string
  priority: FastImage.Priority
}

const CarouselItem: React.FunctionComponent<CarouselItemProps> = ({
  image,
  priority,
}) => {
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.contentImg}
        source={{ uri: image, priority }}
        resizeMode="contain"
        onLoad={onLoad}
      />
      {placeholderVis && (
        <Animated.View style={[styles.placeholderBox, placeholderOpacityStyle]}>
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

CarouselItem.defaultProps = {
  priority: FastImage.priority.normal,
}

export default CarouselItem
