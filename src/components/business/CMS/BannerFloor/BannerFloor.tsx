/**
 * Created by 李华良 on 2019-07-11
 */
import * as React from 'react'
import {
  Image,
  View,
} from 'react-native'
import Swiper from './Swiper'
import styles from './BannerFloor.styles'

export interface Props {
  data: []
}

export default function BannerFloor({ data }: Props) {
  return (
    <View style={styles.container}>
      <Swiper data={data} />
    </View>
  )
}
