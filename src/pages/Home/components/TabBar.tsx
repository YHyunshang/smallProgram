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
import theme from '@theme'
import memoize from 'memoize-one'
import sumBy from 'lodash/sumBy'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { TabHeight, NativePlaceHeightMax, NativePlaceHeightMin } from '../utils'

const windowWidth = Dimensions.get('window').width
const backgroundHeight = NativePlaceHeightMax + TabHeight
const headerHeightRange = NativePlaceHeightMax - NativePlaceHeightMin

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
  tabTextLayoutMap: {
    [key: string]: Layout
  }
  tabBoxLayoutMap: {
    [key: string]: Layout
  }
}

export default class TabBar extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
  }

  state = {
    tabTextLayoutMap: {},
    tabBoxLayoutMap: {},
  }

  private cachedTabTextLayoutMap: { [key: string]: Layout } = {}
  private cachedTabBoxLayoutMap: { [key: string]: Layout } = {}

  private scrollViewRef

  componentDidUpdate() {
    const { navigationState } = this.props
    const { tabTextLayoutMap, tabBoxLayoutMap } = this.state
    const { indicatorWidth, indicatorTranslateX } = this.calcIndicatorLayout(
      navigationState,
      tabTextLayoutMap,
      tabBoxLayoutMap
    )
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

  calcIndicatorLayout = memoize(
    (navigationState, tabTextLayoutMap, tabBoxLayoutMap) => {
      const { routes, index } = navigationState

      if (
        routes.length > 0 &&
        !isEmpty(tabBoxLayoutMap) &&
        !isEmpty(tabTextLayoutMap)
      ) {
        const currentActiveRoute = routes[index]
        const currentActiveTabTextLayout =
          tabTextLayoutMap[currentActiveRoute.key]
        if (currentActiveTabTextLayout) {
          const indicatorWidth = currentActiveTabTextLayout.width + 10
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
      return {
        indicatorWidth: 0,
        indicatorTranslateX: 0,
      }
    },
    isEqual
  )

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
                { color: index === 0 ? '#FFF' : '#000' },
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
                { color: index === 0 ? '#FFF' : theme.primary },
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
    const { navigationState, animatedVal } = this.props
    const { tabTextLayoutMap, tabBoxLayoutMap } = this.state
    const { index } = navigationState
    const { indicatorWidth, indicatorTranslateX } = this.calcIndicatorLayout(
      navigationState,
      tabTextLayoutMap,
      tabBoxLayoutMap
    )

    const tabTranslateY = animatedVal.interpolate({
      inputRange: [0, headerHeightRange],
      outputRange: [NativePlaceHeightMax, NativePlaceHeightMin],
      extrapolate: 'clamp',
    })
    const tabOpacity =
      index === 0
        ? animatedVal.interpolate({
            inputRange: [-50, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 1
    const whiteBgOpacity =
      index === 0
        ? animatedVal.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 1
    const whiteBgTranslateY = animatedVal.interpolate({
      inputRange: [0, headerHeightRange],
      outputRange: [0, -headerHeightRange],
      extrapolate: 'clamp',
    })
    const grayBgOpacity =
      index === 0
        ? animatedVal.interpolate({
            inputRange: [0, 0.1, 50],
            outputRange: [0.04, 0, 0],
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

    return (
      <View style={[styles.container, Platform.OS === 'ios' && { zIndex: 1 }]}>
        <Animated.View
          style={[
            styles.whiteBackground,
            {
              height: backgroundHeight,
              opacity: whiteBgOpacity,
              transform: [{ translateY: whiteBgTranslateY }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.grayBackground,
            {
              height: backgroundHeight,
              opacity: grayBgOpacity,
              transform: [{ translateY: whiteBgTranslateY }],
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
                backgroundColor: theme.primary,
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
