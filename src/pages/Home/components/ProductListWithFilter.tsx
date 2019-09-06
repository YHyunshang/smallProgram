import * as React from 'react'
import styles from './ProductListWithFilter.styles'
import { ProductServices } from '@services'
import { FlatList, View } from 'react-native'
import ProductFilter, {
  StorageChoices,
  Sort,
  sort2String,
} from './ProductFilter'
import ProductListItem from '@components/business/Content/ProductListItem'

interface Props {
  shopCode: string
  categoryCode: string
}

interface State {
  storeFilter: StorageChoices
  orderFiled: string
  orderType: Sort
  productList: {}[]
  page: number
  pageSize: number
}

export default class ProductListWithFilter extends React.Component<
  Props,
  State
> {
  state = {
    storeFilter: StorageChoices.InStore,
    orderFiled: 'price',
    orderType: Sort.ASC,
    productList: [],
    page: 1,
    pageSize: 30,
  }

  componentDidMount() {
    this.requestProductList()
  }

  requestProductList = async () => {
    const { shopCode, categoryCode } = this.props
    const { storeFilter, orderType, page, pageSize } = this.state
    const { page: pageResult } = await ProductServices.queryProductList(
      shopCode,
      categoryCode,
      storeFilter === StorageChoices.InStore ? '1' : '0',
      'price',
      sort2String(orderType),
      page,
      pageSize
    )
    this.setState({
      productList: pageResult.result.map(this.formateProductData),
    })
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
      desc: data.subTitle,
      priceTags: [],
      productTags: [],
      spec: data.productSpecific,
      price: currentPrice,
      slashedPrice,
      count: data.productNum,
      shopCode: this.props.shopCode,
      inventoryLabel: data.inventoryLabel,
    }
  }

  onFilterChange = data => {
    this.setState(
      {
        storeFilter: data.storage,
        orderType: data.priceSorter,
      },
      this.requestProductList
    )
  }

  renderFlatItem = ({ item }) =>
    item.code === '$$filter' ? (
      <ProductFilter
        filters={{
          storage: this.state.storeFilter,
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
