/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {Image, Text, View} from "react-native";
import {LimitTimeBuyStatus, Product} from "@common/typings";
import styles from './ProductItem.styles'
import {Formatter, Img} from "@utils";
import {placeholderProduct} from "@const/resources";

interface Props extends Product {
  status: LimitTimeBuyStatus
}

export default function ProductItem ({ name, spec, price, slashedPrice, status, thumbnail }: Props) {
  const fitThumbnail = thumbnail ? Img.loadRatioImage(thumbnail, 50, 50) : placeholderProduct
  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: fitThumbnail }} />
      <View style={styles.detailBox}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.spec} numberOfLines={1}>{spec}</Text>
        <View style={styles.priceRow}>
          {status === LimitTimeBuyStatus.Pending ? (
            <Text style={styles.waiting} numberOfLines={1}>敬请期待</Text>
          ) : (
            <Text style={styles.price}>
              <Text style={styles.pricePrefix}>¥ </Text>
              {Formatter.transPenny(price)}
            </Text>
          )}
          {slashedPrice && (
            <Text style={styles.slashedPrice} numberOfLines={1}>¥{Formatter.transPenny(slashedPrice)}</Text>
          )}
        </View>
      </View>
    </View>
  )
}