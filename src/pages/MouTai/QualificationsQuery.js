/*
 * @Description: 资格查询页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-28 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-06 16:01:07
 */
import React from 'react'
import {View, ScrollView, Text, Image, NativeModules, TouchableOpacity} from 'react-native'
import {Native} from '@utils'
import styles from './QualificationsQuery.styles'
import {greenWarn} from '@const/resources'
import Loading from '../../components/common/Loading'
import {getIntegralList} from '../../services/mouTaiActivity'
const rnAppModule = NativeModules.RnAppModule// 原生模块
export default class QualificationsQuery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowMore: false, // 默认收起状态
      qualificationInfo: {
        // availableIntegral: 0,
        // year: 2019, // 查询积分的年份
        // yearTotalNumber: 12, // 年度最多购买数量
        // yearAvailableQuantity: 0,
        // yearIntegralList: [// 用户换购记录
        //   {integralDate: '2019年01月', quantity: 1},
        //   {integralDate: '2019年02月', quantity: 1},
        //   {integralDate: '2019年03月', quantity: 1},
        //   {integralDate: '2019年04月', quantity: 1},
        //   {integralDate: '2019年05月', quantity: 1},
        //   {integralDate: '2019年06月', quantity: 1},
        //   {integralDate: '2019年07月', quantity: 1}
        //   // {integralDate: '2019年08月', quantity: 1},
        //   // {integralDate: '2019年09月', quantity: 1},
        //   // {integralDate: '2019年10月', quantity: 1},
        //   // {integralDate: '2019年11月', quantity: 1},
        //   // {integralDate: '2019年12月', quantity: 1}
        // ]
      }
    }
  }
  /**
   * @msg: 跳转至首页
   */
  handleGoHome() {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'AA01,AA01',
      params: {}
    })
  }
  /**
   * @msg: 展开收起操作
   */
  handleOpenRetract() {
    const {isShowMore} = this.state
    this.setState({isShowMore: !isShowMore})
  }
  componentDidMount() {
    Native.setTitle('资格查询')
    this.getIntegralList()
  }
  /**
   * @msg:查询资格查询积分列表
   */
  getIntegralList = () => {
    const {activityCode} = this.props
    this.loading.showLoading()
    getIntegralList(activityCode)
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          this.setState({qualificationInfo: data})
          this.loading.hideLoading()
        } else {
          rnAppModule.showToast(message, '0')
          this.loading.hideLoading()
        }
      }).catch(({message}) => {
        rnAppModule.showToast(message, '0')
        this.loading.hideLoading()
      })
  }
  render() {
    let {qualificationInfo, isShowMore} = this.state
    let buyList = qualificationInfo && qualificationInfo.yearIntegralList
    let newBuyList = buyList
    if (buyList && buyList.length && buyList.length > 3 && !isShowMore) {
      newBuyList = buyList.slice(0, 3)
    }
    const buyListWrapper = newBuyList && newBuyList.length > 0 ? newBuyList.map((item, index) => (
      <View style={[styles.buyItem, {marginTop: index === 0 ? 10 : 0}]} key={index}>
        <Text style={styles.monthInfo}>{item.integralDate}</Text>
        <Text style={styles.numberInfo}>换购<Text style={styles.normsInfo}>{item.quantity}瓶</Text></Text>
      </View>
    )) : <View style={styles.emptyRecordWrapper}>
      <Text style={styles.emptyRecordText}>暂无换购记录</Text>
      <TouchableOpacity
        style={styles.shareTouchableOpacity}
        activeOpacity={0.95}
        onPress={() => {
          this.handleGoHome()
        }} >
        <Text style={styles.goHome}>去首页 ></Text>
      </TouchableOpacity>
    </View>
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBanner}>
            <Text style={styles.currentPointText}>您目前的可使用积分</Text>
            <Text style={styles.currentPointValue}>{qualificationInfo.availableIntegral ? qualificationInfo.availableIntegral : 0}</Text>
            <View style={styles.tipsWrapper}>
              <Image source={greenWarn} style={{width: 14, height: 14}}></Image>
              <Text style={styles.tips}>根据历史消费记录，累计积分核定当前茅台预购资格</Text>
            </View>
          </View>
          <View style={styles.centerBanner}>
            <View style={styles.monthCountWrapper}>
              <View style={styles.monthCountHeight}>
                <Text style={styles.monthCountText}>年度换购统计</Text>
                <Text style={styles.totalNumber}>总计{qualificationInfo.yearTotalNumber}瓶</Text>
              </View>
              <View>
                <View style={styles.buyList}>
                  {buyListWrapper}
                  {
                    buyList && buyList.length > 3 && !isShowMore && (
                      <View style={styles.buyItem}>
                        <Text style={styles.monthInfo}>...</Text>
                      </View>
                    )
                  }
                </View>
                {
                  buyList && buyList.length > 3 && (
                    <TouchableOpacity
                      style={styles.shareTouchableOpacity}
                      activeOpacity={0.95}
                      onPress={() => {
                        this.handleOpenRetract()
                      }} >
                      <View style={styles.operateButton}>
                        <Text style={styles.operateText}>{!isShowMore ? '展开全部记录 ' : '收起'}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
              </View>
            </View>
            <View style={styles.yearWrapper}>
              <View style={styles.yearItem}>
                <Text style={styles.yearBold}>{qualificationInfo.year}</Text>
                <Text style={styles.yearText}>年，剩余可换购数量：</Text>
                <View style={styles.yearBox}><Text style={styles.yearNumber}>{qualificationInfo.yearAvailableQuantity}</Text></View>
                <Text style={styles.yearNorms}>瓶</Text>
              </View>
              <View style={styles.limitWrapper}>
                {
                  qualificationInfo && qualificationInfo.yearAvailableQuantity == 0 && (
                    <Text style={styles.limitText}>- 本年度您的换购次数已达上限 -</Text>
                  )
                }
              </View>
            </View>
          </View>
        </ScrollView>
        <Loading ref={ref => this.loading = ref}></Loading>
      </View>
    )
  }
}
