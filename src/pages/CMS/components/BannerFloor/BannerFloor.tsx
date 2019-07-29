/**
 * Created by 李华良 on 2019-07-11
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  View,
  Text,
} from 'react-native'
import Swiper from './Swiper'
import RNSwiper from 'react-native-swiper'
import styles from './BannerFloor.styles'

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
    const banners = data.map(({ imgUrl, url }, idx) => (
      <Image style={styles.image} source={{ uri: imgUrl }} resizeMode="cover" key={idx} />
    ))

    return (
      <View>
        <Swiper
          data={data}
        />

        <RNSwiper
          sliderStyles={{
            paddingLeft: 10,
            paddingRight: 5,
            width: 288,
          }}
          height={140}
          dotStyle={styles.swiperDot}
          activeDotStyle={styles.swiperActDot}
          paginationStyle={styles.swiperPagination}
          loop
          autoplay
        >
          {banners}
        </RNSwiper>

      </View>
    )
  }
}
