/*
 * @Author: 李华良
 * @Date: 2019-09-26 15:52:49
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-26 17:26:40
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 15,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: theme.black,
  },
  navBox: {
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    color: '#BEBEBE',
    fontSize: 13,
  },
  navIcon: {
    width: 10,
    height: 10,
    marginLeft: 3,
  },
})
