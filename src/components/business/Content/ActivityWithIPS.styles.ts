import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
  },

  bannerBox: {
    position: 'relative',
  },

  image: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  placeholderBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 145,
    height: 40,
  },

  productSwiper: {
    height: 180,
  },

  productBox: {
    paddingHorizontal: 7.5,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  productBoxFirst: {
    marginLeft: 2.5,
  },
  productBoxLast: {
    marginRight: 2.5,
  },

  thumbnailBox: {
    position: 'relative',
    marginBottom: 6,
  },

  thumbnail: {
    width: 92,
    height: 92,
  },

  thumbnailPlaceholderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  thumbnailPlaceholder: {
    width: 92,
    height: 92,
  },

  nameBox: {
    width: 92,
    height: 34,
    justifyContent: 'center',
    marginBottom: 5,
  },

  name: {
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
  },

  price: {
    fontSize: 18,
    color: '#FA8500',
    fontWeight: '600',
    fontFamily: theme.priceFFPrimary,
  },
  pricePrefix: {
    fontSize: 12,
    lineHeight: 20,
  },
})
