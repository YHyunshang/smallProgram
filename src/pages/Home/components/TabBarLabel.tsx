/*
 * @Author: 李华良
 * @Date: 2019-08-20 21:06:47
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-08-21 11:29:34
 */
import * as React from 'react'
import { Animated, View } from 'react-native'
import styles from './TabBarLabel.styles'

interface Route {
  key: string
  title: string
}

interface Props {
  currentActiveRouteIdx: number // 当前激活的 tab route index
  routes: Route[]
  route: {
    route: Route
    focused: boolean
  }
  animatedVal: Animated.Value
}

export default function TabBarLabel({
  currentActiveRouteIdx,
  routes,
  route: { route, focused },
  animatedVal,
}: Props) {
  const currentRouteIdx = routes.findIndex(ele => ele.key === route.key)
  const labelColor =
    currentActiveRouteIdx === 0
      ? currentRouteIdx === 0
        ? animatedVal.interpolate({
            inputRange: [0, 100],
            outputRange: ['#fff', '#FF3914'],
          })
        : animatedVal.interpolate({
            inputRange: [0, 100],
            outputRange: ['#fff', '#4D4D4D'],
          })
      : currentActiveRouteIdx === currentRouteIdx
      ? '#FF3914'
      : '#4D4D4D'
  const scale = focused ? 1.14 : 1
  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          {
            color: labelColor,
            transform: [{ scale }],
          },
        ]}
      >
        {route.title}
      </Animated.Text>
      {currentRouteIdx < routes.length - 1 && <View style={styles.divider} />}
    </View>
  )
}
