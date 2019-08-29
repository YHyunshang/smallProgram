import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  cartBox: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    shadowColor: '#EE4239',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.23,
    elevation: 4,
  },
  gradientBox: {
    borderRadius: 24,
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  cartImg: {
    width: 14,
    height: 14,
  },

  countOperBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
})
