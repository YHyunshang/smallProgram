import * as React from 'react'
import { FlatList, Animated, View, RefreshControl } from 'react-native'
import theme from '@theme'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

interface Props {
  loading: boolean
  data: { [index: string]: any }[]
  offsetY: Animated.Value
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
  offsetY,
  onScroll,
  contentOffset,
  loading,
  onRefresh,
}: Props) {
  const onContentScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: offsetY } } }],
    { listener: onScroll, useNativeDriver: true }
  )
  return (
    <AnimatedFlatList
      data={data}
      renderItem={renderCMSFloor}
      keyExtractor={item => `${item.key}`}
      onScroll={onContentScroll}
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
        />
      }
    />
  )
}

export default React.memo(CMSScene)
