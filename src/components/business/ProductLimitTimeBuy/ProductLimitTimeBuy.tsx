/**
 * 限时抢购商品
 * Created by 李华良 on 2019-10-07
 */
import * as React from 'react'
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
} from 'react-native'
import styles from './ProductLimitTimeBuy.styles'
import { Img, Native } from '@utils'
import withCartCountModify from '../Content/HOC/withCountInCartModifier'
import { ActivityStatus } from '@common/typings'
import Tag from '../Content/Tag'
import ProgressBar from '@components/Scene/LimitTimeBuy/ProgressBar'
import ProductCountOperatorLTB from '@components/business/ProductLimitTimeBuy/ProductCountOperatorLTB'
import { Product } from '@common/typings'
import withProductDetailNav from '@components/business/Content/HOC/withProductDetailNav'
import { transPenny } from '@utils/FormatUtil'
import { usePlaceholder } from '@utils/hooks'
import FastImage from 'react-native-fast-image'
import { placeholderProductThumbnail } from '@const/resources'

interface Props extends Product {
  thumbnailSize: number // 商品图片大小
  inventoryPercentage?: number // 剩余库存比
  disableAdd?: boolean
  activityStatus?: ActivityStatus // 限时抢购活动状态
  getDetailNavigator: (thumbnail: string) => () => void
}

function ProductLimitTimeBuy({
  thumbnailSize,
  thumbnail,
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
  activityStatus,
  disableAdd,
  getDetailNavigator,
}: Props) {
  const fitThumbnail = Img.loadRatioImage(thumbnail, thumbnailSize)
  const navigateToProductDetail = getDetailNavigator(fitThumbnail)

  const thumbnailDim = { width: thumbnailSize, height: thumbnailSize }
  const isCartDisabled =
    inventoryPercentage <= 0 ||
    activityStatus === ActivityStatus.Pending ||
    activityStatus === ActivityStatus.Expired
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigateToProductDetail}>
        <View style={styles.productBox}>
          <View style={styles.thumbnailBox}>
            <FastImage
              style={[styles.thumbnail, thumbnailDim]}
              source={{ uri: fitThumbnail }}
              resizeMode="contain"
              onLoad={onLoad}
            />
            {placeholderVis && (
              <Animated.View
                style={[
                  styles.thumbnailPlaceholderBox,
                  placeholderOpacityStyle,
                ]}
              >
                <FastImage
                  style={[styles.thumbnailPlaceholder, thumbnailDim]}
                  source={placeholderProductThumbnail}
                  resizeMode="contain"
                />
              </Animated.View>
            )}
            <View style={styles.productTagRow}>
              {productTags.slice(0, 2).map((tag, idx) => (
                <Tag color={['#EF2F41', '#208DDC'][idx]} key={idx}>
                  {tag}
                </Tag>
              ))}
            </View>

            {!!inventoryLabel && (
              <View
                style={[styles.inventoryBox, { top: thumbnailSize / 2 - 11 }]}
              >
                <View style={styles.inventoryLabelBg}>
                  <Text style={styles.inventoryLabel}>{inventoryLabel}</Text>
                </View>
              </View>
            )}
          </View>
          <View style={[styles.infoBox]}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
            <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
              {desc}
            </Text>
            <View style={styles.tagRow}>
              <View style={styles.inventoryPercentage}>
                <ProgressBar percentage={inventoryPercentage} text="库存" />
              </View>
              {!!spec && <Text style={styles.spec}>{spec}</Text>}
            </View>
            <Text style={styles.priceRow}>
              {activityStatus !== ActivityStatus.Pending ? (
                <Text style={styles.currentPrice}>
                  <Text style={styles.pricePrefix}>¥&nbsp;</Text>
                  {transPenny(price)}
                </Text>
              ) : (
                <Text style={styles.expectPrice}>敬请期待</Text>
              )}
              {!!slashedPrice && (
                <>
                  <Text>&nbsp;&nbsp;</Text>
                  <Text style={styles.slashedPrice}>
                    ¥{transPenny(slashedPrice)}
                  </Text>
                </>
              )}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.cartBox}>
        <ProductCountOperatorLTB
          count={count}
          onChange={onModifyCount}
          disabled={isCartDisabled}
          disableAdd={disableAdd}
        >
          {inventoryPercentage <= 0 ? '已售完' : '去抢购'}
        </ProductCountOperatorLTB>
      </View>
    </View>
  )
}

export default withCartCountModify(withProductDetailNav(ProductLimitTimeBuy))
