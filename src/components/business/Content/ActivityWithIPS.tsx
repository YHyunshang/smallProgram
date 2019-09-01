/**
 * 活动 - 单图 + 商品横向滑动
 * ActivityWithImageProductScroll(IPS)
 * @Author: 李华良
 * @Date: 2019-08-24 18:09:24
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-08-29 15:21:38
 */
import * as React from 'react'
import styles from './ActivityWithIPS.styles'
import { Product } from './typings'
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Native } from '@utils'
import FitImage from 'react-native-fit-image'
import { placeholderProduct } from '@const/resources'

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
    activityCode &&
    Native.navigateTo({
      type: Native.NavPageType.RN,
      uri: 'RNActivity',
      params: { activityCode, type: 'activity' },
    })
  const total = products.length
  const productList = products.map(
    ({ code, thumbnail, name, price }, index) => (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={navigateToActivity}
        key={code}
      >
        <View
          style={[
            styles.productBox,
            index === 0 && styles.productBoxFirst,
            index === total - 1 && styles.productBoxLast,
          ]}
        >
          <Image
            style={styles.thumbnail}
            source={{ uri: thumbnail }}
          />
          <View style={styles.nameBox}>
            <Text style={styles.name} numberOfLines={2}>
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
      <TouchableOpacity activeOpacity={0.95} onPress={navigateToActivity}>
        <FitImage
          style={styles.image}
          source={{ uri: image }}
          indicator={false}
        />
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
