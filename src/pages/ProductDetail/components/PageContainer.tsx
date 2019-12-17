/**
 * Created by 李华良 on 2019-11-26
 */
import * as React from 'react'
import {ScrollView, View} from "react-native";
import memoized from 'memoize-one'
import styles from './PageContainer.styles'
import Header from "./Header";

interface PageContainerProps {
  tabs: string[]
  tabContentRenderer: (tab: string, index:number) => React.ReactNode
  onSharePress: () => void
}

interface PageContainerState {
  tabIndex: number
}

class PageContainer extends React.PureComponent<PageContainerProps, PageContainerState> {
  state = {
    tabIndex: 0
  }

  scrollViewRef = React.createRef<ScrollView>()
  tabSectionLayoutYMap: { [index: number]: number } = {}

  onTabIndexChange = index => {
    this.setState({ tabIndex: index })
    const ref = this.scrollViewRef.current
    // @ts-ignore: method exist
    ref.flashScrollIndicators()
    ref.scrollTo({
      y: this.tabSectionLayoutYMap[index],
      x: 0,
      animated: true
    })
  }

  sortSectionYByIndex = memoized(
    (sectionLayoutYMap: { [index: number]: number }): Array<[number, number]> =>
      Object.entries(sectionLayoutYMap)
        .map(([ sectionIdx, sectionY ]): [number, number] => [ Number(sectionIdx), sectionY ])
        .sort((a, b) => a[0] - b[0])
  )

  onScroll = e => {
    const y = e.nativeEvent.contentOffset.y
    const sortedSectionY = this.sortSectionYByIndex(this.tabSectionLayoutYMap)
    const nextSection = sortedSectionY.find(([secIdx, secY]) => secY > y)
    const nextSectionIdx = nextSection
      ? Math.max(nextSection[0] - 1, 0)
      : (y > 0 && sortedSectionY.length > 0)
        ? sortedSectionY.slice(-1)[0][0]
        : 0
    this.setState({ tabIndex: nextSectionIdx })
  }

  onSectionLayout = (index, e) => {
    this.tabSectionLayoutYMap = {
      ...this.tabSectionLayoutYMap,
      [index]: e.nativeEvent.layout.y,
    }
  }

  renderBody = memoized((tabs: string[], tabContentRenderer: (tab: string, index:number) => React.ReactNode) => (
    <ScrollView
      ref={this.scrollViewRef}
      style={styles.body}
      onScroll={this.onScroll}
      scrollEventThrottle={16}
      removeClippedSubviews={false}
      showsVerticalScrollIndicator={false}
    >
      {tabs.map((ele, index) => (
        <View onLayout={e => this.onSectionLayout(index, e)} key={index}>
          {tabContentRenderer(ele, index)}
        </View>
      ))}
    </ScrollView>
  ))

  render() {
    const { tabs, tabContentRenderer, onSharePress } = this.props
    const { tabIndex } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            index={tabIndex}
            tabs={tabs}
            onIndexChange={this.onTabIndexChange}
            onSharePress={onSharePress}
          />
        </View>

        {this.renderBody(tabs, tabContentRenderer)}
      </View>
    )
  }
}

export default PageContainer
