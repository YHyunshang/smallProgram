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
import { Native, Img } from '@utils'
import styles from './BoxItem.styles'
import { placeholderBox } from '@const/resources'

export interface Props {
  link: {} // 跳转链接
  image: string // 图片 url
  title?: string // 标题
}

export default function BoxItem({ link, image, title }: Props) {
  const fitImg = image ? { uri: Img.loadRatioImage(image, 52) } : placeholderBox
  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
      <View style={styles.box}>
        <Image style={styles.boxImg} source={fitImg} />
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
