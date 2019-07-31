/**
 * Created by 李华良 on 2019-07-30
 */
import {StyleSheet, Dimensions} from "react-native"

const windowDim = Dimensions.get('window')
const imgWidth = Math.floor((windowDim.width - 20 - 5) / 2)

export default StyleSheet.create({
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