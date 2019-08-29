/**
 * Created by 李华良 on 2019-08-19
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {},

  productBox: {
    position: 'relative',
    flexDirection: 'row',
  },

  thumbnailBox: {
    flexShrink: 0,
    flexGrow: 0,
    marginRight: 10,
  },

  infoBox: {
    flexGrow: 0,
  },

  thumbnail: {
    width: 75,
    height: 75,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4D4D4D',
  },

  tagRow: {
    paddingTop: 8,
    height: 40,
    flexDirection: 'row',
  },
  tag: {
    fontSize: 10,
    fontWeight: '400',
    height: 16,
    lineHeight: 16,
    paddingHorizontal: 5,
    color: '#FF3914',
    backgroundColor: 'rgba(255,222,217,1)',
    borderRadius: 1,
    marginRight: 5,
  },
  spec: {
    fontSize: 10,
    fontWeight: '400',
    height: 16,
    lineHeight: 16,
    paddingHorizontal: 3,
    color: '#6D7278',
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 1,
    marginRight: 5,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  currentPrice: {
    color: '#FA8500',
    fontWeight: '600',
    fontSize: 22,
    marginRight: 13,
    textAlignVertical: 'bottom',
  },
  slashedPrice: {
    color: '#B3B3B3',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
    textDecorationLine: 'line-through',
    textAlignVertical: 'bottom',
  },
  pricePrefix: {
    fontSize: 15,
  },

  cartBox: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    zIndex: 1,
  },
})
