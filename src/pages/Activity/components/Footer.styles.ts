import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIconBox: {
    marginLeft: 18,
    position: 'relative',
  },
  cartImg: {
    width: 24,
    height: 24,
  },
  cartBadge: {
    minWidth: 20,
    backgroundColor: '#FF3914',
    color: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  price: {
    flex: 1,
    textAlign: 'right',
    color: '#FA8500',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: theme.priceFFPrimary,
    paddingHorizontal: 10,
  },
  pricePrefix: {
    fontSize: 14,
    paddingRight: 5,
  },
  cartPageNavBox: {
    paddingHorizontal: 36,
    paddingVertical: 14,
  },
  navText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
    textAlign: 'center',
  },
})
