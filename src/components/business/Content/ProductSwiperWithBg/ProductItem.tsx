/**
 * Created by 李华良 on 2019-12-03
 */
import * as React from 'react'
import {Img} from "@utils";
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import styles from "./ProductItem.styles";
import {Product} from "@common/typings";
import withProductDetailNav from "../HOC/withProductDetailNav";

export interface ProductItemProps extends Product {
  getDetailNavigator: (thumbnail: string) => () => void
}

const ProductItem: React.FunctionComponent<ProductItemProps> = (props) => {
  const {
    code,
    thumbnail,
    name,
    price,
    getDetailNavigator,
  } = props
  const fitThumbnail = Img.loadRatioImage(thumbnail, 100)
  const navToDetail = getDetailNavigator(fitThumbnail)

  return (
    <TouchableWithoutFeedback
      key={code}
      onPress={navToDetail}
    >
      <View style={styles.productBox}>
        <Image style={styles.thumbnail} source={{ uri: fitThumbnail }} />
        <Text style={styles.name} lineBreakMode="tail" numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.price}>
          <Text style={styles.pricePrefix}>¥</Text>
          {price / 100}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default withProductDetailNav(ProductItem)
