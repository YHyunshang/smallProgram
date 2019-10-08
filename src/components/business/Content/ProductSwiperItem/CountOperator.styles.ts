/*
 * @Author: 李华良
 * @Date: 2019-09-05 18:26:59
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-06 17:22:49
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {},

  cartBtnBox: {
    position: 'absolute',
    flex: 1,
    right: 0,
  },
  cartBtn: {
    width: 65,
    height: 20,
  },
  gradientBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 10,
    height: 20,
    width: 65,
  },
  addIcon: {
    width: 8,
    height: 8,
    marginRight: 3,
  },
  cartBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400',
    // 安卓垂直居中
    textAlignVertical: 'center',
    includeFontPadding: false,
  },

  countOperatorBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  operImg: {
    width: 20,
    height: 20,
  },
  countText: {
    minWidth: 25,
    paddingHorizontal: 3,
    textAlign: 'center',
  },
})
