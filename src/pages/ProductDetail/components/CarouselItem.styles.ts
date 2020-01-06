import { placeholderBox } from './../../../constants/resources'
import { WindowWidth } from './../../../utils/global'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'relative',
  },

  contentImg: {
    width: WindowWidth,
    height: WindowWidth,
  },

  placeholderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#FBFBFB',
    width: WindowWidth,
    height: WindowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderImg: {
    width: 170,
    height: 56,
  },
})
