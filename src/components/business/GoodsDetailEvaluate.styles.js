/*
 * @Description: 商品详情评论部分样式
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-07 14:17:24
 */
import {StyleSheet} from 'react-native'
export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  wrapperItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  goodsEvalute: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    paddingRight: 12
  },
  favorableRate: {
    fontSize: 15,
    color: '#EE4239'
  },
  seeAll: {
    fontSize: 15,
    color: '#9B9B9B',
    paddingRight: 9
  },
  noEvaluation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    fontSize: 14,
    color: '#a3a09b',
    backgroundColor: '#ffffff'
  },
  noEvaluationText: {
    fontSize: 14,
    color: '#a3a09b'
  },
  goodsMaxBorder: {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#FBFBFB'
  },
  evaluteWrapper: {
    flexDirection: 'row',
    marginTop: 5
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 15,
    marginLeft: 10
  },
  evaluteInfo: {
    flexDirection: 'row'
  },
  evaluteName: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    marginRight: 5
  },
  memberIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 16,
    backgroundColor: '#383530',
    borderRadius: 8,
    color: '#F6DDA1'
  },
  memberText: {
    marginLeft: 4,
    fontSize: 11,
    color: '#F6DDA1'
  },
  evaluteTime: {
    fontSize: 12,
    color: '#848791',
    marginTop: 4
  },
  evaluteContentBlock: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 20
  },
  evaluteContent: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600'
  }
})
