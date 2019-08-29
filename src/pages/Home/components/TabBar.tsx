import * as React from 'react'
import styles from './TabBar.styles'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native'
import { Native } from '@utils'
import sumBy from 'lodash/sumBy'

export const TabHeight = 34
const windowWidth = Dimensions.get('window').width
const statusBarHeight = Native.getStatusBarHeight()
const backgroundHeight = statusBarHeight + 86 + TabHeight

interface Props {
  navigationState: {
    routes: {
      key: string
      title: string
    }[]
    index: number
  }
  jumpTo: Function
  animatedVal: Animated.Value
}

interface Layout {
  width: number
  x: number
}

interface State {
  indicatorWidth: number
  indicatorTranslateX: number
  tabTextLayoutMap: {
    [key: string]: Layout
  }
  tabBoxLayoutMap: {
    [key: string]: Layout
  }
}

export default class TabBar extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  }

  state = {
    indicatorWidth: 0,
    indicatorTranslateX: 0,
    tabTextLayoutMap: {},
    tabBoxLayoutMap: {},
  }

  private cachedTabTextLayoutMap: { [key: string]: Layout } = {}
  private cachedTabBoxLayoutMap: { [key: string]: Layout } = {}

  private scrollViewRef

  static getDerivedStateFromProps(props, state) {
    const {
      navigationState: { routes, index },
    } = props
    const { tabTextLayoutMap, tabBoxLayoutMap } = state
    if (routes.length > 0) {
      const currentActiveRoute = routes[index]
      const currentActiveTabTextLayout =
        tabTextLayoutMap[currentActiveRoute.key]
      if (currentActiveTabTextLayout) {
        const indicatorWidth = currentActiveTabTextLayout.width * 1.4
        const routesBeforeCurrentActive = routes.slice(0, index)
        const tabLayoutsBeforeCurrentActive = routesBeforeCurrentActive.map(
          ele => tabBoxLayoutMap[ele.key]
        )
        const indicatorTranslateX =
          sumBy(tabLayoutsBeforeCurrentActive, ele => ele.width) +
          currentActiveTabTextLayout.x +
          currentActiveTabTextLayout.width / 2 -
          indicatorWidth / 2
        return {
          indicatorWidth,
          indicatorTranslateX,
        }
      }
    }
    return null
  }

  componentDidUpdate() {
    const { indicatorTranslateX, indicatorWidth } = this.state
    if (!indicatorWidth) return

    const scrollToX = Math.max(
      indicatorTranslateX + indicatorWidth / 2 - windowWidth / 2,
      0
    )
    this.scrollViewRef.getNode().scrollTo({ x: scrollToX, animated: true })
  }

  onTabTextLayout = (tabKey, { nativeEvent: { layout } }) => {
    this.cachedTabTextLayoutMap[tabKey] = layout
    const {
      navigationState: { routes },
    } = this.props
    if (routes.every(r => !!this.cachedTabTextLayoutMap[r.key])) {
      this.setState({ tabTextLayoutMap: this.cachedTabTextLayoutMap })
    }
  }

  onTabBoxLayout = (tabKey, { nativeEvent: { layout } }) => {
    this.cachedTabBoxLayoutMap[tabKey] = layout
    const {
      navigationState: { routes },
    } = this.props
    if (routes.every(r => !!this.cachedTabBoxLayoutMap[r.key])) {
      this.setState({ tabBoxLayoutMap: this.cachedTabBoxLayoutMap })
    }
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
        <TouchableOpacity
          activeOpacity={0.95}
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
                { lineHeight: TabHeight },
                { color: index === 0 ? '#FFF' : '#4D4D4D' },
                { opacity: index === idx ? 0 : 1 },
              ]}
              onLayout={e => this.onTabTextLayout(route.key, e)}
            >
              {route.title}
            </Text>
            <Text
              style={[
                styles.tabTextActive,
                { lineHeight: TabHeight },
                { color: index === 0 ? '#FFF' : '#FF3914' },
                { opacity: index === idx ? 1 : 0 },
              ]}
            >
              {route.title}
            </Text>
            {idx === 0 && (
              <Animated.Text
                style={[
                  styles.firstTabTextActiveScroll,
                  { lineHeight: TabHeight },
                  { opacity: firstTabTextActiveScrollOpacity },
                ]}
              >
                {route.title}
              </Animated.Text>
            )}
            {idx !== 0 && (
              <Animated.Text
                style={[
                  styles.firstTabTextInactiveScroll,
                  { lineHeight: TabHeight },
                  { opacity: firstTabTextActiveScrollOpacity },
                ]}
              >
                {route.title}
              </Animated.Text>
            )}
            {idx < routeTotal - 1 && <View style={styles.tabBoxDivider} />}
          </View>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const {
      navigationState: { index, routes },
      animatedVal,
    } = this.props
    const { indicatorWidth, indicatorTranslateX } = this.state

    const tabTranslateY = animatedVal.interpolate({
      inputRange: [0, 50],
      outputRange: [statusBarHeight + 86, statusBarHeight + 36],
      extrapolate: 'clamp',
    })
    const tabOpacity = animatedVal.interpolate({
      inputRange: [-50, 0],
      outputRange: [index === 0 ? 0 : 0.9999, 1],
      extrapolate: 'clamp',
    })
    const backgroundOpacity = animatedVal.interpolate({
      inputRange: [0, 50],
      outputRange: [index === 0 ? 0 : 0.9999, 1],
      extrapolate: 'clamp',
    })
    const backgroundTranslateY = animatedVal.interpolate({
      inputRange: [0, 50],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    })
    const indicatorOpacity = animatedVal.interpolate({
      inputRange: [0, 50],
      outputRange: [index === 0 ? 1 : 0.0001, 0],
      extrapolate: 'clamp',
    })
    const indicatorWhenScrollOpacity = animatedVal.interpolate({
      inputRange: [0, 50],
      outputRange: [index === 0 ? 0 : 0.9999, 1],
      extrapolate: 'clamp',
    })

    return (
      <View style={[styles.container, Platform.OS === 'ios' && { zIndex: 1 }]}>
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
          ref={c => (this.scrollViewRef = c)}
          keyboardShouldPersistTaps="handled"
          alwaysBounceHorizontal={false}
          scrollsToTop={false}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          overScrollMode="never"
          scrollEventThrottle={16}
          style={[
            styles.scrollView,
            {
              height: TabHeight,
              transform: [{ translateY: tabTranslateY }],
              opacity: tabOpacity,
            },
          ]}
          horizontal
        >
          {this.renderTabs()}
          <Animated.View
            style={[
              styles.indicator,
              {
                width: indicatorWidth,
                backgroundColor: '#FFF',
                opacity: indicatorOpacity,
                transform: [{ translateX: indicatorTranslateX }],
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
                transform: [{ translateX: indicatorTranslateX }],
              },
            ]}
          />
        </Animated.ScrollView>
      </View>
    )
  }
}
