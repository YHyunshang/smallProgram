/**
 * Created by 李华良 on 2019-12-17
 */
import * as React from 'react'
import styles from './Spin.styles'
import {Animated, View, Text, Easing} from "react-native";
import {greenLoading} from "@const/resources";

export interface SpinProps {
  children?: string
}

const Spin: React.FunctionComponent<SpinProps> = ({ children }) => {
  const [ animatedVal ] = React.useState(new Animated.Value(0))

  React.useEffect(() => {
    animatedVal.setValue(0)
    const animation = Animated.loop(
      Animated.timing(animatedVal, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )
    animation.start()

    return animation.stop
  })

  const imgRotateDeg = animatedVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={styles.container}>
      <Animated.Image source={greenLoading} style={[ styles.img, { transform: [{ rotate: imgRotateDeg }] }]} resizeMode="contain" />
      {children && (
        <Text style={styles.text}>{ children }</Text>
      )}
    </View>
  )
}

export default Spin
