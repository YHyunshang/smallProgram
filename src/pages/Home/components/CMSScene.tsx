import * as React from 'react'
import { FlatList, Animated, View, RefreshControl } from 'react-native'
import theme from '@theme'
import { Native } from '@utils'
import { TabHeight } from './TabBar'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const PlaceholderForNativeHeight = Native.getStatusBarHeight() + 86 + TabHeight

interface Props {
  loading: boolean
  data: { [index: string]: any }[]
  contentOffset: number
  onScroll: (e: Event) => any
  onRefresh: () => any
}

const renderCMSFloor = ({ item: { wrapperStyle, component: Comp, props } }) => (
  <View style={wrapperStyle}>
    <Comp {...props} />
  </View>
)

function CMSScene({
  data,
  onScroll,
  contentOffset,
  loading,
  onRefresh,
}: Props) {
  return (
    <AnimatedFlatList
      style={{ flex: 1 }}
      data={data}
      renderItem={renderCMSFloor}
      keyExtractor={item => `${item.key}`}
      onScroll={onScroll}
      ListHeaderComponent={<View style={{ height: contentOffset }} />}
      windowSize={3}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={!!loading}
          onRefresh={onRefresh}
          colors={[theme.primary, theme.white]}
          tintColor={theme.primary}
          progressViewOffset={PlaceholderForNativeHeight}
        />
      }
    />
  )
}

export default React.memo(CMSScene)
