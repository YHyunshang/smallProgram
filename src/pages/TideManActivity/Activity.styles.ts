/*
 * @Descripttion: 潮物达人活动页面样式
 * @Author: yuwen.liu
 * @Date: 2019-11-12 20:31:29
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-13 17:36:59
 */
import { StyleSheet ,Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    height
  },
  centerWrapper:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  productBox:{
    flex: 1
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
  }
})
