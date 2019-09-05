/**
 * Created by 李华良 on 2019-08-19
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {},

  productBox: {
    position: 'relative',
    flexDirection: 'row',
  },

  thumbnailBox: {
    flexShrink: 0,
    flexGrow: 0,
    marginRight: 15,
  },

  infoBox: {
    flex: 1,
    minWidth: 0,
  },

  thumbnail: {
    width: 100,
    height: 100,
  },

  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: theme.black,
    height: 23,
    lineHeight: 23,
  },

  desc: {
    flex: 1,
    fontSize: 13,
    color: theme.gray1,
    height: 19,
    lineHeight: 19,
  },

  tagRow: {
    height: 23,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 25,
    fontFamily: theme.priceFFPrimary,
    marginRight: 5,
    textAlignVertical: 'bottom',
  },
  slashedPrice: {
    color: '#B3B3B3',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 25,
    textDecorationLine: 'line-through',
    textAlignVertical: 'bottom',
  },
  pricePrefix: {
    fontSize: 11,
  },

  cartBox: {
    position: 'absolute',
    right: 0,
    bottom: 3,
    zIndex: 1,
  },
})
