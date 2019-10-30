/*
 * @Description:资格查询页面页面样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-30 16:09:34
 */
import {StyleSheet, Dimensions} from 'react-native'
import theme from '@theme'
const {height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  topBanner: {
    width: '100%',
    height: 146,
    backgroundColor: '#06B288',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  currentPointText: {
    fontSize: 16,
    color: '#FCFCFC',
    fontWeight: 'bold',
    marginTop: 26
  },
  currentPointValue: {
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: theme.priceFFPrimary
  },
  tipsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  tips: {
    fontSize: 12,
    color: '#F2FFFC',
    opacity: 0.6,
    marginLeft: 5
  },
  centerBanner: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  monthCountWrapper: {
    width: 345,
    borderRadius: 5,
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowColor: 'rgba(141, 155, 151, 0.1)',
    shadowOffset: {h: 15, w: 2},
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5
  },
  monthCountHeight: {
    width: '100%',
    height: 44,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E8E8E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  monthCountText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333333',
    paddingLeft: 15
  },
  totalNumber: {
    fontSize: 12,
    color: '#4D4D4D',
    paddingRight: 15
  },
  buyList: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 10

  },
  buyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15
  },
  monthInfo: {
    fontSize: 13,
    color: '#808080',
    paddingLeft: 15
  },
  numberInfo: {
    fontSize: 13,
    color: '#808080',
    paddingRight: 15
  },
  normsInfo: {
    fontSize: 13,
    color: '#C1882C'
  },
  operateButton: {
    width: '100%',
    height: 36,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#E8E8E5'
  },
  operateText: {
    fontSize: 12,
    color: '#06B288'
  },
  yearWrapper: {
    width: 345,
    minHeight: 104,
    borderRadius: 5,
    marginTop: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(141, 155, 151, 0.1)',
    shadowOffset: {h: 15, w: 2},
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5
  },
  emptyRecordWrapper: {
    width: 345,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    height: 57,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(141, 155, 151, 0.1)',
    shadowOffset: {h: 15, w: 2},
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5
  },
  emptyRecordText: {
    fontSize: 13,
    color: '#808080',
    paddingLeft: 15
  },
  goHome: {
    fontSize: 13,
    color: '#06B288',
    paddingRight: 15
  },
  yearItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  yearBold: {
    fontSize: 30,
    color: '#595959',
    lineHeight: 30,
    marginRight: 5,
    fontFamily: theme.priceFFPrimary
  },
  yearText: {
    fontSize: 15,
    color: '#808080'
  },
  yearBox: {
    width: 40,
    height: 30,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06B288'
  },
  yearNumber: {
    fontSize: 30,
    lineHeight: 32,
    fontFamily: theme.priceFFPrimary,
    color: '#FFFFFF'
  },
  yearNorms: {
    fontSize: 13,
    color: '#808080',
    marginLeft: 8
  },
  limitWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  limitText: {
    fontSize: 11,
    color: '#FF5333'
  }

})
