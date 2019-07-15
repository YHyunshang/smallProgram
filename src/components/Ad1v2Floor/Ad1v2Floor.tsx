/**
 * Created by 李华良 on 2019-07-12
 */
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import FitImage from 'react-native-fit-image'

const windowDim = Dimensions.get('window')
const imgWidth = Math.floor((windowDim.width - 20 - 5) / 2)

interface Props {
  data: array<object>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftImgBox: {
    width: imgWidth,
  },
  rightImgBox: {
    width: imgWidth,
    justifyContent: 'space-between'
  },
  imageLstNotLast: {
    marginBottom: 5,
  }
})

export default function Ad1v2Floor(props: Props) {
  const {
    data: [ left, rightTop, rightBtm ]
  } = props

  return (
    <View style={styles.container}>
      <View style={styles.leftImgBox}>
        <FitImage source={{ uri: left.image }} />
      </View>
      <View style={styles.rightImgBox}>
        <FitImage style={styles.imageLstNotLast} source={{ uri: rightTop.image }} />
        <FitImage source={{ uri: rightBtm.image }} />
      </View>
    </View>
  )
}