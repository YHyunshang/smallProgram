import * as React from 'react'
import styles from './Tab.styles'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
} from 'react-native'
import sumBy from 'lodash/sumBy'
import memoizeOne from 'memoize-one'
import isDeepEqual from 'lodash/isEqual'
import { hotSaleTabBg } from '@const/resources'

interface Props {
  data: {
    key: string
    label: string
  }[]
  currentTab: string
  onTabChange: (tabKey: string) => void
}

interface State {
  itemLayoutMap: {
    [tabKey: string]: { width: number }
  }
  indicatorWidth: number
  indicatorLeft: number
}

const windowWidth = Dimensions.get('window').width

const indicatorPosCalculator = memoizeOne(layouts => {
  const currentTabLayout = layouts.slice(-1)[0]
  if (!currentTabLayout) return { width: 0, left: 0 }

  const indicatorWidth = currentTabLayout.width * 0.5
  const tabLayoutsBeforeCurrent = layouts.slice(0, -1)
  if (!tabLayoutsBeforeCurrent.every(ele => !!ele.width))
    return { width: 0, left: 0 }

  const indicatorLeft =
    sumBy(tabLayoutsBeforeCurrent, layout => layout.width + layout.x * 2) +
    currentTabLayout.x +
    currentTabLayout.width / 2 -
    indicatorWidth * 0.5

  return {
    width: indicatorWidth,
    left: indicatorLeft,
  }
}, isDeepEqual)

export default class Tab extends React.PureComponent<Props, State> {
  state = {
    itemLayoutMap: {},
    indicatorWidth: 0,
    indicatorLeft: 0,
  }

  scrollViewRef = React.createRef<ScrollView>()

  cachedTabLabelLayout = {}

  onTabLabelLayout = (tabKey, { nativeEvent: { layout } }) => {
    console.log(tabKey)
    this.cachedTabLabelLayout[tabKey] = layout
    if (this.props.data.every(ele => !!this.cachedTabLabelLayout[ele.key])) {
      this.setState({ itemLayoutMap: this.cachedTabLabelLayout })
    }
  }

  componentDidUpdate() {
    const { indicatorLeft, indicatorWidth } = this.state
    if (!indicatorWidth) return

    const scrollToX = Math.max(
      indicatorLeft + indicatorWidth / 2 - windowWidth / 2,
      0
    )
    this.scrollViewRef.current.scrollTo({ x: scrollToX, animated: true })
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props, state)
    const { data, currentTab } = props
    const { itemLayoutMap } = state
    const currentTabIdx = data.findIndex(tab => tab.key === currentTab)
    const tabLayouts = data
      .slice(0, currentTabIdx + 1)
      .map(ele => itemLayoutMap[ele.key])
    console.log('--->>>>', tabLayouts)
    const indicatorPos = indicatorPosCalculator(tabLayouts)

    console.log(indicatorPos)
    return indicatorPos.width && indicatorPos.left
      ? { indicatorWidth: indicatorPos.width, indicatorLeft: indicatorPos.left }
      : null
  }

  renderTabs = () => {
    const { data, onTabChange } = this.props
    return data.map(({ key, label }) => (
      <TouchableOpacity
        activeOpacity={0.95}
        key={key}
        onPress={() => onTabChange(key)}
      >
        <View style={styles.tabItemBox}>
          <Text
            style={styles.tabItem}
            onLayout={e => this.onTabLabelLayout(key, e)}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    ))
  }

  render() {
    const { data, onTabChange } = this.props
    const { indicatorWidth, indicatorLeft } = this.state

    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: '100%', height: 35.2941 }}
          source={hotSaleTabBg}
          resizeMode="cover"
        >
          <ScrollView
            style={styles.scrollView}
            horizontal
            automaticallyAdjustContentInsets
            showsHorizontalScrollIndicator={false}
            ref={this.scrollViewRef}
          >
            {this.renderTabs()}
            <Animated.View
              style={[
                styles.indicator,
                {
                  left: indicatorLeft,
                  width: indicatorWidth,
                },
              ]}
            />
          </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}
