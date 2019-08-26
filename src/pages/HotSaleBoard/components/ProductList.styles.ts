import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  productBox: {
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  productBoxNotLast: {
    marginBottom: 10,
  },
  positionTextBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 9,
    borderTopStartRadius: 4,
    borderBottomEndRadius: 4,
  },
  positionText: {
    fontSize: 10,
    lineHeight: 20,
    color: '#FFF',
  },
})
