/*
 * @Description: 商品详情顶部图片轮播组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-06 18:43:21
 */

import React from 'react'
import {
  StyleSheet,
  Image,
  View,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
const {width} = Dimensions.get('window') //解构赋值 获取屏幕宽度
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
      <Image style={styles.image} source={{uri: url}} resizeMode="contain" key={index}/>
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

const styles = StyleSheet.create({
  wrapper: {
  },
  container: {
    width,
    height: width
  },
  paginationStyle: {
    bottom: 10
  },
  image: {
    width: '100%',
    height: 375
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,.25)'
  },
  activeDot: {
    backgroundColor: 'rgba(0,0,0,.7)'
  }
})
