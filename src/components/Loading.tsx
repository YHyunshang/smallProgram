/**
 * Created by 李华良 on 2019-11-22
 */
import * as React from 'react'
import {Animated, View} from 'react-native';
import styles from './Loading.styles'

export interface LoadingProps {}

const Loading: React.FunctionComponent<LoadingProps> = (props) => {
  const rotate = new Animated.Value(0)
  Animated.loop(Animated.timing(rotate, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  })).start()

  const rotateDeg = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
    extrapolate: 'clamp',
  })

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.img, { transform: [{ rotate: rotateDeg }] }]}
        source={require('@img/loading.jpg')}
      />
    </View>
  )
}

export default Loading
