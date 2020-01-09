/**
 * Created by 李华良 on 2019-12-12
 */
import * as React from 'react'
import { ActivityStatus, BaseObj } from '@common/typings'
import { Text, View } from 'react-native'
import Carousel from '../Carousel'
import FastImage from 'react-native-fast-image'
import {
  iconDeliveryNextDay,
  productPlace,
  productSpecific,
} from '@const/resources'
import { transPenny } from '@utils/FormatUtil'
import Tag from '@components/business/Content/Tag'
import styles from './styles'
import LimitTimeBuyBar from '../LimitTimeBuyBar'

export interface ProductSectionProps {
  productData: BaseObj
  initialData: BaseObj
  onStatusChange: (v: ActivityStatus, ov: ActivityStatus) => void
}

const ProductSection: React.FunctionComponent<ProductSectionProps> = ({
  productData,
  initialData,
  onStatusChange,
}) => {
  const detailData = productData.resChannelStoreProductVO || {}
  const sliderData = productData.productSliderImagesResponseVOList || []

  const sliders = sliderData
    .filter(ele => ele.fileType === 0)
    .sort((a, b) => a.sort - b.sort)
    .map(ele => ele.url)

  const loading = !detailData.productCode
  const price = loading
    ? initialData.price
    : detailData.promotionPrice || detailData.price
  const slashedPrice = loading
    ? initialData.slashedPrice
    : detailData.promotionPrice && detailData.promotionPrice < detailData.price
    ? detailData.price
    : 0
  const isNextDayArrive = detailData.deliveryType === 2
  const labels = [
    ...new Set([
      ...((detailData.productActivityLabel || {}).labels || []),
      ...((detailData.orderActivityLabel || {}).labels || []),
    ]),
  ]
  const hasLabel = labels.length > 0 || isNextDayArrive
  const subTitle = loading ? initialData.subtitle : detailData.subTitle
  const spec = loading ? initialData.spec : detailData.productSpecific
  const activityInfo = detailData.productActivityLabel || {}
  const soldRatio = Number(activityInfo.salesRatio.replace('%', ''))

  return (
    <>
      <Carousel images={sliders} />

      <LimitTimeBuyBar
        percent={soldRatio}
        startTs={activityInfo.activityBeginTime}
        endTs={activityInfo.activityEndTime}
        onStatusChange={onStatusChange}
      />

      <View style={styles.section}>
        <Text style={styles.priceRow}>
          <Text style={styles.pricePrimaryNormal}>
            <Text style={styles.pricePrimaryPrefixNormal}>¥&nbsp;</Text>
            {transPenny(price)}
            &nbsp;&nbsp;
          </Text>
          {!!slashedPrice && slashedPrice > price && (
            <Text style={styles.priceSlashedNormal}>
              ¥{transPenny(slashedPrice)}
            </Text>
          )}
        </Text>

        {hasLabel && (
          <View style={styles.tagRow}>
            {isNextDayArrive && (
              <FastImage
                source={iconDeliveryNextDay}
                style={[
                  styles.tagItem,
                  { width: 38, height: 16, marginRight: 5 },
                ]}
              />
            )}
            {labels.map(ele => (
              <View style={styles.tagItem}>
                <Tag key={ele} backgroundColor="#FFDED9" color="#FF3914">
                  {ele}
                </Tag>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.nameRow}>
          {loading ? initialData.name : detailData.productName}
        </Text>
        {!!subTitle && <Text style={styles.subTitleRow}>{subTitle}</Text>}

        <View style={styles.productPropertyRow}>
          {!!spec && (
            <View style={styles.productPropertyItem}>
              <FastImage
                style={styles.productPropertyIcon}
                source={productSpecific}
              />
              <Text style={styles.productPropertyText}>{spec}</Text>
            </View>
          )}
          {!!detailData.originPlace && (
            <View style={styles.productPropertyItem}>
              <FastImage
                style={styles.productPropertyIcon}
                source={productPlace}
              />
              <Text style={styles.productPropertyText}>
                {detailData.originPlace}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  )
}

export default ProductSection
