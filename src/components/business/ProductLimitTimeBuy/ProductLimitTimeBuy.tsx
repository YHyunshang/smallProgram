/**
 * 限时抢购商品
 * Created by 李华良 on 2019-10-07
 */
import * as React from 'react'
import {Image, Text, TouchableWithoutFeedback, View,} from 'react-native'
import styles from './ProductLimitTimeBuy.styles'
import {Img, Native} from '@utils'
import withCartCountModify from '../Content/HOC/withCountInCartModifier'
import {LimitTimeBuyStatus, Product} from '../Content/typings'
import Tag from '../Content/Tag'
import ProgressBar from "@components/Scene/LimitTimeBuy/ProgressBar";
import ProductCountOperatorLTB from "@components/business/ProductLimitTimeBuy/ProductCountOperatorLTB";

interface Props extends Product {
  thumbnailSize: number // 商品图片大小
  inventoryPercentage?: number // 剩余库存比
  activityStatus?: LimitTimeBuyStatus // 限时抢购活动状态
}

function ProductLimitTimeBuy({
  thumbnailSize,
  thumbnail,
  code,
  name,
  desc,
  productTags = [],
  spec,
  price,
  slashedPrice,
  count,
  inventoryLabel,
  inventoryPercentage = 100,
  onModifyCount,
  shopCode,
  activityStatus,
}: Props) {
  const navigateToProductDetail = () => {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'A003,A003',
      params: {productCode: code, storeCode: shopCode},
    })
  }
  const fitThumbnail = Img.loadRatioImage(thumbnail, thumbnailSize)

  const thumbnailDim = {width: thumbnailSize, height: thumbnailSize}
  const isCartDisabled = inventoryPercentage <= 0 ||
    activityStatus === LimitTimeBuyStatus.Pending ||
    activityStatus === LimitTimeBuyStatus.Expired

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigateToProductDetail}>
        <View style={styles.productBox}>
          <View style={styles.thumbnailBox}>
            <Image
              style={[styles.thumbnail, thumbnailDim]}
              source={{uri: fitThumbnail}}
              resizeMode="contain"
            />
            <View style={styles.productTagRow}>
              {productTags.slice(0, 2).map((tag, idx) => (
                <Tag color={['#EF2F41', '#208DDC'][idx]} key={idx}>
                  {tag}
                </Tag>
              ))}
            </View>

            {!!inventoryLabel && (
              <View style={[styles.inventoryBox, { top: thumbnailSize / 2 - 11 }]}>
                <View style={styles.inventoryLabelBg}>
                  <Text style={styles.inventoryLabel}>{inventoryLabel}</Text>
                </View>
              </View>
            )}
          </View>
          <View style={[styles.infoBox, ]}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
            <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
              {desc}
            </Text>
            <View style={styles.tagRow}>
              <View style={styles.inventoryPercentage}>
                <ProgressBar percentage={inventoryPercentage} text="库存"/>
              </View>
              {!!spec && <Text style={styles.spec}>{spec}</Text>}
            </View>
            <View style={styles.priceRow}>
              {activityStatus !== LimitTimeBuyStatus.Pending ? (
                <Text style={styles.currentPrice}>
                  <Text style={styles.pricePrefix}>¥ </Text>
                  {price / 100}
                </Text>
              ) : (
                <Text style={styles.expectPrice}>敬请期待</Text>
              )}
              {!!slashedPrice && (
                <Text style={styles.slashedPrice}>¥{slashedPrice / 100}</Text>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.cartBox}>
        <ProductCountOperatorLTB
          count={count}
          onChange={onModifyCount}
          disabled={isCartDisabled}
        >
          {inventoryPercentage <= 0 ? '已售完' : '去抢购'}
        </ProductCountOperatorLTB>
      </View>
    </View>
  )
}

export default withCartCountModify(ProductLimitTimeBuy)
