/**
 * Created by 李华良 on 2019-07-12
 */
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import FitImage from 'react-native-fit-image'

const windowDim = Dimensions.get('window')
const imgWidth = Math.floor((windowDim.width - 20 - 5) / 2)

interface Props {
  data: object[]
  onImgPress: Function
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
  rightTopImg: {
    marginBottom: 5,
  }
})

function Img({style, imgUrl, linkType, link, onPress}) {
  return (
    <FitImage
      style={style}
      source={{ uri: imgUrl }}
      onPress={() => onPress(linkType, link)}
    />
  )
}

export default function Ad1v2Floor({ data, onImgPress }: Props) {
  const [ left={}, rightTop={}, rightBtm={} ] = data

  return (
    <View style={styles.container}>
      <View style={styles.leftImgBox}>
        <Img {...left} />
      </View>
      <View style={styles.rightImgBox}>
        <Img style={styles.rightTopImg} {...rightTop} />
        <Img {...rightBtm} />
      </View>
    </View>
  )
}