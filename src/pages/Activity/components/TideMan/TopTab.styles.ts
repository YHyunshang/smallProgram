/*
 * @Descripttion: 
 * @Author: yuwen.liu
 * @Date: 2019-11-12 21:18:25
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-26 10:26:54
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
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EBEBEB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  tabActiveItemBox: {
    position: 'absolute',
    width: 60,
    left: 13,
    bottom: 0,
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
    height: 14,
    borderRightWidth: 1,
    borderRightColor: '#F2F2F2'
  }
})
