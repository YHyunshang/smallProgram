import * as React from 'react'
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import styles from './ProductSwiperWithBg.styles'
import FitImage from 'react-native-fit-image'
import { Native } from '@utils'

interface Props {
  backgroundImage: string
  products: {
    cartId: string // 购物车商品id
    code: string // 商品编码
    thumbnail: string // 缩略图
    name: string // 商品名称
    tag?: string // 标签
    spec: string // 规格
    price: number // 当前价格
    slashedPrice?: number | string // 划线价
    count?: 0 // 当前数量
  }[]
}

export default function ProductSwiperWithBg({
  backgroundImage,
  products,
}: Props) {
  const navigateToProductDetail = productCode => {
    Native.navigateTo({
      type: 1,
      uri: 'A003,A003',
      params: { params: { productCode } },
    })
  }
  return (
    <View style={styles.container}>
      <FitImage style={styles.bgImg} source={{ uri: backgroundImage }} />
      <ScrollView
        style={styles.swiper}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {products.map(({ code, thumbnail, name, price }) => (
          <TouchableWithoutFeedback
            key={code}
            onPress={() => navigateToProductDetail(code)}
          >
            <View style={styles.productBox}>
              <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
              <Text style={styles.name} lineBreakMode="tail" numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.price}>
                <Text style={styles.pricePrefix}>¥</Text>
                {price / 100}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  )
}
