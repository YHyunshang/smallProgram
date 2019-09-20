import * as React from 'react'
import { FlatList, Animated, View } from 'react-native'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

interface Props {
  data: { [index: string]: any }[]
  offsetY: Animated.Value
  contentOffset: number
  onScroll: (e: Event) => any
}

const renderCMSFloor = ({ item: { wrapperStyle, component: Comp, props } }) => (
  <View style={wrapperStyle}>
    <Comp {...props} />
  </View>
)

function CMSScene({ data, offsetY, onScroll, contentOffset }: Props) {
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
    />
  )
}

export default React.memo(CMSScene)
