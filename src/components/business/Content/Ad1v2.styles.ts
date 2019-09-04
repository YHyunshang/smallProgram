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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    overflow: 'hidden',
    marginRight: 3,
  },
  rightImgBox: {
    flex: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
  },
  rightTopImgBox: {
    height: 71,
    marginBottom: 3,
  },
  rightBtmImgBox: {
    height: 71,
  },
})
