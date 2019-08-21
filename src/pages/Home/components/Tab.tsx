/*
 * @Author: 李华良
 * @Date: 2019-08-20 20:26:18
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-08-20 21:21:48
 */
import * as React from 'react'
import { Dimensions, Animated } from 'react-native'
import { TabView } from 'react-native-tab-view'
import TabBar from './TabBar'
import styles from './Tab.styles'

interface Props {
  tabs: {
    id: string
    showName: string
  }[]
  renderScene: Function
  currentTabIndex: number
  height: number
  onTabIndexChange: (index: number) => any
  animatedVal: Animated.Value
}

export default function Tab({
  tabs,
  renderScene,
  currentTabIndex,
  height,
  onTabIndexChange,
  animatedVal,
}: Props) {
  const navigationState = {
    index: currentTabIndex,
    routes: tabs.map(tab => ({
      key: tab.id,
      title: tab.showName,
    })),
  }

  return (
    <TabView
      style={styles.tabView}
      navigationState={navigationState}
      onIndexChange={onTabIndexChange}
      renderScene={renderScene}
      renderTabBar={props => <TabBar {...props} animatedVal={animatedVal} />}
      sceneContainerStyle={{ height }}
      initialLayout={{
        width: Dimensions.get('window').width,
        height: height,
      }}
    />
  )
}
