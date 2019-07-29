/**
 * Created by 李华良 on 2019-07-18
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingRight: 10,
  },
  productItem: {
    width: 137,
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.06)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 11,
    elevation: 5,  // only for android
  }
})
