import * as React from 'react'
import {FlatList, Animated, View, RefreshControl, Platform} from 'react-native'
import theme from '@theme'
import { Native } from '@utils'
import { TabHeight } from './TabBar'
import SceneFooter from "./SceneFooter"

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

interface Props {
  loading: boolean
  data: { [index: string]: any }[]
  contentOffset: number
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
  contentOffset,
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
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={!!loading}
          onRefresh={onRefresh}
          colors={[theme.primary, theme.white]}
          tintColor={theme.primary}
          progressViewOffset={contentOffset}
        />
      }
      ListHeaderComponent={<View style={{height: contentOffset}}/>}
      ListFooterComponent={data.length > 0 ? <SceneFooter/> : null}
    />
  }

  const translateY = animatedVal.interpolate({
    inputRange: [-100, 1, 50],
    outputRange: [
      contentOffset,
      contentOffset,
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
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={!!loading}
          onRefresh={onRefresh}
          colors={[theme.primary, theme.white]}
          tintColor={theme.primary}
        />
      }
      ListFooterComponent={data.length > 0 ? <SceneFooter /> : null}
    />
  )
}

export default React.memo(CMSScene)
