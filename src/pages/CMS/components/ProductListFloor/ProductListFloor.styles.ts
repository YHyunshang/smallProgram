/**
 * Created by 李华良 on 2019-07-16
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.06)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 11,
    elevation: 1,  // only for android
  },
  productItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  divider: {
    marginLeft: 95,
    marginRight: 10,
    borderTopWidth: 0.5,
    borderColor: '#EEEEEE',
  }
})