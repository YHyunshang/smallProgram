import * as React from 'react'
import styles from './TabBar.styles'
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import { Native } from '@utils'
import sumBy from 'lodash/sumBy'

const statusBarHeight = Native.getStatusBarHeight()

export default class TabBar extends React.Component {
  state = {
    tabTextLayoutMap: {},
    tabBoxLayoutMap: {},
  }

  onTabTextLayout = (tabKey, { nativeEvent: { layout } }) =>
    this.setState(({ tabTextLayoutMap }) => ({
      tabTextLayoutMap: { ...tabTextLayoutMap, [tabKey]: layout },
    }))

  onTabBoxLayout = (tabKey, { nativeEvent: { layout } }) =>
    this.setState(({ tabBoxLayoutMap }) => ({
      tabBoxLayoutMap: { ...tabBoxLayoutMap, [tabKey]: layout },
    }))

  calcIndicatorPos = () => {
    const {
      navigationState: { routes, index },
    } = this.props
    const { tabTextLayoutMap, tabBoxLayoutMap } = this.state
    if (routes.length > 0) {
      const currentActiveRoute = routes[index]
      const currentActiveTabTextLayout =
        tabTextLayoutMap[currentActiveRoute.key]
      if (currentActiveTabTextLayout) {
        const indicatorWidth = currentActiveTabTextLayout.width + 8
        const routesBeforeCurrentActive = routes.slice(0, index)
        const tabLayoutsBeforeCurrentActive = routesBeforeCurrentActive.map(
          ele => tabBoxLayoutMap[ele.key]
        )
        const indicatorTranslateY =
          sumBy(tabLayoutsBeforeCurrentActive, ele => ele.width) +
          (currentActiveTabTextLayout.width - indicatorWidth / 2)
        return [indicatorWidth, indicatorTranslateY]
      }
    }
    return [0, 0]
  }

  renderTabs = () => {
    const {
      navigationState: { routes, index },
      jumpTo,
      animatedVal,
    } = this.props
    const routeTotal = routes.length
    return routes.map((route, idx) => {
      const firstTabTextActiveScrollOpacity =
        index === 0
          ? animatedVal.interpolate({
              inputRange: [0, 50],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            })
          : 0
      return (
        <TouchableWithoutFeedback
          onPress={() => jumpTo(route.key)}
          key={route.key}
        >
          <View
            style={styles.tabBox}
            onLayout={e => this.onTabBoxLayout(route.key, e)}
          >
            <Text
              style={[
                styles.tabText,
                { color: index === 0 ? '#FFF' : '#4D4D4D' },
                { opacity: index === idx ? 0 : 1 },
              ]}
              onLayout={e => this.onTabTextLayout(route.key, e)}
            >
              {route.title}
            </Text>
            <Animated.Text
              style={[
                styles.tabTextActive,
                { color: index === 0 ? '#FFF' : '#FF3914' },
                { opacity: index === idx ? 1 : 0 },
              ]}
            >
              {route.title}
            </Animated.Text>
            {idx === 0 && (
              <Animated.Text
                style={[
                  styles.firstTabTextActiveScroll,
                  { opacity: firstTabTextActiveScrollOpacity },
                ]}
              >
                {route.title}
              </Animated.Text>
            )}
            {idx !== 0 && (
              <Animated.Text
                style={[
                  styles.firstTabTextDeactiveScroll,
                  { opacity: firstTabTextActiveScrollOpacity },
                ]}
              >
                {route.title}
              </Animated.Text>
            )}
            {idx < routeTotal - 1 && <View style={styles.tabBoxDivider}></View>}
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }

  render() {
    const { navigationState, animatedVal } = this.props
    const { index } = navigationState

    const tabTranslateY = animatedVal.interpolate({
      inputRange: [0, 50],
      outputRange: [statusBarHeight + 86, statusBarHeight + 36],
      extrapolate: 'clamp',
    })
    const tabOpacity = animatedVal.interpolate({
      inputRange: [-50, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })
    const backgroundHeight = statusBarHeight + 86 + 34
    const backgroundOpacity =
      index === 0
        ? animatedVal.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 1
    const backgroundTranslateY =
      index === 0
        ? animatedVal.interpolate({
            inputRange: [0, 50],
            outputRange: [0, -50],
            extrapolate: 'clamp',
          })
        : 0
    const indicatorOpacity =
      index === 0
        ? animatedVal.interpolate({
            inputRange: [0, 50],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          })
        : 0
    const indicatorWhenScrollOpacity =
      index === 0
        ? animatedVal.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 1

    const [indicatorWidth, indicatorTranslateY] = this.calcIndicatorPos()

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.background,
            {
              height: backgroundHeight,
              opacity: backgroundOpacity,
              transform: [{ translateY: backgroundTranslateY }],
            },
          ]}
        />
        <Animated.ScrollView
          style={[
            styles.scrollView,
            { transform: [{ translateY: tabTranslateY }], opacity: tabOpacity },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {this.renderTabs()}
          <Animated.View
            style={[
              styles.indicator,
              {
                width: indicatorWidth,
                backgroundColor: '#FFF',
                opacity: indicatorOpacity,
                transform: [{ translateY: indicatorTranslateY }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.indicator,
              {
                width: indicatorWidth,
                backgroundColor: '#FF3914',
                opacity: indicatorWhenScrollOpacity,
                transform: [{ translateY: indicatorTranslateY }],
              },
            ]}
          />
        </Animated.ScrollView>
      </View>
    )
  }
}
