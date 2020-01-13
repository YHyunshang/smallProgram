/**
 * 宫格 / 分类入口
 * Created by 李华良 on 2019-07-04
 */
import * as React from 'react'
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'
import { Native, Img } from '@utils'
import styles from './BoxItem.styles'
import { placeholderBox } from '@const/resources'
import FastImage from 'react-native-fast-image'
import { usePlaceholder } from '@utils/hooks'

export interface Props {
  link: Native.Navigation // 跳转链接
  image: string // 图片 url
  title?: string // 标题
}

export default function BoxItem({ link, image, title }: Props) {
  const fitImg = image ? { uri: Img.loadRatioImage(image, 52) } : placeholderBox
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
      <View style={styles.box}>
        <FastImage
          style={styles.boxImg}
          source={fitImg}
          resizeMode="contain"
          onLoad={onLoad}
        />
        {placeholderVis && (
          <Animated.View
            style={[styles.placeholderBox, placeholderOpacityStyle]}
          >
            <FastImage
              style={[styles.placeholder]}
              source={placeholderBox}
              resizeMode="contain"
            />
          </Animated.View>
        )}
        <Text
          style={styles.boxText}
          selectable={false}
          ellipsizeMode="clip"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
