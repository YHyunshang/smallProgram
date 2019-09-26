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
  inventory: StorageChoices
  sortField: string
  sortType: Sort
  productList: {}[]
  page: number
  pageSize: number
}

export default class ProductListWithFilter extends React.Component<
  Props,
  State
> {
  state = {
    inventory: StorageChoices.InStore,
    sortField: 'price',
    sortType: Sort.ASC,
    productList: [],
    page: 1,
    pageSize: 30,
  }

  componentDidMount() {
    this.requestProductList()
  }

  requestProductList = async () => {
    const { shopCode, categoryCode } = this.props
    const { inventory, sortField, sortType, page, pageSize } = this.state
    const { page: pageResult } = await ProductServices.queryProductList(
      shopCode,
      categoryCode,
      { [StorageChoices.InStore]: '1', [StorageChoices.All]: '0' }[inventory] ||
        '',
      sortField,
      { [Sort.ASC]: 'ASC', [Sort.DESC]: 'DESC' }[sortType] || '',
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
    const remarks = data.noteContentList || []

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
      remarks,
    }
  }

  onFilterChange = data => {
    this.setState(
      {
        inventory: data.storage,
        sortType: data.priceSorter,
      },
      this.requestProductList
    )
  }

  renderFlatItem = ({ item }) =>
    item.code === '$$filter' ? (
      <ProductFilter
        filters={{
          storage: this.state.inventory,
          priceSorter: this.state.sortType,
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
