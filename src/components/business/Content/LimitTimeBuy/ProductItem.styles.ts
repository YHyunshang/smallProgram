/**
 * Created by 李华良 on 2019-09-29
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  thumbnailBox: {
    position: 'relative',
  },
  thumbnail: {
    width: 60,
    height: 60,
  },

  thumbnailPlaceholderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: '#FBFBFB',
  },
  thumbnailPlaceholder: {
    width: 60,
    height: 60,
  },

  detailBox: {
    paddingLeft: 10,
    flex: 1,
    height: 60,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 13,
    color: theme.black,
  },
  spec: {
    fontSize: 12,
    color: theme.gray1,
  },
  priceRow: {},
  waiting: {
    color: '#E74646',
    fontSize: 11,
    paddingRight: 5,
  },
  price: {
    color: '#E74646',
    fontSize: 18,
    textAlignVertical: 'bottom',
    fontFamily: theme.priceFFPrimary,
    paddingRight: 3,
  },
  pricePrefix: {
    fontSize: 11,
  },
  slashedPrice: {
    fontSize: 10,
    color: theme.slashedPrice,
    textDecorationLine: 'line-through',
    textAlignVertical: 'bottom',
    paddingBottom: 1.5,
  },
})
