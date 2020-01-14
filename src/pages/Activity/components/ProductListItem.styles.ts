import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 15,
    position: 'relative',
  },

  fakeDivider: {
    backgroundColor: '#EEE',
    height: 0.5,
    position: 'absolute',
    left: 15,
    right: 15,
    top: 0,
    zIndex: 1,
  },
})
