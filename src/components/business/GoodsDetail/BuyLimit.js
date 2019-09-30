/*
 * @Description: Tag标签组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-30 18:06:16
 */

import React from 'react'
import {
  Text,
  View,
  NativeModules,
  ImageBackground
} from 'react-native'
import styles from './BuyLimit.styles '
const rnAppModule = NativeModules.RnAppModule// 原生模块
// 限时抢购背景图片
import {buyLimit} from '@const/resources'
export default class BuyLimit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: 0,
      hour: 0,
      minute: 0,
      seconds: 0,
      isShow: true, // 是否展示限时抢购
      activityEndTime: ''
    }
  }
 countTime = () => {
   let date = new Date()
   let now = date.getTime()
   let end = this.state.activityEndTime
   let leftTime = end - now, // 时间差
     d, h, m, s, ms
   if (leftTime >= 0) {
     d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
     h = Math.floor(leftTime / 1000 / 60 / 60)
     m = Math.floor(leftTime / 1000 / 60 % 60)
     s = Math.floor(leftTime / 1000 % 60)
     ms = Math.floor(leftTime % 1000)
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
     if (m == '00' && s == '00') {
       this.setState({isShow: false})
     }
   } else {
     // this.setState({isShow: false})
   }
   this.setState({day: d, hour: h, minute: m, seconds: s})
   setTimeout(this.countTime, 50)
 }

 componentDidMount() {
   const {productActivityLabel} = this.props
   // let time = productActivityLabel.activityEndTime.replace(/-/g, '/') // 把所有-转化成/
   // let end = new Date(time).getTime()
   // this.setState({activityEndTime: productActivityLabel.activityEndTime})
   this.setState({activityEndTime: productActivityLabel.activityEndTime})
   this.countTime()
 }

 componentWillUnmount() {

 }
 componentWillReceiveProps(nextProps) {
 }

 render() {
   const {day, hour, minute, seconds, isShow} = this.state
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
             <View style={styles.bgWrapper}>
               <View style={styles.whiteBg}></View>
               <View style={styles.pinkBg}>
                 {
                   productActivityLabel && productActivityLabel.salesRatio ?
                     <Text style={styles.saleNum}>已售{productActivityLabel.salesRatio}</Text>
                     : null
                 }

               </View>
             </View>
             <View style={styles.countDownWrapper}>
               <Text style={styles.countDownText}>离本场结束：</Text>
               <View style={styles.countDownTime}>
                 <View style={styles.countDownTimeBg}>
                   <Text style={styles.countDownTimeText}>{day}</Text>
                 </View>
                 <Text style={styles.countDownTimeSymbo}>:</Text>
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
