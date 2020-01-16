/**
 * Created by 李华良 on 2019-12-03
 */
import * as React from 'react'
import { Img } from '@utils'
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
} from 'react-native'
import styles from './ProductItem.styles'
import { Product } from '@common/typings'
import withProductDetailNav from '../HOC/withProductDetailNav'
import { usePlaceholder } from '@utils/hooks'
import FastImage from 'react-native-fast-image'
import { placeholderProductThumbnail } from '@const/resources'
import { transPenny } from '@utils/FormatUtil'

export interface ProductItemProps extends Product {
  getDetailNavigator: (thumbnail: string) => () => void
}

const ProductItem: React.FunctionComponent<ProductItemProps> = props => {
  const { code, thumbnail, name, price, getDetailNavigator } = props
  const fitThumbnail = Img.loadRatioImage(thumbnail, 92)
  const navToDetail = getDetailNavigator(fitThumbnail)

  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

  return (
    <TouchableWithoutFeedback key={code} onPress={navToDetail}>
      <View style={styles.productBox}>
        <View style={styles.thumbnailBox}>
          <FastImage
            style={styles.thumbnail}
            source={{ uri: fitThumbnail }}
            resizeMode="contain"
            onLoad={onLoad}
          />
          {placeholderVis && (
            <Animated.View
              style={[styles.thumbnailPlaceholderBox, placeholderOpacityStyle]}
            >
              <FastImage
                style={styles.thumbnailPlaceholder}
                source={placeholderProductThumbnail}
                resizeMode="contain"
              />
            </Animated.View>
          )}
        </View>
        <Text style={styles.name} lineBreakMode="tail" numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.price}>
          <Text style={styles.pricePrefix}>¥&nbsp;</Text>
          {transPenny(price)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default withProductDetailNav(ProductItem)
