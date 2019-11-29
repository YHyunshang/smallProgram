/**
 * Created by 李华良 on 2019-11-26
 */
import * as React from 'react'
import Carousel from "./Carousel";
import PreSaleBar from "./PreSaleBar";
import {Text, View} from "react-native";
import styles from "./PreSale.styles";
import FastImage from "react-native-fast-image";
import {iconBagCircle, iconOrderCircle, productConditions, productPlace, productSpecific} from "@const/resources";
import {ActivityStatus, BaseObj} from "@common/typings";
import {transPenny} from "@utils/FormatUtil";
const dayjs = require('dayjs')

const ts2Str = (ts: number) => dayjs(ts).format('MM月DD日HH:mm')
// 日期字符串转换为中文字符串
const dateStr2CNStr = (date: string) => dayjs(date).format('MM月DD日HH:mm')
// 日期字符串转换为时间戳（毫秒）
const dateStr2Ts = (date: string) => dayjs(date).valueOf()

export interface ProductSectionProps {
  productData: BaseObj
  initialData: BaseObj
  onActivityStatusChange: (status: ActivityStatus) => void
}

const ProductSection: React.FunctionComponent<ProductSectionProps> =
  ({ productData, initialData, onActivityStatusChange }) => {
  const detailData = productData.resChannelStoreProductVO || {}
  const carouselData = productData.productSliderImagesResponseVOList || []
  const preSaleData = productData.resProductAdvanceSaleVO || {}
  const carouselImages = carouselData.filter(ele => ele.fileType === 0).map(ele => ele.url)

  return (
    <View style={styles.container}>
      <Carousel placeholder={initialData.thumbnail} images={carouselImages}/>
      <PreSaleBar
        price={detailData.promotionPrice || detailData.price}
        startTs={dateStr2Ts(preSaleData.activityBeginDate)}
        endTs={dateStr2Ts(preSaleData.activityEndDate)}
        onStatusChange={onActivityStatusChange}
      />

      <View style={[styles.section, styles.mainInfoBox, styles.ph15]}>
        <Text style={styles.h1}>{preSaleData.productName}</Text>
        <Text style={styles.h5}>{preSaleData.activityProductBrief}</Text>

        <View style={styles.preOrderRow}>
          <Text style={styles.normalText}>上市价 ¥{transPenny(preSaleData.onSalePrice)}</Text>
          <Text style={styles.preOrderCountText}>{preSaleData.reserveNumber || 0}人已预订</Text>
        </View>

        <View style={styles.productPropertyRow}>
          {!!detailData.productSpecific && (
            <View style={styles.productPropertyItem}>
              <FastImage style={styles.productPropertyIcon} source={productSpecific}/>
              <Text style={styles.productPropertyText}>{detailData.productSpecific}</Text>
            </View>
          )}
          {/* 保存条件 */}
          {/*{!!detailData && (*/}
          {/*  <View style={styles.productPropertyItem}>*/}
          {/*    <FastImage style={styles.productPropertyIcon} source={productConditions}/>*/}
          {/*    <Text>{'0-4贮存'}</Text>*/}
          {/*  </View>*/}
          {/*)}*/}
          {!!detailData.originPlace && (
            <View style={[styles.productPropertyItem, styles.productPropertyLastItem]}>
              <FastImage style={styles.productPropertyIcon} source={productPlace}/>
              <Text style={styles.productPropertyText}>{detailData.originPlace}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.orderInfoRow}>
          <View style={styles.orderInfoItem}>
            <FastImage style={styles.orderInfoIcon} source={iconOrderCircle}/>
            <View style={styles.orderInfoTextBox}>
              <Text style={styles.orderInfoTitle}>预售下单</Text>
              <Text style={styles.orderInfoText}>
                {dateStr2CNStr(preSaleData.activityBeginDate)}至{dateStr2CNStr(preSaleData.activityEndDate)}
              </Text>
            </View>
          </View>
          <View style={styles.orderInfoItemSeparator}/>
          <View style={styles.orderInfoItem}>
            <FastImage style={styles.orderInfoIcon} source={iconBagCircle}/>
            <View style={styles.orderInfoTextBox}>
              <Text style={styles.orderInfoTitle}>配送/自提</Text>
              <Text style={styles.orderInfoText}>
                {dateStr2CNStr(preSaleData.selfDeliveryBeginTime)}至{dateStr2CNStr(preSaleData.selfDeliveryEndTime)}
              </Text>
            </View>
          </View>
        </View>
        {!!preSaleData.supplementExplain && (
          <View style={[ styles.orderAddOnInfoRow, styles.ph15 ]}>
            <Text style={styles.orderAddOnText}>补充说明：{preSaleData.supplementExplain}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default ProductSection
