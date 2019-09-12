/*
 * @Description:Tag.styles.js
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-20 11:29:26
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-12 16:33:51
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
    justifyContent: 'space-between'
  },
  bgWrapper: {
    width: 120,
    height: 13,
    flexDirection: 'row',
    position: 'relative',
    flex: 1
  },
  buyLimitTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: theme.priceFFPrimary,
    paddingLeft: 15,
    paddingRight: 8
  },
  whiteBg: {
    zIndex: 10,
    width: 50,
    height: 13,
    backgroundColor: '#FFFFFF',
    borderRadius: 7
  },
  pinkBg: {
    position: 'absolute',
    zIndex: 1,
    left: 40,
    width: 70,
    height: 13,
    backgroundColor: '#FFACBA',
    borderRadius: 7
  },
  saleNum: {
    fontSize: 10,
    color: '#F32E57',
    marginRight: 5,
    textAlign: 'right'
  },
  countDownWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15
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
