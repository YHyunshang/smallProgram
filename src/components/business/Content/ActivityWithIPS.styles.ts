import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowRadius: 11,
    shadowOpacity: 1,
  },
  image: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  productSwiper: {},

  productBox: {
    paddingHorizontal: 7.5,
    paddingTop: 10,
    paddingBottom: 15,
    alignItems: 'center',
  },
  productBoxFirst: {
    marginLeft: 2.5,
  },
  productBoxLast: {
    marginRight: 2.5,
  },

  thumbnail: {
    margin: 10,
    width: 72,
    height: 72,
    marginBottom: 16,
  },

  nameBox: {
    width: 92,
    height: 34,
    justifyContent: 'center',
    marginBottom: 6,
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
