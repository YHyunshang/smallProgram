import { StyleSheet } from 'react-native'
import { WindowWidth } from '@utils/global'

export default StyleSheet.create({
  container: {
    position: 'relative',
  },

  bgBox: {
    position: 'relative',
    paddingBottom: 56,
  },
  bgImg: {
    width: WindowWidth,
    height: (WindowWidth * 264) / 375,
  },

  thumbnailPlaceholderBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 56,
    left: 0,
    zIndex: 1,
    backgroundColor: '#FBFBFB',
    alignItems: 'center',
  },
  thumbnailPlaceholder: {
    marginTop: 60,
    width: 145,
    height: 40,
  },

  swiper: {
    position: 'absolute',
    bottom: 0,
    left: 7,
    right: 7,
    zIndex: 2,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowRadius: 11,
  },
})
