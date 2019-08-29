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
} from 'react-native'
import sumBy from 'lodash/sumBy'

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
}

const windowWidth = Dimensions.get('window').width

export default class Tab extends React.PureComponent<Props, State> {
  state = {
    itemLayoutMap: {},
  }

  scrollViewRef = React.createRef<ScrollView>()

  cachedTabLabelLayout = {}

  onTabLabelLayout = (tabKey, { nativeEvent: { layout } }) => {
    this.cachedTabLabelLayout[tabKey] = layout
    if (this.props.data.every(ele => !!this.cachedTabLabelLayout[ele.key])) {
      this.setState({ itemLayoutMap: this.cachedTabLabelLayout })
    }
  }

  componentDidUpdate() {
    const { data, currentTab } = this.props
    const { itemLayoutMap } = this.state
    const currentTabIdx = data.findIndex(tab => tab.key === currentTab)
    const indicatorLeft =
      sumBy(
        data.slice(0, currentTabIdx).map(ele => itemLayoutMap[ele.key]),
        layout => (layout ? layout.width + layout.x * 2 : 0)
      ) +
      (itemLayoutMap[currentTab] || { x: 0 }).x +
      (itemLayoutMap[currentTab] || { width: 0 }).width / 2

    this.scrollViewRef.current.scrollTo({
      x: indicatorLeft > windowWidth / 2 ? indicatorLeft - windowWidth / 2 : 0,
    })
  }

  render() {
    const { data, currentTab, onTabChange } = this.props
    const { itemLayoutMap } = this.state

    const currentTabIdx = data.findIndex(tab => tab.key === currentTab)
    const indicatorWidth =
      (itemLayoutMap[currentTab] || { width: 0 }).width * 0.5
    const indicatorLeft =
      sumBy(
        data.slice(0, currentTabIdx).map(ele => itemLayoutMap[ele.key]),
        layout => (layout ? layout.width + layout.x * 2 : 0)
      ) +
      (itemLayoutMap[currentTab] || { x: 0 }).x +
      indicatorWidth * 0.5

    const indicatorAnimatedL = Animated.timing(
      new Animated.Value(indicatorLeft),
      {
        toValue: indicatorLeft,
        duration: 150,
        easing: Easing.in(Easing.linear),
      }
    ).start()

    return (
      <ScrollView
        style={styles.container}
        horizontal
        automaticallyAdjustContentInsets
        showsHorizontalScrollIndicator={false}
        ref={this.scrollViewRef}
      >
        {data.map(({ key, label }) => (
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
        ))}
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
    )
  }
}
