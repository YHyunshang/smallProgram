/*
 * @Descripttion:
 * @Author: yuwen.liu
 * @Date: 2019-10-14 10:30:28
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-14 10:31:14
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  filterBtn: {
    flex: 1,
  },
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 76,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 0.5,
    height: 37,
    flex: 1,
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  filterTextActive: {
    color: theme.primary,
    fontWeight: '600',
  },
  filterImg: {
    width: 10,
    height: 8,
    marginLeft: 4,
  },
  sortImg: {
    width: 7,
    height: 11,
    marginLeft: 4,
  },
})
