/**
 * Created by 李华良 on 2019-07-23
 */
import * as React from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import styles from './TopTabFloor.styles'

interface Tab {
  code: string
  id: number
  showName: string
}

export interface Props {
  data: Tab[] // 选项列表
  onTabSelect: Function // 选项选中回调
  currentActiveTabId: number | string // 当前激活的选项 id
  isHeaderCollapsed: boolean // 顶部是否折叠
}

class TopTabFloor extends React.Component<Props> {
  scrollView = React.createRef()

  constructor(props: Props) {
    super(props)

    this.state = {
      tabDims: {}, // 每个 tab 的尺寸
    }
  }

  onTabLayout = (tabId, { nativeEvent: { layout } }) => {
    this.setState(({ tabDims }) => ({
      tabDims: { ...tabDims, [tabId]: layout },
    }))
  }

  render() {
    const {
      data,
      currentActiveTabId,
      onTabSelect,
      isHeaderCollapsed,
    } = this.props

    const { tabDims } = this.state

    const total = data.length
    const currentActiveTabIdx = data.findIndex(
      ele => ele.id === currentActiveTabId
    )
    const contentOffset =
      currentActiveTabIdx - 2 >= 0
        ? { x: (tabDims[data[currentActiveTabIdx - 2].id] || { x: 0 }).x, y: 0 }
        : { x: 0, y: 0 }

    return (
      <ScrollView
        horizontal
        style={styles.container}
        contentOffset={contentOffset}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={this.scrollView}
      >
        {data.map((ele, idx) => (
          <React.Fragment key={ele.id}>
            <TouchableOpacity
              onPress={() => onTabSelect(ele)}
              onLayout={e => this.onTabLayout(ele.id, e)}
            >
              <View style={styles.tab}>
                <Text
                  style={[
                    styles.tabText,
                    currentActiveTabId === ele.id ? styles.activeTabText : {},
                    idx === 0 ? styles.firstTab : {},
                    idx === total - 1 ? styles.lastTab : {},
                    isHeaderCollapsed ? styles.tabTextCollapsed : {},
                    isHeaderCollapsed && currentActiveTabId === ele.id
                      ? styles.activeTabTextCollapsed
                      : {},
                  ]}
                >
                  {ele.showName}
                </Text>
                {isHeaderCollapsed && currentActiveTabId === ele.id && (
                  <View style={styles.activeTabFooter} />
                )}
              </View>
            </TouchableOpacity>
            {idx !== total - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </ScrollView>
    )
  }
}

export default TopTabFloor
