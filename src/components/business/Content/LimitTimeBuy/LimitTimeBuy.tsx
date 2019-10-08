/**
 * 限时抢购
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {Product} from "@components/business/Content/typings"
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import styles from './LimitTimeBuy.styles'
import Timer from "./Timer";
import ProductItem from "@components/business/Content/LimitTimeBuy/ProductItem";
import {iconArrowRight} from "@const/resources";
import {Native} from "@utils";

interface Props {
  startTime: number // timestamp
  endTime: number // timestamp
  products: Product[]
}

export default function LimitTimeBuy({startTime, endTime, products}: Props) {
  return (
    <TouchableWithoutFeedback
      onPress={() => Native.navigateTo({type: Native.NavPageType.RN, uri: 'LimitTimeBuy', title: '限时抢购'})}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>限时抢购</Text>
          <Timer start={startTime} end={endTime}/>
          <Text style={styles.more}>更多</Text>
          <Image style={styles.iconArrowRight} source={iconArrowRight}/>
        </View>
        <View style={styles.productGrid}>
          {products.map(product => (
            <View style={styles.productBox} key={product.code}>
              <ProductItem {...product} />
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
