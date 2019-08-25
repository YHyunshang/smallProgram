import * as React from 'react'
import styles from './ProductListWithFilter.styles'
import { ProductServices } from '@services'
import { FlatList, View } from 'react-native'
import ProductFilter from './ProductFilter'
import ProductListItem from '@components/business/Content/ProductListItem'

interface Props {
  shopCode: string
  categoryCode: string
}

enum OrderType {
  ASC = 'asc',
  DESC = 'desc',
}

interface State {
  hasStorage: boolean
  orderFiled: string
  orderType: OrderType
  productList: {}[]
  page: number
  pageSize: number
}

export default class ProductListWithFilter extends React.Component<
  Props,
  State
> {
  state = {
    hasStorage: true,
    orderFiled: 'price',
    orderType: OrderType.ASC,
    productList: [],
    page: 1,
    pageSize: 30,
  }

  componentDidMount() {
    this.requestProductList()
  }

  requestProductList = async () => {
    const { shopCode, categoryCode } = this.props
    const { hasStorage, orderType, page, pageSize } = this.state
    const { page: pageResult } = await ProductServices.queryProductList(
      shopCode,
      categoryCode,
      hasStorage ? '1' : '0',
      'price',
      orderType.toUpperCase(),
      page,
      pageSize
    )
    this.setState(({ productList }) => ({
      productList: [
        ...productList,
        ...pageResult.result.map(this.formateProductData),
      ],
    }))
  }

  formateProductData = data => {
    const currentPrice = Math.min(
      Math.min(data.price || 0, data.promotionPrice || Infinity)
    )
    const slashedPrice = currentPrice < (data.price || 0) ? data.price : 0

    return {
      code: data.productCode,
      thumbnail: data.mainUrl.url,
      name: data.productName,
      tag: '',
      spec: data.productSpecific,
      price: currentPrice,
      slashedPrice,
      count: data.productNum,
    }
  }

  onFilterChange = data =>
    this.setState({
      hasStorage: data.hasStorage,
      orderType: data.priceSorter,
    })

  renderFlatItem = ({ item }) =>
    item.code === '$$filter' ? (
      <ProductFilter
        filters={{
          hasStorage: this.state.hasStorage,
          priceSorter: this.state.orderType,
        }}
        onFilterChange={this.onFilterChange}
      />
    ) : (
      <View style={styles.productBox}>
        <ProductListItem {...item} />
        <View style={styles.divider}></View>
      </View>
    )

  render() {
    const { productList } = this.state
    const flatListData = [{ code: '$$filter' }, ...productList]
    return (
      <FlatList
        data={flatListData}
        renderItem={this.renderFlatItem}
        keyExtractor={item => item.code}
        stickyHeaderIndices={[0]}
      />
    )
  }
}
