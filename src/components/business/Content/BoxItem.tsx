/**
 * 宫格 / 分类入口
 * Created by 李华良 on 2019-07-04
 */
import * as React from 'react'
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  Platform,
} from 'react-native'
import { Native } from '@utils'
import styles from './BoxItem.styles'

const boxPlaceholder =
  Platform.OS === 'ios'
    ? require('@img/placeholder-box.png')
    : { uri: 'asset:/src_assets_imgs_placeholderbox.png' }

export interface Props {
  link: {} // 跳转链接
  image: string // 图片 url
  title?: string // 标题
}

export default function BoxItem({ link, image, title }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
      <View style={styles.box}>
        <ImageBackground style={styles.boxImg} source={boxPlaceholder}>
          <Image
            style={styles.boxImg}
            source={{ uri: image }}
            resizeMode="contain"
          />
        </ImageBackground>
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
