import { StyleSheet } from 'react-native'
import { WindowWidth } from '@utils/global'

export default StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 10,
  },

  fakeBorder: {
    backgroundColor: '#FFF',
    height: 40,
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  bgBox: {
    position: 'relative',
    paddingBottom: 56,
  },
  bgImg: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    overflow: 'hidden',
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
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 11,
    elevation: 2,
  },
})
