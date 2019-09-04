import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {},

  productBox: {
    width: 97,
  },
  thumbnailBox: {
    marginBottom: 5,
  },
  thumbnail: {
    width: 97,
    height: 97,
  },
  name: {
    fontSize: 13,
    fontWeight: '400',
    color: theme.black,
    height: 18,
    marginBottom: 5,
    textAlign: 'center',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  currentPrice: {
    color: theme.orange,
    fontFamily: theme.priceFFPrimary,
    fontSize: 22,
    fontWeight: '600',
    marginRight: 5,
    textAlignVertical: 'bottom',
  },
  pricePrefix: {
    fontSize: 11,
  },
  slashedPrice: {
    color: theme.gray1,
    fontWeight: '400',
    fontSize: 11,
    textDecorationLine: 'line-through',
    lineHeight: 22,
    textAlignVertical: 'bottom',
  },

  cartBox: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%',
    alignItems: 'center',
  },
  cartBtnBox: {
    // shadowColor: '#EE4239',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // shadowOpacity: 0.23,
    // elevation: 4,
  },
  gradientBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 10,
    height: 20,
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
