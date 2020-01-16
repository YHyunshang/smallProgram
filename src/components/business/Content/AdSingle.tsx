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
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

  const containerStyle = [
    styles.container,
    placeholderVis &&
      initialWidth &&
      initialHeight && { width: initialWidth, height: initialHeight },
  ]
  const placeholderBoxStyle = [styles.placeholderBox, placeholderOpacityStyle]

  const hasPlaceholderImg =
    (width && height && width > 145 && height > 40) ||
    (initialWidth && initialHeight && initialWidth > 145 && initialHeight > 40)

  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
      <View style={[containerStyle, { borderRadius }]}>
        <FitImg
          style={[styles.image, { width, height }]}
          source={{ uri: fitImg }}
          resizeMode="contain"
          onLoad={onLoad}
        />
        {placeholderVis && (
          <Animated.View style={placeholderBoxStyle}>
            {hasPlaceholderImg && (
              <FastImage
                style={styles.placeholderImg}
                source={placeholder}
                resizeMode="contain"
              />
            )}
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AdSingle
