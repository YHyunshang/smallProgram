import * as React from 'react'
import {FlatList, Animated, View, RefreshControl, Platform} from 'react-native'
import theme from '@theme'
import SceneFooter from "./SceneFooter"
import {PlaceholderForNativeHeight} from "../utils";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

interface Props {
  loading: boolean
  data: { [index: string]: any }[]
  isFullscreen: boolean
  animatedVal: Animated.Value
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
  isFullscreen,
  animatedVal,
  loading,
  onRefresh,
}: Props) {
  if (Platform.OS === 'android') {
    return <AnimatedFlatList
      style={{flex: 1}}
      data={data}
      renderItem={renderCMSFloor}
      keyExtractor={item => `${item.key}`}
      onScroll={onScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={!!loading}
          onRefresh={onRefresh}
          colors={[ theme.refreshColor ]}
          progressViewOffset={PlaceholderForNativeHeight}
        />
      }
      ListHeaderComponent={<View style={{height: isFullscreen ? 0 : PlaceholderForNativeHeight}}/>}
      ListFooterComponent={data.length > 0 ? <SceneFooter/> : null}
    />
  }

  const translateY = animatedVal.interpolate({
    inputRange: [-100, 1, 50],
    outputRange: [
      isFullscreen ? 0 : PlaceholderForNativeHeight,
      isFullscreen ? 0 : PlaceholderForNativeHeight,
      0,
    ],
    extrapolate: 'clamp',
  })
  return (
    <AnimatedFlatList
      style={{ flex: 1, transform: [{ translateY }] }}
      data={data}
      renderItem={renderCMSFloor}
      keyExtractor={item => `${item.key}`}
      onScroll={(data.length === 0 || loading) ? undefined :onScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={!!loading}
          onRefresh={onRefresh}
          tintColor={theme.refreshColor}
        />
      }
      ListFooterComponent={data.length > 0 ? <SceneFooter /> : null}
    />
  )
}

export default React.memo(CMSScene)
