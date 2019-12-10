/*
 * @Descripttion: 潮物达人组件
 * @Author: yuwen.liu
 * @Date: 2019-11-21 11:23:19
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-12-10 10:25:06
 */
import * as React from 'react'
import { FlatList, View, Alert } from 'react-native'
import styles from './TideManActivity.styles'
import { CMSServices } from '@services'
import useTheme from '@components/business/Content/ProductGrid.styles'
import ProductListItem from '@components/business/Content/ProductListItem'
import ProductGridItem from '@components/business/Content/ProductGridItem'
import chunk from 'lodash/chunk'
import TopTab from './TopTab'
import LeftTab from './LeftTab'
import Empty from '../Empty'
import Loading from '@components/common/Loading'
interface Props {
  tabVos: {
    id: number
    tabName: string
    showBar: boolean
    subType: number
    categoryList: {
      categoryCode: string
      categoryName: string
    }[]
    tabDetailVOList: {
      categoryCode: string
    }[]
  }[]
  shopCode: string
  afterModifyCount: Function
  requestTabList: Function
}

export default function TideManActivity({
  tabVos,
  afterModifyCount,
  requestTabList,
  shopCode,
}: Props) {
  const products = tabVos[0].tabDetailVOList.map(ele => ({
    ...CMSServices.formatProduct(ele),
    disableSync: true,
    shopCode,
  }))
  const showBar = tabVos[0].showBar || false //是否展示左边侧栏
  const topTabList =
    tabVos && tabVos.map(tab => ({ key: tab.id, label: tab.tabName })) //顶部tab栏数据
  const initLeftTabList = tabVos[0].categoryList //初始化左边tab栏的数据
  const [currentTopTabKey, setCurrentTopTabKey] = React.useState(tabVos[0].id) //初始化顶部tab栏的当前选中的项，以及设置选中项的方法
  const [currentLeftTabKey, setCurrentLeftTabKey] = React.useState(
    initLeftTabList[0] ? initLeftTabList[0].categoryCode : 'all'
  ) //初始化右边tab栏的当前选中的项，以及设置选中项的方法
  const [leftTabList, setLeftTabList] = React.useState(initLeftTabList) //初始化左侧tab栏的数据列表
  const [currentShowBar, setCurrentShowBar] = React.useState(
    tabVos[0].subType === 3 ? false : showBar
  ) //初始化是否展示左侧分栏
  const [currentColumnNumber, setCurrentColumnNumber] = React.useState(
    tabVos[0].subType || 1
  ) //初始化一行展示的列数
  const [tabDetailVOList, setTabDetailVOList] = React.useState(
    tabVos[0].tabDetailVOList
  ) //初始化tabDetailVOList数据
  const [initProducts, setInitProducts] = React.useState(products) //商品的原始数据
  const [currentProducts, setCurrentProducts] = React.useState(initProducts) //当前选中的tab下的商品数据
  const total = currentProducts.length
  const gridProducts = chunk(currentProducts, currentColumnNumber)
  const theme = { 2: '2x', 3: '3x' }[currentColumnNumber]
  const themeStyles = useTheme(theme || '2x')
  const gridTotal = gridProducts.length

  /** @msg: 根据tabId和categoryCode来查找左侧分栏的商品数据
   * @param {categoryCode,tabId}
   */
  const getDataByCategory = async (categoryCode, tabId) => {
    this.loading.showLoading()
    let res
    try {
      res = await CMSServices.getDataByCategory(categoryCode, tabId, shopCode)
    } finally {
      this.loading.hideLoading()
    }
    const { result } = res
    const products =
      result &&
      result.map(ele => ({
        ...CMSServices.formatProduct(ele),
        disableSync: true,
        shopCode,
      }))
    setCurrentProducts(products)
  }
  /** @msg: 过滤左边tab栏的数据
   * @param {id}
   */
  const leftTabListFilter = id =>
    tabVos && tabVos.filter(item => item.id === id)
  /** @msg: 过滤左边tab栏对应的商品数据
   * @param {categoryCode}
   */
  const productsFilter = categoryCode =>
    tabDetailVOList
      .filter(
        item =>
          item.categoryCode && item.categoryCode.indexOf(categoryCode) != -1
      )
      .map(ele => ({
        ...CMSServices.formatProduct(ele),
        disableSync: true,
        shopCode,
      }))

  /** @msg: 顶部tab栏item改变触发的事件
   * @param {key}
   */
  const onTopTabChange = key => {
    const newLeftTabList = leftTabListFilter(key)
    setCurrentTopTabKey(key)
    setLeftTabList(newLeftTabList[0].categoryList)
    setCurrentLeftTabKey(
      newLeftTabList[0].categoryList[0]
        ? newLeftTabList[0].categoryList[0].categoryCode
        : 'all'
    )
    setCurrentShowBar(
      newLeftTabList[0].subType === 3 ? false : newLeftTabList[0].showBar
    )
    setCurrentColumnNumber(newLeftTabList[0].subType)
    setTabDetailVOList(newLeftTabList[0].tabDetailVOList)
    const newInitProducts = newLeftTabList[0].tabDetailVOList.map(ele => ({
      ...CMSServices.formatProduct(ele),
      disableSync: true,
      shopCode,
    }))
    setInitProducts(newInitProducts)
    setCurrentProducts(newInitProducts)
    requestTabList()
  }

  /** @msg: 左边tab栏item改变触发的事件
   * @param {code,index}
   */
  const onLeftTabChange = (code, index) => {
    setCurrentLeftTabKey(code)
    getDataByCategory(code, currentTopTabKey)
    // const newCurrentProducts = productsFilter(code)
    // if (index === 0) {
    //   setCurrentProducts(initProducts)
    // } else {
    //   setCurrentProducts(newCurrentProducts)
    // }
  }

  /**
   * @msg: 渲染每行的数据
   */
  const renderGridItemData = products =>
    products.map((product, colIdx) => (
      <View
        style={[
          currentShowBar ? styles.noBar : themeStyles.column,
          colIdx % currentColumnNumber < currentColumnNumber - 1 &&
            themeStyles.columnNotLast,
        ]}
        key={product.code}
      >
        <View style={[themeStyles.productBox]}>
          <ProductGridItem
            {...product}
            theme={theme}
            afterModifyCount={afterModifyCount}
          />
        </View>
      </View>
    ))

  const _keyExtractor = (item, index) => item.id

  /**
   * @msg: FlatList渲染的数据项
   */
  const renderItemData = ({ item, index }) =>
    currentColumnNumber === 1 ? (
      <View style={styles.productBox}>
        <View style={styles.productWrapper} key={item.code}>
          <ProductListItem {...item} afterModifyCount={afterModifyCount} />
          {index < total - 1 && <View style={styles.fakeBorder}></View>}
        </View>
      </View>
    ) : (
      <View
        style={[
          themeStyles.container,
          currentColumnNumber === 2 && styles.gridWrapper,
        ]}
      >
        <View
          style={[
            themeStyles.row,
            index < gridTotal - 1 && themeStyles.rowNotLast,
          ]}
          key={index}
        >
          {renderGridItemData(item)}
        </View>
      </View>
    )
  return (
    <View style={styles.tideMancontainer}>
      {topTabList && topTabList.length > 0 && (
        <TopTab
          currentActive={currentTopTabKey}
          data={topTabList}
          onTabChange={onTopTabChange}
        />
      )}
      <View style={styles.centerWrapper}>
        {currentShowBar &&
          currentColumnNumber !== 3 &&
          leftTabList &&
          leftTabList.length > 0 && (
            <LeftTab
              currentActive={currentLeftTabKey}
              data={leftTabList}
              onTabChange={onLeftTabChange}
            />
          )}
        <FlatList
          style={[
            styles.tideManList,
            currentColumnNumber === 2 && styles.gridWrapper,
          ]}
          data={currentColumnNumber === 1 ? currentProducts : gridProducts}
          renderItem={renderItemData}
          keyExtractor={_keyExtractor}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          refreshing={false}
          ListEmptyComponent={
            <Empty type={2} textColor1="#4A4A4A" textColor2="#A4A4B4" />
          }
        />
      </View>

      <Loading ref={ref => (this.loading = ref)}></Loading>
    </View>
  )
}