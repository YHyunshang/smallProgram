/*
 * @Descripttion: 
 * @Author: yuwen.liu
 * @Date: 2019-11-12 21:18:25
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-13 16:29:58
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    width:80,
    backgroundColor: '#FAFAFA'
  },
  tabItemBox: {
    height:48,
    borderRightWidth: 0.5,
    borderRightColor: '#E6E6E6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabItemBoxActive:{
    backgroundColor:'#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E6E6',
    borderRightWidth: 0
  },
  heightLine:{
    position:'absolute',
    left:0,
    borderLeftWidth:3,
    height:15,
    borderLeftColor:theme.primary
  },
  tabLabel: {
    fontSize: 13,
    color: '#404040'
  },
  tabLabelActive: {
    color: theme.primary,
    fontSize: 15,
    fontWeight: '600'
  },
})
