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
import { track } from '@utils/tracking'
import { RouteContext, Route } from '@utils/contextes'
import { usePlaceholder } from '@utils/hooks'

export interface Props {
  link: Native.Navigation // 跳转链接
  image: string // 图片 url
  title?: string // 标题
}

export default function BoxItem({ link, image, title }: Props) {
  const fitImg = image ? { uri: Img.loadRatioImage(image, 52) } : placeholderBox
  const [placeholderVis, placeholderOpacityStyle, onLoad] = usePlaceholder()

  const renderer = (ctxVal: Route): React.ReactNode => {
    const onPress = () => {
      track('buttonClick', {
        $screen_name: ctxVal.path,
        page_type: ctxVal.path,
        tab_name: (ctxVal.extraData || { currentTab: '' }).currentTab,
        belong_name: '分类入口',
        button_name: title,
      })
      Native.navigateTo(link)
    }

    return (
      <TouchableWithoutFeedback onPress={onPress}>
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

  return <RouteContext.Consumer>{renderer}</RouteContext.Consumer>
}
