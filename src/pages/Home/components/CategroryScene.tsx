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
import isEqual from 'lodash/isEqual'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const PlaceholderForNativeHeight = Native.getStatusBarHeight() + 86 + TabHeight

const CategoryFloor = React.memo(
  props => (
    <View
      style={{
        paddingVertical: 25,
        marginBottom: 10,
        backgroundColor: '#FFF',
      }}
    >
      <Box {...props} />
    </View>
  ),
  isEqual
)

const FilterFloor = React.memo(
  props => (
    <View
      style={{
        backgroundColor: '#FFF',
        flexShrink: 0,
      }}
    >
      <ProductFilter {...props} />
    </View>
  ),
  isEqual
)

const ProductFloor = React.memo(
  props => (
    <View
      style={{ backgroundColor: '#fff', padding: 15, position: 'relative' }}
    >
      <ProductListItem {...props} disableSync />
    </View>
  ),
  isEqual
)

interface Props {
  loading: boolean
  categories: BoxColumn[]
  productFilter: {
    [index: string]: string
  }
  products: Product[]
  animatedVal: Animated.Value
  onScroll?: (e: Event) => any
  onProductFilterChange: (...any) => any
  onRefresh: () => any
}

export default class CategoryScene extends React.PureComponent<Props> {
  renderFloor = ({ item: { type, data } }) => {
    const { onProductFilterChange } = this.props
    switch (type) {
      case 'category':
        return <CategoryFloor data={data} columnNumber={5} />
      case 'filter':
        return (
          <FilterFloor filters={data} onFilterChange={onProductFilterChange} />
        )
      case 'product':
        return <ProductFloor {...data} />
    }
  }

  renderSeparator = () => (
    <View style={{ paddingHorizontal: 15 }}>
      <View style={{ height: 0.5, backgroundColor: '#EEEEEE' }} />
    </View>
  )

  calcCategoryFloorHeight = () => {
    const { categories } = this.props
    return 50 + 10 + (categories.length <= 5 ? 74 : 74 * 2 + 20)
  }

  render() {
    const {
      loading,
      categories,
      productFilter,
      products,
      animatedVal,
      onRefresh,
      onScroll,
      onProductFilterChange,
    } = this.props

    const filter = {
      storage: productFilter.inventory,
      priceSorter: productFilter.sortType,
    }

    const flatData = [
      { key: 'category', type: 'category', data: categories },
      { key: 'filter', type: 'filter', data: filter },
      ...(products || []).map(ele => ({
        key: ele.code,
        type: 'product',
        data: ele,
      })),
    ]

    const categoryFloorHeight = this.calcCategoryFloorHeight()
    const floatFilterOpacity =
      (products || []).length > 0
        ? animatedVal.interpolate({
            inputRange: [
              50 + categoryFloorHeight,
              50 + categoryFloorHeight + 0.1,
            ],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 0
    const floatFilterTranslateY = animatedVal.interpolate({
      inputRange: [0, 50],
      outputRange: [
        PlaceholderForNativeHeight,
        PlaceholderForNativeHeight - 50,
      ],
      extrapolate: 'clamp',
    })

    return (
      <View
        style={{
          backgroundColor: '#FAFAFA',
          flex: 1,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 1,
            opacity: floatFilterOpacity,
            transform: [{ translateY: floatFilterTranslateY }],
          }}
        >
          <FilterFloor
            filters={filter}
            onFilterChange={onProductFilterChange}
          />
        </Animated.View>

        <AnimatedFlatList
          contentContainerStyle={{ paddingTop: PlaceholderForNativeHeight }}
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
          onScroll={onScroll}
        />
      </View>
    )
  }
}
