import * as React from 'react'
import styles from './ProductListWithFilter.styles'
import {ProductServices} from '@services'
import {FlatList, View} from 'react-native'
import ProductFilter, {Sort, StorageChoices,} from './ProductFilter'
import ProductListItem from '@components/business/Content/ProductListItem'
import ProductLimitTimeBuy from "@components/business/ProductLimitTimeBuy";
import {LimitTimeBuyStatus} from "@components/business/Content/typings";

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
      productList: pageResult.result.map(this.formatProductData),
    })
  }

  formatProductData = (data) => {
    const currentPrice = Math.min(
      Math.min(data.price || 0, data.promotionPrice || Infinity)
    )
    const slashedPrice = currentPrice < (data.price || 0) ? data.price : 0
    const remarks = data.noteContentList || []

    let result = {
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

    if (data.productActivityLabel && data.productActivityLabel.promotionType === 5) {
      const {activityBeginTime, activityEndTime, salesRatio} = data.productActivityLabel
      const start = Number(activityBeginTime)
      const end = Number(activityEndTime)
      const now = Date.now()
      const price = Math.min(currentPrice, data.discountPrice || Infinity)

      const status =
        now < start ? LimitTimeBuyStatus.Pending
          : now < end ? LimitTimeBuyStatus.Progressing
          : LimitTimeBuyStatus.Expired
      if (status === LimitTimeBuyStatus.Progressing) {
        result = {
          ...result,
          isLimitTimeBuy: true,
          inventoryPercentage: !/(\d+(\.\d+)?)%/.test(salesRatio)
            ? 100
            : Number(salesRatio.match(/(\d+(\.\d+)?)%/)[1]),
          status,
          price,
        }
      }
    }
    return result
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
        {!item.isLimitTimeBuy ? <ProductListItem {...item} /> : <ProductLimitTimeBuy {...item} thumbnailSize={100}/> }
        <View style={styles.divider} />
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
