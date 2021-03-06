/**
 * Created by 李华良 on 2019-11-26
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'
import { WindowWidth } from '@utils/global'

export default StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: theme.white,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.10)',
  },
  activeDot: {
    backgroundColor: theme.primary,
  },
  paginationStyle: {
    bottom: 10,
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
