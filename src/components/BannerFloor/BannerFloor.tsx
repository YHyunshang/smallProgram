/**
 * Created by 李华良 on 2019-07-11
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Image,
  View
} from 'react-native'

import Swiper from 'react-native-swiper'

export interface Props {
  data: array
}

interface State {
}

export default class BannerFloor extends Component<Props, State> {
  static defaultProps = {}
  static propTypes = {
    data: PropTypes.array,
  }

  constructor(props: Props) {
    super(props)
  }

  render() {
    const { data } = this.props
    const banners = data.map(({image, url}, idx) => (
      <Image style={styles.image} source={{uri: image}} resizeMode="cover" key={idx}/>
    ))
    const dot = <View style={styles.dot} />
    const actDot = <View style={{ ...styles.dot, ...styles.dotAct }} />

    return (
      <View style={styles.container}>
        <Swiper
          height={160}
          dot={dot}
          activeDot={actDot}
          paginationStyle={styles.paginationStyle}
          loop
          autoplay
        >
          {banners}
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  swiperPagination: {
    bottom: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255,255,255,.4)'
  },
  dotAct: {
    backgroundColor: 'rgba(255,255,255,.9)',
  }
})
