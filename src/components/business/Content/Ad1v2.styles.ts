/**
 * Created by 李华良 on 2019-07-30
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftImgBox: {
    flex: 1,
    height: 145,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 5,
  },
  rightImgBox: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  rightTopImgBox: {
    height: 70,
    marginBottom: 5,
  },
  rightBtmImgBox: {
    height: 70,
  },

  rightTopImg: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  rightBtmImg: {
    borderRadius: 5,
    overflow: 'hidden',
  },
})
