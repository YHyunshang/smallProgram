/**
 * 活动 - 单图 + 商品横向滑动
 * ActivityWithImageProductScroll(IPS)
 * @Author: 李华良
 * @Date: 2019-08-24 18:09:24
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-04 14:41:47
 */
import * as React from 'react'
import styles from './ActivityWithIPS.styles'
import { Product } from './typings'
import {View, TouchableOpacity, Text, FlatList} from 'react-native'
import {Formatter, Global, Img, Native} from '@utils'
import FastImage from 'react-native-fast-image'
import memorize from 'memoize-one'

const loadRatioImage = memorize((imgSrc, width) => Img.loadRatioImage(imgSrc, width))

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

  const fitImg = loadRatioImage(image, Img.FullWidth)

  const [ imgLayoutW, setImgLayoutW ] = React.useState(0)
  const [ imgRatio, setImgRatio ] = React.useState(-1)
  React.useEffect(() => {
    Img.getRatio({ uri: fitImg })
      .then(ratio => setImgRatio(ratio))
    return () => setImgRatio(-1)
  }, [ fitImg ])
  const onImageLayout = e => {
    const { width } = e.nativeEvent.layout
    if (width !== imgLayoutW) setImgLayoutW(width)
  }

  const imgLayout = (imgLayoutW && imgRatio)
    ? { width: '100%', height: imgLayoutW / imgRatio }
    : { width: '100%' }

  const productItemRender = ({ item }) => (
    <TouchableOpacity activeOpacity={0.95} onPress={navigateToActivity}>
      <ProductItem {...item} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.95} onPress={navigateToActivity}>
        <FastImage
          style={[ styles.image, imgLayout ]}
          source={{ uri: fitImg }}
          onLayout={onImageLayout}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>

      {products.length > 0 && (
        <FlatList
          style={styles.productSwiper}
          horizontal
          data={products}
          keyExtractor={item => item.code}
          renderItem={productItemRender}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const ProductItem = React.memo(({ thumbnail, name, price }: Product) => {
  const fitThumbnail = Img.loadRatioImage(thumbnail, 80)
  return (
    <View
      style={[
        styles.productBox,
      ]}
    >
      <FastImage style={styles.thumbnail} source={{ uri: fitThumbnail }} resizeMode={FastImage.resizeMode.center} />
      <View style={styles.nameBox}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
      </View>
      <Text style={styles.price}>
        <Text style={styles.pricePrefix}>¥ </Text>
        {Formatter.transPenny(price)}
      </Text>
    </View>
  )
})
