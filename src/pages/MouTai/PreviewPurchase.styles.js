/*
 * @Description: 茅台预购页面页面样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-05 09:56:04
 */
import {StyleSheet, Dimensions} from 'react-native'
import theme from '@theme'
const {height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    height,
    flex: 1
  },
  headBannerImage: {
    width: '100%',
    height: 320
  },
  headBanner: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  purchaseNumberWrapper: {
    width: 351,
    height: 234,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {h: 10, w: 10},
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5
  },
  emptyWrapper: {
    width: 351,
    height: 234,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {h: 10, w: 10},
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5
  },
  defaultImage: {
    width: 125,
    height: 125
  },
  defaultText: {
    fontSize: 16,
    color: '#38A295',
    fontWeight: 'bold'
  },
  purchaseTips: {
    fontSize: 16,
    color: '#4D4D4D',
    fontWeight: 'bold',
    marginTop: 24
  },
  quantityText: {
    fontSize: 64,
    color: '#333333',
    fontFamily: theme.priceFFPrimary
  },
  standardsText: {
    position: 'absolute',
    fontSize: 14,
    color: '#333333',
    right: 15,
    bottom: 15
  },
  purchaseProductName: {
    fontSize: 13,
    color: '#C1882C'
  },
  stockNumberWrapper: {
    width: 351,
    height: 146,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginTop: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {h: 10, w: 10},
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5
  },
  stockNumberTips: {
    fontSize: 16,
    color: '#4D4D4D',
    fontWeight: 'bold',
    marginTop: 24
  },
  operateButton: {
    width: '100%',
    height: 47,
    backgroundColor: '#F7FAF9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    borderTopWidth: 0.5,
    borderTopColor: '#E8E8E5'
  },
  splitLine: {
    width: 0.5,
    height: 47,
    backgroundColor: '#E8E8E5'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#06B288'
  },
  explainWrapper: {
    marginTop: 48,
    marginBottom: 40
  },
  explainTextWrapper: {
    // width: 336,
    // marginBottom: 6,
    // marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  explainText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9ED7C7'
  },
  purchaseQualification: {
    marginTop: 10
    // marginLeft: 12
  },
  qualificationBoldText: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingBottom: 4,
    color: '#9ED7C7'
  },
  qualificationText: {
    fontSize: 13,
    paddingBottom: 4,
    color: '#9ED7C7'
  },
  goHomeButton: {
    width: 351,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  goHomeShadow: {
    shadowColor: 'rgba(26, 50, 45, 0.35)',
    shadowOffset: {h: 2, w: 7},
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 5,
    marginBottom: 57
  },
  goHomeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B5750C'
  },
  availableInfo: {
    width: '100%',
    height: 44,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  availableQuantityText: {
    fontSize: 13,
    marginLeft: 8,
    color: '#FFBD65'
  },
  buyButton: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    // shadowColor: 'rgba(136, 136, 136, 0.49)',
    // shadowOffset: {h: 2, w: 6},
    // shadowRadius: 5,
    // shadowOpacity: 1,
    // elevation: 5,
    borderTopWidth: 0.5,
    borderTopColor: '#E8E8E5'
  },
  leftWrapper: {
    width: 214,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  leftText: {
    fontSize: 13,
    color: '#4D4D4D'
  },
  rightWrapper: {
    width: 161,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buyText: {
    fontSize: 18,
    color: '#B5750C',
    fontWeight: 'bold'
  },
  noActivityWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90
  },
  noActivityImage: {
    width: 190,
    height: 190
  },
  noActivityText: {
    fontSize: 16,
    paddingTop: 19,
    textAlign: 'center',
    color: '#4A4A4A'
  },
  noActivityOtherText: {
    fontSize: 14,
    paddingTop: 16,
    textAlign: 'center',
    color: '#A4A4B4'
  },
  goSee: {
    width: 110,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 13,
    backgroundColor: '#41B25D'
  },
  goSeeText: {
    fontSize: 14,
    color: '#FFFFFF'
  }
})
