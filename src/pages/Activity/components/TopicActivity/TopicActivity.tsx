/*
 * @Descripttion: 专题活动组件(潮物达人&酒专题)
 * @Author: yuwen.liu
 * @Date: 2019-11-21 11:23:19
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-09 13:45:09
 */
import * as React from 'react'
import { FlatList, View } from 'react-native'
import styles from './TopicActivity.styles'
import { CMSServices } from '@services'
import useTheme from '@components/business/Content/ProductGrid.styles'
import ProductListItem from '@components/business/Content/ProductListItem'
import ProductGridItem from '@components/business/Content/ProductGridItem'
import TopTab from './TopTab'
import LeftTab from './LeftTab'
import Empty from '../Empty'
interface Props {
  currentTabVos: {
    id: number
    tabName: string //顶部tab栏名称
    showBar: boolean //是否展示左边侧栏
    subType: number //一行展示几列
    categoryList: {
      categoryCode: string //分类编码
      categoryName: string //分类名称
    }[]
    tabDetailVOList: {
      code: string
      productNum: number //商品数量
      categoryCode: string
    }[]
  }[]
  shopCode: string //门店编码
  type: number //类型 8:潮物达人,9:酒专题
  afterModifyCount: Function // 操作购物车数量的回调函数
}

export default function TopicActivity({
  currentTabVos,
  afterModifyCount,
  shopCode,
  type,
}: Props) {
  /** @msg: 过滤左边tab栏对应的商品数据
   * @param {categoryCode}
   */
  const productsFilter = (currenProductList, categoryCode) =>
    currenProductList
      .filter(
        item =>
          item.categoryCode && item.categoryCode.indexOf(categoryCode) != -1
      )
      .map(ele => ({
        ...CMSServices.formatProduct(ele),
        disableSync: true,
        shopCode,
      }))
  const [tabVos, setTabVos] = React.useState(currentTabVos)
  const products = tabVos[0].tabDetailVOList.map(ele => ({
    ...CMSServices.formatProduct(ele),
    disableSync: true,
    shopCode,
  }))
  const showBar = type === 9 ? true : tabVos[0].showBar || false // 是否展示左边侧栏，酒专题侧边栏必现
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
  const initFirstTabProduct = productsFilter(tabDetailVOList, currentLeftTabKey) // 获取左边侧栏第一个tab的商品数据
  const [initProducts, setInitProducts] = React.useState(
    type === 8 ? products : initFirstTabProduct //  type:8是潮物达人取全部的商品数据，type:9 酒专题取第一个tab的商品数据
  ) //商品的原始数据
  const [currentProducts, setCurrentProducts] = React.useState(initProducts) //当前选中的tab下的商品数据
  const total = currentProducts.length
  const totalRow = Math.ceil(total / currentColumnNumber)
  const colWidth = `${100 / currentColumnNumber}%`
  const theme = { 2: '2x', 3: '3x' }[currentColumnNumber]
  const themeStyles = useTheme(theme || '2x')
  /** @msg: 过滤左边tab栏的数据
   * @param {id}
   */
  const leftTabListFilter = id =>
    tabVos && tabVos.filter(item => item.id === id)

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
      newLeftTabList[0].subType === 3
        ? false
        : type === 9
        ? true
        : newLeftTabList[0].showBar || false
    )
    setCurrentColumnNumber(newLeftTabList[0].subType)
    setTabDetailVOList(newLeftTabList[0].tabDetailVOList)
    const newInitProducts = newLeftTabList[0].tabDetailVOList.map(ele => ({
      ...CMSServices.formatProduct(ele),
      disableSync: true,
      shopCode,
    }))
    const newInitFirstTabProduct = productsFilter(
      newLeftTabList[0].tabDetailVOList,
      newLeftTabList[0].categoryList[0]
        ? newLeftTabList[0].categoryList[0].categoryCode
        : 'all'
    )
    //type:8是潮物达人取全部的商品数据，type:9 酒专题取第一个tab的商品数据
    const newFirstTabProduct =
      type === 9 && newInitFirstTabProduct.length
        ? newInitFirstTabProduct
        : newInitProducts
    setInitProducts(newFirstTabProduct)
    setCurrentProducts(newFirstTabProduct)
  }

  /** @msg: 左边tab栏item改变触发的事件
   * @param {code,index}
   */
  const onLeftTabChange = (code, index): void => {
    setCurrentLeftTabKey(code)
    const newCurrentProducts = productsFilter(tabDetailVOList, code)
    setCurrentProducts(code === 'all' ? initProducts : newCurrentProducts)
  }

  /** @msg: 当切换tab时刷新购买数量
   * @param {code,index}
   */
  const refreshBuyNum = (productNum, productCode): void => {
    tabVos.map(tab => {
      tab.tabDetailVOList.map(item => {
        if (item.code == productCode) {
          item.productNum = productNum
        }
      })
    })
    setTabVos(tabVos)
    initProducts.map(item => {
      if (item.code == productCode) {
        item.count = productNum
      }
    })
    setInitProducts(initProducts)
  }

  /** @msg: 添加购物车成功时，刷新当前商品项的购买数量以及购物车总数量
   * @param {count,result}
   */
  const refreshProductInfo = (
    count,
    { result: { productNum, productCode } }
  ): void => {
    afterModifyCount(count, productCode)
    refreshBuyNum(productNum, productCode)
  }
  /**
   * @msg: FlatList渲染的数据项
   */
  const renderItemData = ({ item, index }) =>
    currentColumnNumber === 1 ? (
      <View style={styles.productBox}>
        <View style={styles.productWrapper} key={item.code}>
          <ProductListItem {...item} afterModifyCount={refreshProductInfo} />
          {index < total - 1 && <View style={styles.fakeBorder}></View>}
        </View>
      </View>
    ) : (
      <View
        style={[
          Math.floor(index / currentColumnNumber) === 0 && themeStyles.rowFirst,
          Math.floor(index / currentColumnNumber + 1) === totalRow &&
            themeStyles.rowLast,
          themeStyles.col,
          index % currentColumnNumber === 0 && themeStyles.colFirst,
          index % currentColumnNumber === currentColumnNumber - 1 &&
            themeStyles.colLast,
          { width: colWidth },
        ]}
      >
        <View style={themeStyles.productCell}>
          <ProductGridItem
            {...item}
            theme={theme}
            afterModifyCount={refreshProductInfo}
          />
        </View>
      </View>
    )
  /**
   * @msg: 分隔线组件
   */
  const SeparatorComponent = () => <View style={themeStyles.floorSeparator} />
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
          style={[styles.tideManList]}
          data={currentProducts}
          renderItem={renderItemData}
          keyExtractor={(item, index) => index.toString()}
          key={
            currentColumnNumber === 1
              ? 'list'
              : currentColumnNumber === 2
              ? 'grid2x'
              : 'grid3x'
          }
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          numColumns={currentColumnNumber}
          ItemSeparatorComponent={SeparatorComponent}
          refreshing={false}
          ListEmptyComponent={
            <Empty type={2} textColor1="#4A4A4A" textColor2="#A4A4B4" />
          }
        />
      </View>
    </View>
  )
}
