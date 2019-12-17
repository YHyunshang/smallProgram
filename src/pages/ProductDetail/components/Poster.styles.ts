/**
 * Created by 李华良 on 2019-11-27
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },

  posterBox: {
    position: 'relative',
    backgroundColor: theme.white,
    shadowColor: '#ddd',
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 10,
  },
  poster: {
    width: 246,
    height: 365,
    overflow: 'hidden',
  },

  btnSave: {
    width: 246,
    height: 45,
    backgroundColor: '#EE4239',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  btnText: {
    fontSize: 16,
    color: theme.white,
  },

  tips: {
    marginTop: 10,
    fontSize: 12,
    color: theme.gray1,
  },
})
