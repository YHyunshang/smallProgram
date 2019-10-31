/*
 * @Description: 预约门店弹窗组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-31 13:38:48
 */
import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonModal from '../../common/CommonModal'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native'
/**
 * 弹出层
 */
export default class StoreModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      storeList: [{cityName: '重庆市', resStoreVOList: [{storeName: '永辉超市-汉渝路店'},
        {storeName: '永辉超市-石坪桥店'},
        {storeName: '永辉超市-万盛区民盛店'},
        {storeName: '永辉超市-泽胜广场店'},
        {storeName: '永辉超市-梁平大众店'}
      ]},
      {cityName: '成都市', resStoreVOList: [{storeName: '永辉超市-抚琴南路店'}, {storeName: '永辉超市-新城市广场店'}]}
      ]
    }
  }
  /**
  * @description: 显示弹层
  */
  showModal() {
    this.commonModal.show()
  }
  /**
* @description: 隐藏弹层
*/
  handleCloseModal() {
    this.commonModal.hide()
  }
  render() {
    const {storeList} = this.state
    // 预约门店列表
    const storeListWrapper = storeList && storeList.map((item, cityIndex) => (
      <View key={cityIndex}>
        <Text style={styles.cityText}>{item.cityName}</Text>
        <View style={styles.cityText}>
          {
            item.resStoreVOList && item.resStoreVOList.map((storeItem, storeIndex) => (
              <Text key={storeIndex} style={styles.addressText}>{storeItem.storeName}</Text>
            ))
          }
        </View>
      </View>
    ))
    return (
      <CommonModal ref={ref => this.commonModal = ref} modalBoxHeight={424} modalBoxWidth={325}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.storeList}>
            {storeListWrapper}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.shareTouchableOpacity}
          activeOpacity={0.95}
          onPress={() => {
            this.handleCloseModal()
          }} >
          <LinearGradient
            style={[styles.knowButton]}
            colors={['#C1882C', '#E5B655']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            <Text style={styles.knowText}>好的</Text>
          </LinearGradient>
        </TouchableOpacity>
      </CommonModal>
    )
  }
}

const styles = StyleSheet.create({
  storeList: {
    marginTop: 40,
    marginLeft: 25,
    backgroundColor: '#fff'
  },
  cityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4D4D4D',
    marginBottom: 12
  },
  addressText: {
    fontSize: 15,
    color: '#808080',
    paddingBottom: 15
  },
  knowButton: {
    width: 275,
    height: 40,
    borderRadius: 2,
    marginBottom: 30,
    marginLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  knowText: {
    fontSize: 17,
    color: '#FFFFFF'
  }
})
