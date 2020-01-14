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
    position: 'relative',
  },

  thumbnailPlaceholderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  thumbnailPlaceholder: {
    width: 100,
    height: 100,
  },

  productTagRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
  },

  inventoryBox: {
    position: 'absolute',
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

  infoBox: {
    flex: 1,
    minWidth: 0,
  },

  thumbnail: {},

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.black,
    height: 23,
    lineHeight: 23,
  },

  desc: {
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
  inventoryPercentage: {
    width: 120,
    marginRight: 10,
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
    height: 17,
    lineHeight: 17,
    paddingHorizontal: 3,
    color: '#6D7278',
    backgroundColor: 'rgba(245,245,245,1)',
    borderRadius: 2,
    overflow: 'hidden',
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
  expectPrice: {
    fontSize: 12,
    lineHeight: 25,
    color: '#FF3914',
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
