/*
 * @Descripttion: 
 * @Author: yuwen.liu
 * @Date: 2019-11-12 21:18:25
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-13 16:32:19
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 11,
    elevation: 0.8,
  },
  tabItemBox: {
    padding: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EBEBEB'
  },
  tabItemBoxFirst: {
    marginLeft: 4,
  },
  tabItemBoxLast: {
    marginRight: 4,
  },
  tabLabel: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: theme.primary,
  },
})
