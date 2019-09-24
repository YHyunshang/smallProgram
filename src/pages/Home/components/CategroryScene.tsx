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
import { number } from 'prop-types'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const PlaceholderForNativeHeight = Native.getStatusBarHeight() + 86 + TabHeight
console.log('PlaceholderForNativeHeight', PlaceholderForNativeHeight)

const CategoryFloor = React.memo(
  props => (
    <View
      style={{
        paddingVertical: 25,
        marginBottom: 10,
        backgroundColor: '#FFF',
        marginTop: PlaceholderForNativeHeight,
      }}
    >
      <Box {...props} />
    </View>
  ),
  (pre, next) => pre === next
)

const FilterFloor = React.memo(props => (
  <View
    style={{
      backgroundColor: '#FFF',
      flexShrink: 0,
    }}
  >
    <ProductFilter {...props} />
  </View>
))

const ProductFloor = React.memo(props => (
  <View style={{ backgroundColor: '#fff', padding: 15, position: 'relative' }}>
    <ProductListItem {...props} disableSync />
  </View>
))

interface Props {
  loading: boolean
  categories: BoxColumn[]
  productFilter: {}
  products: Product[]
  animatedVal: Animated.Value
  onScroll?: (e: Event) => any
  onProductFilterChange: (...any) => any
  onRefresh: () => any
}

interface State {
  animatedValRefContentOffsetY: Animated.Value
}

export default class CategoryScene extends React.PureComponent<Props> {
  state = {
    animatedValRefContentOffsetY: new Animated.Value(0),
  }

  flatListRef = React.createRef<AnimatedFlatList>()

  componentDidUpdate() {
    console.log(this.flatListRef.current.getNode())
  }

  renderFloor = ({ item: { type, data } }) => {
    switch (type) {
      case 'category':
        return <CategoryFloor data={data} columnNumber={5} />
      case 'filter':
        return (
          <FilterFloor
            filters={{
              storage: data.inventoryFilter,
              priceSorter: data.orderType,
            }}
            onFilterChange={this.props.onProductFilterChange}
          />
        )
      case 'product':
        return (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 15,
              position: 'relative',
            }}
          >
            <ProductListItem {...data} disableSync />
          </View>
        )
    }
  }

  renderSeparator = () => (
    <View style={{ paddingHorizontal: 15 }}>
      <View style={{ height: 0.5, backgroundColor: '#EEEEEE' }} />
    </View>
  )

  onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: this.state.animatedValRefContentOffsetY },
        },
      },
    ],
    {
      listener: this.props.onScroll,
      useNativeDriver: true,
    }
  )
  render() {
    const {
      loading,
      categories,
      productFilter,
      products,
      onProductFilterChange,
      onRefresh,
      animatedVal,
    } = this.props

    const { animatedValRefContentOffsetY } = this.state

    const boxTranslateY = animatedVal.interpolate({
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
          35 +
          (categories.length > 5 ? 74 * 2 + 20 : categories.length > 0 ? 74 : 0)
        ),
      ],
      extrapolate: 'clamp',
    })

    const flatData = [
      { key: 'category', type: 'category', data: categories },
      { key: 'filter', type: 'filter', data: productFilter },
      ...(products || []).map(ele => ({
        key: ele.code,
        type: 'product',
        data: ele,
      })),
    ]

    return (
      <View style={{ backgroundColor: '#FAFAFA', flex: 1 }}>
        <AnimatedFlatList
          ref={this.flatListRef}
          stickyHeaderIndices={[1]}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={!!loading}
              onRefresh={onRefresh}
              colors={[theme.primary, theme.white]}
              tintColor={theme.primary}
              progressViewOffset={PlaceholderForNativeHeight}
            />
          }
          ItemSeparatorComponent={this.renderSeparator}
          data={flatData}
          renderItem={this.renderFloor}
          windowSize={3}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          showsVerticalScrollIndicator={false}
          onScroll={this.props.onScroll}
        />
      </View>
    )
  }
}
