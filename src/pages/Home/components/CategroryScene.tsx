import * as React from 'react'
import ProductFilter from './ProductFilter'
import { Product } from '@components/business/Content/typings'
import Box, { Column as BoxColumn } from '@components/business/Content/Box'
import {
  View,
  FlatList,
  Animated,
  ScrollView,
  RefreshControl,
} from 'react-native'
import ProductListItem from '@components/business/Content/ProductListItem'
import { Native } from '@utils'
import { TabHeight } from './TabBar'
import theme from '@theme'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const PlaceholderForNativeHeight = Native.getStatusBarHeight() + 86 + TabHeight

interface Props {
  loading: boolean
  categories: BoxColumn[]
  productFilter: {}
  products: Product[]
  offsetY: Animated.Value
  onScroll: (e: Event) => any
  onProductFilterChange: (...any) => any
  onRefresh: () => any
}

export default class CategoryScene extends React.PureComponent<Props> {
  renderFloor = ({ item }) => (
    <View
      style={{ backgroundColor: '#fff', padding: 15, position: 'relative' }}
    >
      <ProductListItem {...item} disableSync />
    </View>
  )

  renderSeparator = () => (
    <View style={{ paddingHorizontal: 15 }}>
      <View style={{ height: 0.5, backgroundColor: '#EEEEEE' }} />
    </View>
  )

  render() {
    const {
      loading,
      categories,
      productFilter,
      products,
      offsetY,
      onScroll,
      onProductFilterChange,
      onRefresh,
    } = this.props

    const onContentScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: offsetY } } }],
      { listener: onScroll, useNativeDriver: true }
    )

    const boxTranslateY = offsetY.interpolate({
      inputRange: [
        0,
        PlaceholderForNativeHeight -
          40 +
          (categories.length > 5
            ? 74 * 2 + 20
            : categories.length > 0
            ? 74
            : 0),
      ],
      outputRange: [
        0,
        -(
          PlaceholderForNativeHeight -
          40 +
          (categories.length > 5 ? 74 * 2 + 20 : categories.length > 0 ? 74 : 0)
        ),
      ],
      extrapolate: 'clamp',
    })

    return (
      <View
        style={{ backgroundColor: '#FAFAFA', position: 'relative', flex: 1 }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: 1,
            backgroundColor: '#FAFAFA',
            transform: [{ translateY: boxTranslateY }],
          }}
        >
          <View
            style={{
              paddingVertical: 25,
              marginBottom: 10,
              backgroundColor: '#FFF',
              marginTop: PlaceholderForNativeHeight,
            }}
          >
            <Box data={categories} columnNumber={5} />
          </View>

          <View
            style={{
              backgroundColor: '#FFF',
              flexShrink: 0,
            }}
          >
            <ProductFilter
              filters={{
                storage: productFilter.inventoryFilter,
                priceSorter: productFilter.orderType,
              }}
              onFilterChange={onProductFilterChange}
            />
          </View>
        </Animated.View>

        <AnimatedFlatList
          style={{ flex: 1 }}
          ListHeaderComponent={
            <View
              style={{
                height:
                  PlaceholderForNativeHeight +
                  102 +
                  (categories.length > 5
                    ? 74 * 2 + 20
                    : categories.length > 0
                    ? 74
                    : 0),
              }}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={!!loading}
              onRefresh={onRefresh}
              colors={[theme.primary, theme.white]}
              tintColor={theme.primary}
            />
          }
          ItemSeparatorComponent={this.renderSeparator}
          data={products}
          keyExtractor={item => item.code}
          renderItem={this.renderFloor}
          windowSize={3}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          showsVerticalScrollIndicator={false}
          onScroll={onContentScroll}
        />
      </View>
    )
  }
}
