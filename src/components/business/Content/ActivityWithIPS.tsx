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
import { Product } from '@common/typings'
import { FlatList, Text, TouchableOpacity, View, Animated } from 'react-native'
import { Formatter, Img, Native } from '@utils'
import FastImage from 'react-native-fast-image'
import memorize from 'memoize-one'
import withProductDetailNav from '@components/business/Content/HOC/withProductDetailNav'
import { usePlaceholder } from '@utils/hooks'
import { placeholder, placeholderProductThumbnail } from '@const/resources'
import FitImg from '@components/FitImg'
import { WindowWidth } from '@utils/global'

const loadRatioImage = memorize((imgSrc, width) =>
  Img.loadRatioImage(imgSrc, width)
)

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

  const [imgLayoutW, setImgLayoutW] = React.useState(0)
  const [imgRatio, setImgRatio] = React.useState(-1)
  React.useEffect(() => {
    Img.getRatio({ uri: fitImg }).then(ratio => setImgRatio(ratio))
    return () => setImgRatio(-1)
  }, [fitImg])
  const onImageLayout = e => {
    const { width } = e.nativeEvent.layout
    if (width !== imgLayoutW) setImgLayoutW(width)
  }

  const imgLayout =
    imgLayoutW && imgRatio
      ? { width: '100%', height: imgLayoutW / imgRatio }
      : { width: '100%' }

  const productItemRender = ({ item }) => (
    <TouchableOpacity activeOpacity={0.95} onPress={navigateToActivity}>
      <ProductItem {...item} />
    </TouchableOpacity>
  )

  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()
  const bannerBoxStyle = [
    styles.bannerBox,
    placeholderVis && {
      width: WindowWidth - 20,
      height: (WindowWidth - 20) / (355 / 106),
    },
  ]

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.95} onPress={navigateToActivity}>
        <View style={bannerBoxStyle}>
          <FitImg
            style={styles.image}
            source={{ uri: fitImg }}
            resizeMode="contain"
            onLoad={onLoad}
          />
          {placeholderVis && (
            <Animated.View
              style={[styles.placeholderBox, placeholderOpacityStyle]}
            >
              <FastImage
                style={styles.placeholder}
                source={placeholder}
                resizeMode="contain"
              />
            </Animated.View>
          )}
        </View>
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

const ProductItem = React.memo(
  withProductDetailNav(
    ({
      thumbnail,
      name,
      price,
      getDetailNavigator,
    }: Product & { getDetailNavigator: (thumbnail: string) => () => void }) => {
      const fitThumbnail = Img.loadRatioImage(thumbnail, 80)

      const navigateToProductDetail = getDetailNavigator(fitThumbnail)
      const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

      return (
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={navigateToProductDetail}
        >
          <View style={[styles.productBox]}>
            <View style={styles.thumbnailBox}>
              <FastImage
                style={styles.thumbnail}
                source={{ uri: fitThumbnail }}
                resizeMode="contain"
                onLoad={onLoad}
              />
              {placeholderVis && (
                <Animated.View
                  style={[
                    styles.thumbnailPlaceholderBox,
                    placeholderOpacityStyle,
                  ]}
                >
                  <FastImage
                    style={styles.thumbnailPlaceholder}
                    source={placeholderProductThumbnail}
                    resizeMode="contain"
                  />
                </Animated.View>
              )}
            </View>
            <View style={styles.nameBox}>
              <Text style={styles.name} numberOfLines={2}>
                {name}
              </Text>
            </View>
            <Text style={styles.price}>
              <Text style={styles.pricePrefix}>¥&nbsp;</Text>
              {Formatter.transPenny(price)}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  )
)
