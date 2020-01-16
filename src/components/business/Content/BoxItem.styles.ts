/**
 * Created by 李华良 on 2019-07-30
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  box: {
    height: 74,
    paddingHorizontal: 1.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  boxImg: {
    width: 52,
    height: 52,
  },
  boxText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',
    color: theme.black,
  },

  placeholderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
  },
  placeholder: {
    width: 52,
    height: 52,
  },
})
