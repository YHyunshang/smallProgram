import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {},

  productBox: {
    width: 97,
  },
  thumbnailBox: {
    position: 'relative',
    marginBottom: 5,
  },
  thumbnail: {
    width: 97,
    height: 97,
  },

  tagRow: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  tag: {
    paddingHorizontal: 3,
    color: theme.red,
  },

  inventoryBox: {
    position: 'absolute',
    top: 37.5,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inventoryLabelBg: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 11,
    overflow: 'hidden',
  },

  inventoryLabel: {
    fontSize: 11,
    lineHeight: 22,
    paddingHorizontal: 10,
    color: '#FFF',
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
    textAlign: 'center',
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

  soldOutText: {
    fontSize: 12,
    color: theme.gray1,
    lineHeight: 20,
  },
})
