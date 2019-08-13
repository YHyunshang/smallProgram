/*
 * @Author: 李华良
 * @Date: 2019-08-02 16:31:42
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-08-05 16:07:21
 */
import * as React from 'react'
import { FlatList } from 'react-native'
import TopTabFloor from './TopTabFloor'
import BannerFloor from './BannerFloor'
import BoxFloor from './BoxFloor'
import AdSingleFloor from './AdSingleFloor'
import Ad1v2Floor from './Ad1v2Floor'
import DividerFloor from './DividerFloor'
import ProductListFloor from './ProductListFloor'
import ProductGridFloor from './ProductGridFloor'
import ProductScrollFloor from './ProductScrollFloor'
import styles from './CMS.styles'

interface CMSProps {
  loading: boolean // 数据是否加载中
  tabData: any[] // tab 数据
  floorData: any[] // CMS 楼层数据
  onTabSelect: Function // tab 选择变化
  currentTabId: string | number // 当前选中 tab id
  isActivity: boolean // 是否是活动页
  onRefresh: () => void // 刷新回调
}

const floorItemRender = ({
  item: { id, type, subType, templateDetailVOList: tplDetailData, img },
}) =>
  type === 1 ? (
    <BannerFloor data={tplDetailData} key={id} /> // 1: banner floor
  ) : type === 2 ? ( // 2: img-ad floor
    subType === 1 ? ( // 1v2 img add floor
      <AdSingleFloor
        key={id}
        image={tplDetailData[0].imgUrl}
        link={{ type: tplDetailData[0].linkType, uri: tplDetailData[0].link }}
      />
    ) : subType === 2 ? (
      <Ad1v2Floor key={id} data={tplDetailData} /> // 1 line img add floor
    ) : (
      <AdSingleFloor
        key={id}
        image={tplDetailData[0].imgUrl}
        link={{ type: tplDetailData[0].linkType, uri: tplDetailData[0].link }}
      />
    )
  ) : type === 3 ? ( // 3: product floor
    subType === 1 ? (
      <ProductListFloor data={tplDetailData} /> // product list floor
    ) : subType === 2 ? (
      <ProductGridFloor key={id} data={tplDetailData} columnNum={2} /> // product 2xn floor
    ) : subType === 3 ? (
      <ProductGridFloor key={id} data={tplDetailData} columnNum={3} /> // product 3xn floor
    ) : subType === 4 ? (
      <ProductScrollFloor key={id} data={tplDetailData} /> // product scroll floor
    ) : (
      <ProductListFloor data={tplDetailData} /> // product list floor
    )
  ) : type === 4 ? ( // 4: category floor
    subType === 1 ? (
      <BoxFloor data={tplDetailData} countPerLine={4} key={id} /> // 4 per row
    ) : subType === 2 ? (
      <BoxFloor data={tplDetailData} countPerLine={5} key={id} /> // 5 per row
    ) : (
      <BoxFloor data={tplDetailData} countPerLine={4} key={id} /> // 4 per row
    )
  ) : type === 5 ? (
    <DividerFloor key={id} image={img} /> // divider floor
  ) : null

// const flatListEmpty = <View />

export default function CMS({
  loading,
  tabData,
  floorData,
  onTabSelect,
  currentTabId,
  isActivity,
  onRefresh,
}: CMSProps) {
  const flatListHeader = tabData.length > 0 && (
    <TopTabFloor
      data={tabData}
      onTabSelect={onTabSelect}
      currentActiveTabId={currentTabId}
      isHeaderCollapsed={isActivity}
    />
  )
  return (
    <FlatList
      style={styles.container}
      data={floorData}
      ListHeaderComponent={flatListHeader}
      // ListEmptyComponent={flatListEmpty}
      horizontal={false}
      refreshing={loading}
      onRefresh={onRefresh}
      keyExtractor={item => `${item.id}`}
      renderItem={floorItemRender}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  )
}
