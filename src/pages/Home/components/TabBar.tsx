/*
 * @Author: 李华良
 * @Date: 2019-08-20 20:57:22
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-08-21 11:51:37
 */
import * as React from 'react'
import { Animated, View } from 'react-native'
import { TabBar as RNTabBar } from 'react-native-tab-view'
import TabBarLabel from './TabBarLabel'
import styles from './TabBar.styles'

export default function TabBar({ animatedVal, ...passedProps }) {
  const {
    navigationState: { index: currentActiveRouteIdx, routes },
  } = passedProps
  const tabBarBgColor =
    currentActiveRouteIdx === 0
      ? animatedVal.interpolate({
          inputRange: [0, 100],
          outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
          extrapolate: 'clamp',
        })
      : '#FFF'
  const tabBarOpacity =
    currentActiveRouteIdx === 0
      ? animatedVal.interpolate({
          inputRange: [-50, 0, 100],
          outputRange: [0, 1, 1],
          extrapolate: 'clamp',
        })
      : 1
  const indicatorBgColor = currentActiveRouteIdx === 0 ? '#FFF' : '#FF3914'

  const renderLabel = route => (
    <TabBarLabel
      routes={routes}
      animatedVal={animatedVal}
      currentActiveRouteIdx={currentActiveRouteIdx}
      route={route}
    />
  )

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: tabBarBgColor, opacity: tabBarOpacity },
      ]}
    >
      <RNTabBar
        {...passedProps}
        style={styles.tabBar}
        renderLabel={renderLabel}
        tabStyle={{
          width: routes.length > 0 ? 'auto' : undefined,
          padding: 0,
          minHeight: 0,
        }}
        scrollEnabled
        activeColor="#FF3914"
        inactiveColor="#4D4D4D"
        indicatorStyle={{
          backgroundColor: indicatorBgColor,
          paddingHorizontal: 16,
        }}
      />
    </Animated.View>
  )
}
