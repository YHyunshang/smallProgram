import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.06)',
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
    width: 92,
    height: 92,
    marginBottom: 6,
  },

  nameBox: {
    width: 92,
    height: 34,
    justifyContent: 'center',
    marginBottom: 6,
  },

  name: {
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'center',
  },

  price: {
    fontSize: 18,
    color: '#FA8500',
    fontWeight: '600',
  },
  pricePrefix: {
    fontSize: 12,
    lineHeight: 20,
  },
})
