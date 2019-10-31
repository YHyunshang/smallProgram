/*
 * @Description: 商品详情顶部图片轮播组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-23 15:18:34
 */

import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import {Img, Global} from '@utils'
import Swiper from 'react-native-swiper'
import styles from './GoodsDetailSwiper.styles'
import memorize from 'memoize-one'

export default class GoodsDetailSwiper extends React.Component {
  constructor(props) {
    super(props)
  }

  loadFitImg = memorize(imgSrc => Img.loadRatioImage(imgSrc, Img.FullWidth))

  render() {
    const {imgData} = this.props
    return (
      <View style={styles.container}>
        <Swiper
          height={Global.WindowWidth}
          loop
          autoplay
          autoplayTimeout={2}
          dotStyle={styles.dot}
          activeDotStyle={[ styles.dot, styles.activeDot ]}
          paginationStyle={styles.paginationStyle}
          key={imgData.length}
        >
          {imgData.map(({ url, id='default' }) => (
            <FastImage
              key={id}
              style={styles.image}
              source={{ uri: this.loadFitImg(url) }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ))}
        </Swiper>
      </View>
    )
  }
}
