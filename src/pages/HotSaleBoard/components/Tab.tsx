import * as React from 'react'
import styles from './Tab.styles'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
  LayoutRectangle,
} from 'react-native'
import sumBy from 'lodash/sumBy'
import memoizeOne from 'memoize-one'
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
  itemLabelLayoutMap: {
    [tabKey: string]: LayoutRectangle
  }
  itemBoxLayoutMap: {
    [tabKey: string]: LayoutRectangle
  }
  indicatorWidth: number
  indicatorLeft: number
}

const windowWidth = Dimensions.get('window').width

const indicatorPosCalculator = memoizeOne(
  (boxLayouts: LayoutRectangle[], labelLayout: LayoutRectangle) => {
    const currentBoxLayout = boxLayouts.slice(-1)[0]
    if (!currentBoxLayout || !labelLayout || !labelLayout.width)
      return { width: 0, left: 0 }

    const indicatorWidth = labelLayout.width * 0.5
    const boxLayoutsBeforeCurrent = boxLayouts.slice(0, -1)
    if (!boxLayoutsBeforeCurrent.every(ele => !!ele.width))
      return { width: 0, left: 0 }

    const indicatorLeft =
      sumBy(boxLayoutsBeforeCurrent, ({ width, x }) => width + 2 * x) +
      labelLayout.x +
      labelLayout.width * 0.5 -
      indicatorWidth * 0.5

    return {
      width: indicatorWidth,
      left: indicatorLeft,
    }
  },
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
)

export default class Tab extends React.PureComponent<Props, State> {
  state = {
    itemBoxLayoutMap: {},
    itemLabelLayoutMap: {},
    indicatorWidth: 0,
    indicatorLeft: 0,
  }

  scrollViewRef = React.createRef<ScrollView>()

  cachedTabLabelLayout = {}
  cachedTabBoxLayout = {}

  onTabBoxLayout = (tabKey, { nativeEvent: { layout } }) => {
    this.cachedTabBoxLayout[tabKey] = layout
    if (this.props.data.every(ele => !!this.cachedTabBoxLayout[ele.key])) {
      this.setState({ itemBoxLayoutMap: this.cachedTabBoxLayout })
    }
  }
  onTabLabelLayout = (tabKey, { nativeEvent: { layout } }) => {
    this.cachedTabLabelLayout[tabKey] = layout
    if (this.props.data.every(ele => !!this.cachedTabLabelLayout[ele.key])) {
      this.setState({ itemLabelLayoutMap: this.cachedTabLabelLayout })
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
    const { itemLabelLayoutMap, itemBoxLayoutMap } = state
    const currentTabIdx = data.findIndex(tab => tab.key === currentTab)
    const tabLayouts = data
      .slice(0, currentTabIdx + 1)
      .map(ele => itemBoxLayoutMap[ele.key])
    const indicatorPos = indicatorPosCalculator(
      tabLayouts,
      itemLabelLayoutMap[currentTab]
    )

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
        <View
          style={styles.tabItemBox}
          onLayout={e => this.onTabBoxLayout(key, e)}
        >
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
