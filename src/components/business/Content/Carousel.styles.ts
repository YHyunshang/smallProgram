/**
 * Created by 李华良 on 2019-08-19
 */
import { StyleSheet } from 'react-native'
import { Global } from '@utils'

export default StyleSheet.create({
  container: {},
  pagination: {
    bottom: 10,
  },
  dot: {
    width: 5,
    height: 5,
    opacity: 0.5952,
    backgroundColor: '#fff',
  },
  activeDot: {
    width: 13,
    height: 5,
    opacity: 1,
    backgroundColor: '#fff',
  },
  slider: {
    justifyContent: 'flex-end',
    backgroundColor: '#eee',
    position: 'relative',
  },
  image: {
    width: Global.WindowWidth,
  },

  placeholderBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
  },
  placeholder: {
    width: 170,
    height: 56,
  },
})
