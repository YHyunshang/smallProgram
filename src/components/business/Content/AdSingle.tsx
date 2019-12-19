/**
 * 单张广告图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import {TouchableWithoutFeedback, View} from 'react-native'
import styles from './AdSingle.styles'
import { Native } from '@utils'
import {FitImg} from "@components";

export interface Props {
  image: string // 图片链接
  link: Native.Navigation // 跳转地址类型
}

function AdSingle({ image, link }: Props) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
        <FitImg source={{ uri: image}} style={styles.image} resizeMode="contain" />
      </TouchableWithoutFeedback>
    </View>
  )
}

AdSingle.defaultProps = {
  customStyle: {}
}

export default AdSingle
