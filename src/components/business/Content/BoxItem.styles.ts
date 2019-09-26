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
  },
  boxImg: {
    width: 52,
    height: 52,
  },
  boxText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: theme.black,
  },
})
