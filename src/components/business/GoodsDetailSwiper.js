/*
 * @Description: 商品详情顶部图片轮播组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-07 14:18:28
 */

import React from 'react'
import {
  Image,
  View
} from 'react-native'
import Swiper from 'react-native-swiper'
import styles from './GoodsDetailSwiper.styles'
export default class GoodsDetailSwiper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const {imgData} = this.props
    const dot = <View style={styles.dot} />
    const activeDot = <View style={{...styles.dot, ...styles.activeDot}} />
    const swiperList = imgData.map(({url}, index) => (
      <Image style={styles.image} source={{uri: url}} resizeMode="cover" key={index}/>
    ))
    return (
      <View style={styles.container}>
        <Swiper
          height={160}
          dot={dot}
          activeDot={activeDot}
          paginationStyle={styles.paginationStyle}
          loop
          autoplay
        >
          {swiperList}
        </Swiper>
      </View>
    )
  }
}
