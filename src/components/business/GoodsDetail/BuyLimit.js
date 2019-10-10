/*
 * @Description:   限时抢购组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-10 14:45:47
 */

import React from 'react'
import {
  Text,
  View,
  ImageBackground,
  NativeModules
} from 'react-native'
import Progress from '../../common/Progress'
import styles from './BuyLimit.styles '
// 限时抢购背景图片
import {buyLimit} from '@const/resources'
const rnAppModule = NativeModules.RnAppModule// 原生模块
let timer = null // 倒计时
export default class BuyLimit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: 0,
      hour: 0,
      minute: 0,
      seconds: 0,
      isShow: true, // 是否展示限时抢购
      activityEndTime: '', // 活动结束时间
      activityBeginTime: ''// 活动开始时间
    }
  }
 countTime = () => {
   let date = new Date()
   let now = date.getTime()
   let end = this.state.activityEndTime
   let start = this.state.activityBeginTime
   let startLeftTime = now - start // 活动开始时间差
   let endLeftTime = end - now, // 活动结束时间差
     d, h, m, s, ms
   // rnAppModule.showToast(String(startLeftTime), '0')
   if (endLeftTime >= 0 && startLeftTime >= 0) {
     this.setState({isShow: true})
     d = Math.floor(endLeftTime / 1000 / 60 / 60 / 24)
     h = Math.floor(endLeftTime / 1000 / 60 / 60)
     m = Math.floor(endLeftTime / 1000 / 60 % 60)
     s = Math.floor(endLeftTime / 1000 % 60)
     ms = Math.floor(endLeftTime % 1000)
     if (ms < 100) {
       ms = `0${ms}`
     }
     if (s < 10) {
       s = `0${s}`
     }
     if (m < 10) {
       m = `0${m}`
     }
     if (h < 10) {
       h = `0${h}`
     }
     if (d < 10) {
       d = `0${d}`
     }
     if (h == '00' && m == '00' && s == '00') {
       this.setState({isShow: false})
     }
   } else {
     this.setState({isShow: false})
   }
   this.setState({day: d, hour: h, minute: m, seconds: s})
   timer = setTimeout(this.countTime, 50)
 }

 componentDidMount() {
   const {productActivityLabel} = this.props
   //  let time = productActivityLabel.activityEndTime.replace(/-/g, '/') // 把所有-转化成/
   //  let end = new Date(time).getTime()
   //  let activityBeginTime = productActivityLabel.activityBeginTime.replace(/-/g, '/') // 把所有-转化成/
   //  let startTime = new Date(activityBeginTime).getTime()
   //  this.setState({activityEndTime: end})
   //  this.setState({activityBeginTime: startTime})
   this.setState({activityEndTime: productActivityLabel.activityEndTime})
   this.setState({activityBeginTime: productActivityLabel.activityBeginTime})
   this.countTime()
 }

 componentWillUnmount() {
   if (timer) {
     clearTimeout(timer)
   }
 }
 componentWillReceiveProps(nextProps) {
 }

 render() {
   const {hour, minute, seconds, isShow} = this.state
   const {productActivityLabel} = this.props
   return (
     <View style={styles.container}>
       {
         isShow ?
           <ImageBackground style={styles.buyLimitBg} source={buyLimit} resizeMode='cover'>
             {
               productActivityLabel && productActivityLabel.promotionTypeName ?
                 <Text style={styles.buyLimitTitle}>{productActivityLabel.promotionTypeName}</Text>
                 : null
             }
             <Progress saleNum={productActivityLabel.salesRatio}></Progress>
             <View style={styles.countDownWrapper}>
               <Text style={styles.countDownText}>离本场结束：</Text>
               <View style={styles.countDownTime}>
                 {/* <View style={styles.countDownTimeBg}>
                   <Text style={styles.countDownTimeText}>{day}</Text>
                 </View>
                 <Text style={styles.countDownTimeSymbo}>:</Text> */}
                 <View style={styles.countDownTimeBg}>
                   <Text style={styles.countDownTimeText}>{hour}</Text>
                 </View>
                 <Text style={styles.countDownTimeSymbo}>:</Text>
                 <View style={styles.countDownTimeBg}>
                   <Text style={styles.countDownTimeText}>{minute}</Text>
                 </View>
                 <Text style={styles.countDownTimeSymbo}>:</Text>
                 <View style={styles.countDownTimePinkBg}>
                   <Text style={styles.countDownTimeText}>{seconds}</Text>
                 </View>
               </View>
             </View>
           </ImageBackground>
           : null
       }
     </View>
   )
 }
}
