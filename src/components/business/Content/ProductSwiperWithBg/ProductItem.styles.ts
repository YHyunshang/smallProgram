/**
 * Created by 李华良 on 2019-12-03
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  productBox: {
    alignItems: 'center',
    paddingHorizontal: 7.5,
    paddingTop: 10,
    paddingBottom: 6,
  },
  thumbnailBox: {
    position: 'relative',
  },
  thumbnail: {
    width: 92,
    height: 92,
    marginBottom: 5,
  },
  thumbnailPlaceholderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  thumbnailPlaceholder: {
    width: 92,
    height: 92,
  },

  name: {
    fontSize: 13,
    fontWeight: '400',
    color: theme.black,
    maxWidth: 92,
    height: 23,
    lineHeight: 23,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#FA8500',
    lineHeight: 26,
    fontFamily: theme.priceFFPrimary,
    fontWeight: '700',
  },
  pricePrefix: {
    fontSize: 12,
  },
})
