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

export default class GoodsDetailSwiper extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  loadFitImg = memorize(imgSrc => Img.loadRatioImage(imgSrc, Img.FullWidth))

  render() {
    const {imgData} = this.props
    const dot = <View style={styles.dot} />
    const activeDot = <View style={{...styles.dot, ...styles.activeDot}} />
    const swiperList = imgData.map(({url, id}, index) => (
      <View style={styles.imgView} key={id || index}>
        <FastImage style={styles.image} source={{uri: this.loadFitImg(url)}} resizeMode={FastImage.resizeMode.contain}/>
      </View>
    ))

    console.log('rendering')
    return (
      <View style={styles.container}>
        <Swiper
          height={Global.WindowWidth}
          removeClippedSubviews={false} // 这个很主要啊，解决白屏问题
          autoplay={true}
          autoplayTimeout={2}
          loop={true}
          horizontal ={true}
          paginationStyle={styles.paginationStyle}
          dot={dot}
          activeDot={activeDot}
        >
          {swiperList}
        </Swiper>
      </View>
    )
  }
}
