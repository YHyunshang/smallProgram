/**
 * 单张广告图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View, Animated, Image } from 'react-native'
import styles from './AdSingle.styles'
import { Native, Img } from '@utils'
import memorize from 'memoize-one'
import { FitImg } from '@components'
import { placeholder } from '@const/resources'
import { WindowWidth } from '@utils/global'
import { usePlaceholder } from '@utils/hooks'
import FastImage from 'react-native-fast-image'

const loadRatioImage = memorize((img, width) => Img.loadRatioImage(img, width))

export interface Props {
  image: string // 图片链接
  link: Native.Navigation // 跳转地址类型
  width?: number
  height?: number
  initialWidth?: number // 初始宽，即初始占位，图片加载后以实际宽度为准
  initialHeight?: number
  borderRadius?: number
}

const AdSingle: React.FunctionComponent<Props> = ({
  image,
  link,
  width,
  height,
  initialWidth,
  initialHeight,
  borderRadius,
}) => {
  const fitImg = loadRatioImage(image, width || WindowWidth)
  const hasPlaceholder: boolean =
    (width > 0 && height > 0) || (initialWidth > 0 && initialHeight > 0)
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

  const containerStyle = [
    styles.container,
    initialWidth &&
      initialHeight &&
      placeholderVis && { width: initialWidth, height: initialHeight },
  ]
  const placeholderBoxStyle = [styles.placeholderBox, placeholderOpacityStyle]

  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
      <View style={[containerStyle, { borderRadius }]}>
        <FitImg
          style={[styles.image, { width, height }]}
          source={{ uri: fitImg }}
          resizeMode="contain"
          onLoad={onLoad}
        />
        {hasPlaceholder && placeholderVis && (
          <Animated.View style={placeholderBoxStyle}>
            <FastImage
              style={styles.placeholderImg}
              source={placeholder}
              resizeMode="contain"
            />
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AdSingle
