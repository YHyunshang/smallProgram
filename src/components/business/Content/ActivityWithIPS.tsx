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
import {Product} from '@common/typings'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {Formatter, Img, Native} from '@utils'
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
          keyExtractor={item => `${item._key_}`}
          renderItem={productItemRender}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const ProductItem = React.memo(({ thumbnail, name, desc, spec, price, slashedPrice, count, code, shopCode }: Product) => {
  const fitThumbnail = Img.loadRatioImage(thumbnail, 80)

  const navigateToProductDetail = () => {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'A003,A003',
      params: {
        productCode: code,
        storeCode: shopCode,
        directTransmitParams: {
          name,
          subTitle: desc,
          price: price,
          slashedPrice: slashedPrice || price,
          spec,
          count,
          thumbnail: fitThumbnail,
        }
      },
    })
  }

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={navigateToProductDetail}>
    <View
      style={[
        styles.productBox,
      ]}
    >
      <FastImage style={styles.thumbnail} source={{ uri: fitThumbnail }} resizeMode={FastImage.resizeMode.contain} />
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
    </TouchableOpacity>
  )
})
