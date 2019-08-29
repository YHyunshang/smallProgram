import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {},

  productBox: {},
  thumbnailBox: {
    marginBottom: 5,
  },
  thumbnail: {
    width: 92,
    height: 92,
  },
  name: {
    fontSize: 13,
    fontWeight: '400',
    height: 18,
    marginBottom: 5,
    textAlign: 'center',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  currentPrice: {
    color: '#FA8500',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 5,
  },
  pricePrefix: {
    fontSize: 12,
  },
  slashedPrice: {
    color: '#B3B3B3',
    fontWeight: '400',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },

  cartBox: {
    position: 'absolute',
    bottom: 10,
    zIndex: 1,
    width: '100%',
    alignItems: 'center',
  },
  cartBtnBox: {
    shadowColor: '#EE4239',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.23,
    elevation: 4,
  },
  gradientBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 10,
    height: 18,
  },
  addIcon: {
    width: 8,
    height: 8,
    marginRight: 3,
  },
  cartBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400',
    // 安卓垂直居中
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
})
