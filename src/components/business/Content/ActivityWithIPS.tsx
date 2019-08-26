/**
 * 活动 - 单图 + 商品横向滑动
 * ActivityWithImageProductScroll(IPS)
 * @Author: 李华良
 * @Date: 2019-08-24 18:09:24
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-08-25 21:39:41
 */
import * as React from 'react'
import styles from './ActivityWithIPS.styles'
import { Product, Link } from './typings'
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Native } from '@utils'
import FitImage from 'react-native-fit-image'

interface Props {
  image: string
  products: Product[]
  activityCode: string
}

export default function ActivityWithIPS({
  image,
  products,
  activityCode,
}: Props) {
  const navigateToActivity = () =>
    Native.navigateTo({ type: 2, uri: '', params: { code: activityCode } })
  const total = products.length
  const productList = products.map(
    ({ code, thumbnail, name, price }, index) => (
      <TouchableOpacity onPress={navigateToActivity} key={code}>
        <View
          style={[
            styles.productBox,
            index === 0 && styles.productBoxFirst,
            index === total - 1 && styles.productBoxLast,
          ]}
        >
          <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
          <View style={styles.nameBox}>
            <Text style={styles.name} lineBreakMode="tail" numberOfLines={2}>
              {name}
            </Text>
          </View>
          <Text style={styles.price}>
            <Text style={styles.pricePrefix}>¥</Text>
            {price / 100}
          </Text>
        </View>
      </TouchableOpacity>
    )
  )
  return (
    <View style={styles.container}>
      {/* todo: navigate to activity */}
      <TouchableOpacity onPress={navigateToActivity}>
        <FitImage style={styles.image} source={{ uri: image }} />
      </TouchableOpacity>
      <ScrollView
        style={styles.productSwiper}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {productList}
      </ScrollView>
    </View>
  )
}
