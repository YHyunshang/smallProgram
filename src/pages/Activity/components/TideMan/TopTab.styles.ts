/*
 * @Descripttion: 潮物达人顶部tab栏组件
 * @Author: yuwen.liu
 * @Date: 2019-11-12 21:18:25
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-12-06 17:13:23
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
    marginHorizontal: 10,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
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
    // position: 'absolute',
    // left: 13,
    // bottom: 0,
    paddingTop: 13,
    paddingBottom: 10,
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
    bottom: 13,
    height: 14,
    borderRightWidth: 1,
    borderRightColor: '#F2F2F2'
  }
})
