/*
 * @Description: 资格查询页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-28 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-30 16:18:58
 */
import React from 'react'
import {View, Text, Image, NativeModules, TouchableOpacity} from 'react-native'
import {Native} from '@utils'
import styles from './QualificationsQuery.styles'
import {greenWarn} from '@const/resources'
const rnAppModule = NativeModules.RnAppModule// 原生模块
export default class QualificationsQuery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  /**
   * @msg: 跳转至首页
   */
  handleGoHome() {
    Native.navigateTo({
      type: Native.NavPageType.RN,
      uri: 'RNHome',
      params: {}
    })
  }
  componentDidMount() {
    Native.setTitle('资格查询')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBanner}>
          <Text style={styles.currentPointText}>您目前的可使用积分</Text>
          <Text style={styles.currentPointValue}>2400</Text>
          <View style={styles.tipsWrapper}>
            <Image source={greenWarn} style={{width: 14, height: 14}}></Image>
            <Text style={styles.tips}>根据历史消费记录，累计积分核定当前茅台预购资格</Text>
          </View>
        </View>
        <View style={styles.centerBanner}>
          <View style={styles.monthCountWrapper}>
            <View style={styles.monthCountHeight}>
              <Text style={styles.monthCountText}>月度换购统计</Text>
              <Text style={styles.totalNumber}>总计12瓶</Text>
            </View>
            <View>
              <View style={styles.buyList}>
                <View style={styles.buyItem}>
                  <Text style={styles.monthInfo}>2019年09月</Text>
                  <Text style={styles.numberInfo}>换购<Text style={styles.normsInfo}>1瓶</Text></Text>
                </View>
                <View style={styles.buyItem}>
                  <Text style={styles.monthInfo}>2019年09月</Text>
                  <Text style={styles.numberInfo}>换购<Text style={styles.normsInfo}>1瓶</Text></Text>
                </View>
                <View style={styles.buyItem}>
                  <Text style={styles.monthInfo}>2019年09月</Text>
                  <Text style={styles.numberInfo}>换购<Text style={styles.normsInfo}>1瓶</Text></Text>
                </View>
                <View style={styles.buyItem}>
                  <Text style={styles.monthInfo}>...</Text>
                </View>
              </View>
              <View style={styles.operateButton}>
                <Text style={styles.operateText}>展开全部记录</Text>
              </View>
              {/* <View style={styles.emptyRecordWrapper}>
                <Text style={styles.emptyRecordText}>暂无换购记录</Text>
                <TouchableOpacity
                  style={styles.shareTouchableOpacity}
                  activeOpacity={0.95}
                  onPress={() => {
                    this.handleGoHome()
                  }} >
                  <Text style={styles.goHome}>去首页 ></Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
          <View style={styles.yearWrapper}>
            <View style={styles.yearItem}>
              <Text style={styles.yearBold}>2019</Text>
              <Text style={styles.yearText}>年，剩余可换购数量：</Text>
              <View style={styles.yearBox}><Text style={styles.yearNumber}>0</Text></View>
              <Text style={styles.yearNorms}>瓶</Text>
            </View>
            <View style={styles.limitWrapper}>
              <Text style={styles.limitText}>- 本年度您的换购次数已达上限 -</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
