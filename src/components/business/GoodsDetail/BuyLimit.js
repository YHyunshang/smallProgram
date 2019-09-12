/*
 * @Description: Tag标签组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-12 18:30:46
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
      seconds: 0
    }
  }
 countTime = () => {
   let date = new Date()
   let now = date.getTime()
   let time = '2019-09-13 00:00:00'
   time = time.replace(/-/g, '/') // 把所有-转化成/
   let end = new Date(time).getTime(),
     // end = 1568900000000,
     leftTime = end - now, // 时间差
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
   }
   this.setState({day: d, hour: h, minute: m, seconds: s})
   setTimeout(this.countTime, 50)
 }

 componentDidMount() {
   this.countTime()
 }

 componentWillUnmount() {

 }

 render() {
   const {day, hour, minute, seconds} = this.state
   return (
     <View style={styles.container}>
       <ImageBackground style={styles.buyLimitBg} source={buyLimit} resizeMode='cover'>
         <Text style={styles.buyLimitTitle}>限时抢购</Text>
         <View style={styles.bgWrapper}>
           <View style={styles.whiteBg}></View>
           <View style={styles.pinkBg}>
             <Text style={styles.saleNum}>已售32%</Text>
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
     </View>
   )
 }
}
