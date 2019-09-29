/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {View, Image, Text} from "react-native";
import {Product} from "@components/business/Content/typings";
import styles from './ProductItem.styles'
import {Img} from "@utils";
import {placeholderProduct} from "@const/resources";

export default function ProductItem ({ name, spec, price, thumbnail }: Product) {
  const fitThumbnail = Img.loadRatioImage(thumbnail, 50, 50)
  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: fitThumbnail }} defaultSource={placeholderProduct} />
      <View style={styles.detailBox}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.spec} numberOfLines={1}>{spec}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.tag} numberOfLines={1}>敬请期待</Text>
          <Text style={styles.price} numberOfLines={1}>¥{price}</Text>
        </View>
      </View>
    </View>
  )
}