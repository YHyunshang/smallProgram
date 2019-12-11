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

const ts2Str = (ts: number) => ts ? dayjs(ts).format('MM月DD日HH:mm') : ''
// 日期字符串转换为中文字符串
const datetimeStr2CNStr = (date: string) => date ? dayjs(date).format('MM月DD日HH:mm') : ''
// 日期字符串转换为时间戳（毫秒）
const datetimeStr2Ts = (date: string) => date ? dayjs(date).valueOf() : null
// 日期字符串转中文
const dateStr2CNStr = (date: string) => date ? dayjs(date).format('MM月DD日') : ''
// 时间字符串转时:分
const timeStr2Hm = (time:string) => time
  ? time.split(':').slice(0, 2).map(ele => ele.padStart(2, '0')).join(':')
  : ''

export interface ProductSectionProps {
  productData: BaseObj
  initialData: BaseObj
  onActivityStatusChange: (status: ActivityStatus) => void
}

const ProductSection: React.FunctionComponent<ProductSectionProps> =
  ({ productData, initialData, onActivityStatusChange }) => {
  const detailData = productData.resChannelStoreProductVO || {}
  const preSaleData = productData.resProductAdvanceSaleVO || {}
  const carouselData = preSaleData.resProductPicVOList || []

  const loading = !detailData.productCode
  const carouselImages = carouselData.sort((a, b) => a.sort - b.sort)
    .map(ele => ele.picUrl)
  const spec = loading ? initialData.spec : detailData.productSpecific

  return (
    <View>
      <Carousel placeholder={initialData.thumbnail} images={carouselImages}/>
      <PreSaleBar
        price={loading ? initialData.price : (detailData.promotionPrice || detailData.price)}
        startTs={datetimeStr2Ts(preSaleData.activityBeginDate)}
        endTs={datetimeStr2Ts(preSaleData.activityEndDate)}
        onStatusChange={onActivityStatusChange}
      />

      <View style={[styles.section, styles.mainInfoBox, styles.ph15]}>
        <Text style={styles.h1}>{loading ? initialData.name : preSaleData.productName}</Text>
        <Text style={styles.h5}>{loading ? initialData.subtitle : preSaleData.activityProductBrief}</Text>

        <View style={styles.preOrderRow}>
          <Text style={styles.normalText}>上市价 ¥{transPenny(loading ? initialData.slashedPrice : preSaleData.onSalePrice)}</Text>
          <View style={styles.preOrderCountBox}>
            <Text style={styles.preOrderCountText}>{preSaleData.reserveNumber || 0}人已预订</Text>
          </View>
        </View>

        <View style={styles.productPropertyRow}>
          {!!spec && (
            <View style={styles.productPropertyItem}>
              <FastImage style={styles.productPropertyIcon} source={productSpecific}/>
              <Text style={styles.productPropertyText}>{spec}</Text>
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
                {datetimeStr2CNStr(preSaleData.activityBeginDate)}至{datetimeStr2CNStr(preSaleData.activityEndDate)}
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
              <Text style={styles.orderInfoText}>
                每天{timeStr2Hm(preSaleData.selfDeliveryBeginTimeSlot)}~{timeStr2Hm(preSaleData.selfDeliveryEndTimeSlot)}
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
