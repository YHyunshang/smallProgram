/*
 * @Description: 商品详情顶部图片轮播组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-23 15:18:34
 */

import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import {Img, Global} from '@utils'
import Swiper from 'react-native-swiper'
import styles from './GoodsDetailSwiper.styles'
import memorize from 'memoize-one'

const loadFitImg = memorize(imgSrc => Img.loadRatioImage(imgSrc, Img.FullWidth))

export default function GoodsDetailSwiper({ imgData, onAllLoadEnd }) {
  let loadCount = 0
  const onImgLoadEnd = () => {
    loadCount += 1
    loadCount === imgData.length && onAllLoadEnd && onAllLoadEnd()
  }

  return (
    <View style={styles.container}>
      <Swiper
        height={Global.WindowWidth}
        loop
        autoplay
        autoplayTimeout={10}
        dotStyle={styles.dot}
        activeDotStyle={[ styles.dot, styles.activeDot ]}
        paginationStyle={styles.paginationStyle}
        key={imgData.length}
        removeClippedSubviews={false}
      >
        {imgData.map(({ url, id }, index) => (
          <FastImage
            key={id || index}
            style={styles.image}
            source={{ uri: loadFitImg(url) }}
            resizeMode="contain"
            onLoadEnd={onImgLoadEnd}
          />
        ))}
      </Swiper>
    </View>
  )
}

GoodsDetailSwiper.propTypes = {
  imgData: PropTypes.array,
  onAllLoadEnd: PropTypes.func,
}
