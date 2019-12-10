/*
 * @Descripttion: 潮物达人活动组件页面样式
 * @Author: yuwen.liu
 * @Date: 2019-11-12 20:31:29
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-12-10 14:09:09
 */
import { StyleSheet ,Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  tideMancontainer: {
    flex: 1
  },
  tideManList: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFFFFF'
  },
  centerWrapper:{
    flex: 1,
    // height:height-40,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row'
  },
  productBox:{
    // flex: 1
  },
  productWrapper:{
    position: 'relative',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  footerBox: {
    // position:'absolute',
    // bottom:0,
    elevation: 1,
    backgroundColor: '#FFF',
    // shadowColor: 'rgba(0,0,0,0.1)',
    // shadowOpacity: 1,
    // shadowRadius: 10,
  },
  fakeBorder: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 0.5,
    backgroundColor: '#EEE',
  },
  noBar: {
    width: (width - 90) / 2,
    paddingHorizontal: 5
  },
  gridWrapper: {
   backgroundColor: '#FAFAFA'
  }
})
