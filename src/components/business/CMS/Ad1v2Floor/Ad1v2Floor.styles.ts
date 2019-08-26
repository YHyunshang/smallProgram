/**
 * Created by 李华良 on 2019-07-30
 */
import { StyleSheet, Dimensions } from 'react-native'

const windowDim = Dimensions.get('window')
const imgWidth = Math.floor((windowDim.width - 20 - 5) / 2)

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftImgBox: {
    width: imgWidth,
    borderRadius: 5,
    overflow: 'hidden',
  },
  rightImgBox: {
    width: imgWidth,
    justifyContent: 'space-between',
    borderRadius: 5,
    overflow: 'hidden',
  },
  rightTopImg: {
    marginBottom: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  rightBtmImg: {
    borderRadius: 5,
    overflow: 'hidden',
  },
})
