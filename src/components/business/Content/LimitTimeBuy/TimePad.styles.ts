import theme from '@theme'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    textAlign: 'center',
    fontFamily: theme.timerFont,
    fontSize: 13,
  },
})
