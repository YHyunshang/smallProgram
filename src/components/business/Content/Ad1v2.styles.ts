/**
 * Created by 李华良 on 2019-07-30
 */
import { StyleSheet, Dimensions } from 'react-native'

const imgWidth = (Dimensions.get('window').width - 30 - 3) / 2
const imgLHeight = (imgWidth * 155) / 171
const imgRHeight = (imgLHeight - 3) / 2

console.log(imgWidth, imgLHeight, imgRHeight)

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  leftImgBox: {
    alignItems: 'flex-end',
    paddingRight: 1.5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    overflow: 'hidden',
  },
  rightImgBox: {
    alignItems: 'flex-start',
    paddingLeft: 1.5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
  },

  rightTopImgBox: {
    paddingBottom: 1.5,
  },
  rightBtmImgBox: {
    paddingTop: 1.5,
  },

  leftImg: {
    width: imgWidth,
    height: imgLHeight,
  },
  rightTopImg: {
    width: imgWidth,
    height: imgRHeight,
  },
  rightBtmImg: {
    width: imgWidth,
    height: imgRHeight,
  },
})
