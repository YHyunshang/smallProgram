import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'relative',
    minHeight: 160,
  },
  bgImg: {},
  swiper: {
    position: 'absolute',
    bottom: 0,
    left: 7,
    right: 7,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowRadius: 11,
  },
  productBox: {
    alignItems: 'center',
    paddingHorizontal: 7.5,
    paddingTop: 10,
    paddingBottom: 15,
  },
  thumbnail: {
    width: 92,
    height: 92,
    marginBottom: 5,
  },
  name: {
    fontSize: 13,
    fontWeight: '400',
    color: '#4D4D4D',
    marginBottom: 10,
    width: 92,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#FA8500',
    fontWeight: '700',
  },
  pricePrefix: {
    fontSize: 12,
  },
})