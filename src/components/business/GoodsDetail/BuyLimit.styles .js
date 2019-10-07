/*
 * @Description:Tag.styles.js
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-20 11:29:26
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-07 23:10:01
 */
import {
  StyleSheet
} from 'react-native'
import theme from '@theme'
export default StyleSheet.create({
  container: {
    flex: 1
  },
  buyLimitBg: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buyLimitTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: theme.priceFFPrimary,
    paddingLeft: 15,
    paddingRight: 8
  },
  countDownWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
    marginLeft: 30
  },
  countDownText: {
    fontSize: 12,
    color: '#F32E57',
    marginBottom: 4
  },
  countDownTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  countDownTimeBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    backgroundColor: '#F32E57'
  },
  countDownTimeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  countDownTimeSymbo: {
    color: '#F32E57',
    paddingHorizontal: 4,
    fontSize: 25,
    height: 22,
    lineHeight: 24,
    fontWeight: 'bold'
  },
  countDownTimePinkBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    backgroundColor: '#FF7D98'
  }
})
