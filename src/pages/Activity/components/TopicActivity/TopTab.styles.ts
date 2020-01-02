/*
 * @Descripttion: 横向tab栏组件
 * @Author: yuwen.liu
 * @Date: 2019-11-12 21:18:25
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-02 16:39:36
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#EBEBEB',
  },
  tabItemBox: {
    marginHorizontal: 15,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  tabActiveItemBox: {
    borderBottomWidth: 2,
    borderBottomColor: theme.primary
  },
  tabLabelActive: {
    color: theme.primary
  },
  tabContent: {
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heightLine:{
    position: 'absolute',
    right: 0,
    bottom: 15,
    height: 14,
    borderRightWidth: 1,
    borderRightColor: '#F2F2F2'
  }
})
