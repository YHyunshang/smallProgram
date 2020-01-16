/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import { Image, Text, View, Animated } from 'react-native'
import { ActivityStatus, Product } from '@common/typings'
import styles from './ProductItem.styles'
import { Formatter, Img } from '@utils'
import { placeholderProductThumbnail } from '@const/resources'
import FastImage from 'react-native-fast-image'
import { usePlaceholder } from '@utils/hooks'

interface Props extends Product {
  status: ActivityStatus
}

export default function ProductItem({
  name,
  spec,
  price,
  slashedPrice,
  status,
  thumbnail,
}: Props) {
  const fitThumbnail = thumbnail
    ? Img.loadRatioImage(thumbnail, 50, 50)
    : placeholderProductThumbnail
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()
  return (
    <View style={styles.container}>
      <View style={styles.thumbnailBox}>
        <FastImage
          style={styles.thumbnail}
          source={{ uri: fitThumbnail }}
          onLoad={onLoad}
        />
        {placeholderVis && (
          <Animated.View
            style={[styles.thumbnailPlaceholderBox, placeholderOpacityStyle]}
          >
            <Image
              style={styles.thumbnailPlaceholder}
              source={placeholderProductThumbnail}
              resizeMode="contain"
            />
          </Animated.View>
        )}
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.spec} numberOfLines={1}>
          {spec}
        </Text>
        <Text style={styles.priceRow} numberOfLines={1}>
          {status === ActivityStatus.Pending ? (
            <Text style={styles.waiting} numberOfLines={1}>
              敬请期待
            </Text>
          ) : (
            <Text style={styles.price}>
              <Text style={styles.pricePrefix}>¥&nbsp;</Text>
              {Formatter.transPenny(price)}
            </Text>
          )}
          {slashedPrice && (
            <Text>
              &nbsp;&nbsp;
              <Text style={styles.slashedPrice} numberOfLines={1}>
                ¥{Formatter.transPenny(slashedPrice)}
              </Text>
            </Text>
          )}
        </Text>
      </View>
    </View>
  )
}
