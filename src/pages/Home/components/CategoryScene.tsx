import * as React from 'react'
import ProductFilter from './ProductFilter'
import { Product } from '@common/typings'
import Box, { Column as BoxColumn } from '@components/business/Content/Box'
import {
  Animated,
  FlatList,
  Platform,
  RefreshControl,
  View,
} from 'react-native'
import ProductListItem from '@components/business/Content/ProductListItem'
import {
  NativePlaceHeightMax,
  TabHeight,
  NativePlaceHeightMin,
  NativePlaceHeightDelta as HeaderHeightRange,
} from '../utils'
import theme from '@theme'
import isEqual from 'lodash/isEqual'
import ProductLimitTimeBuy from '@components/business/ProductLimitTimeBuy'
import SceneFooter from './SceneFooter'
import memorize from 'memoize-one'
import { isiOS } from '@utils/native'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const HeaderHeightMax = NativePlaceHeightMax + TabHeight
const HeaderHeightMin = NativePlaceHeightMin + TabHeight

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
      {!props.isLimitTimeBuy ? (
        <ProductListItem {...props} disableSync />
      ) : (
        <ProductLimitTimeBuy {...props} thumbnailSize={100} />
      )}
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
  static defaultProps = {
    categories: [],
    products: [],
  }

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

  calcFlatData = memorize(
    (categories, filter, products) =>
      categories.length > 0 || products.length > 0
        ? [
            { key: 'category', type: 'category', data: categories },
            { key: 'filter', type: 'filter', data: filter },
            ...(products || []).map(ele => ({
              key: ele.code,
              type: 'product',
              data: ele,
            })),
          ]
        : [],
    isEqual
  )

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

    const flatData = this.calcFlatData(categories, filter, products)

    const categoryFloorHeight = this.calcCategoryFloorHeight()
    const floatFilterOpacity = isiOS
      ? animatedVal.interpolate({
          inputRange: [categoryFloorHeight, categoryFloorHeight + 0.1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : animatedVal.interpolate({
          inputRange: [
            categoryFloorHeight + HeaderHeightRange,
            categoryFloorHeight + HeaderHeightRange + 0.1,
          ],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
    const floatFilterTranslateY = animatedVal.interpolate({
      inputRange: [0, HeaderHeightRange],
      outputRange: [HeaderHeightMax, HeaderHeightMin],
      extrapolate: 'clamp',
    })

    let body = null
    if (Platform.OS === 'ios') {
      const translateY = animatedVal.interpolate({
        inputRange: [-100, 1, 50],
        outputRange: [HeaderHeightMax, HeaderHeightMax, 0],
        extrapolate: 'clamp',
      })

      body = (
        <AnimatedFlatList
          style={{ flex: 1, transform: [{ translateY }] }}
          refreshControl={
            <RefreshControl
              refreshing={!!loading}
              onRefresh={onRefresh}
              colors={[theme.refreshColor]}
              tintColor={theme.refreshColor}
            />
          }
          ItemSeparatorComponent={this.renderSeparator}
          data={flatData}
          renderItem={this.renderFloor}
          windowSize={3}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          showsVerticalScrollIndicator={false}
          onScroll={flatData.length === 0 || loading ? undefined : onScroll}
          scrollEventThrottle={16}
          ListFooterComponent={flatData.length === 0 ? null : <SceneFooter />}
        />
      )
    } else {
      body = (
        <AnimatedFlatList
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={!!loading}
              onRefresh={onRefresh}
              colors={[theme.refreshColor]}
              tintColor={theme.refreshColor}
              progressViewOffset={HeaderHeightMax}
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
          scrollEventThrottle={16}
          ListHeaderComponent={<View style={{ height: HeaderHeightMax }} />}
          ListFooterComponent={flatData.length === 0 ? null : <SceneFooter />}
        />
      )
    }

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

        {body}
      </View>
    )
  }
}
