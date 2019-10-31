/*
 * @Description: 预约门店弹窗组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-31 10:43:21
 */
import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonModal from '../../common/CommonModal'
import {StyleSheet, View, Text, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
/**
 * 弹出层
 */
const {width, height} = Dimensions.get('window')
export default class StoreModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      storeList: [] // 可预约门店列表
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
    return (
      <CommonModal ref={ref => this.commonModal = ref} modalBoxHeight={424} modalBoxWidth={325}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.storeList}>
            <View>
              <Text style={styles.cityText}>重庆市</Text>
              <View style={styles.cityText}>
                <Text style={styles.addressText}>永辉超市-汉渝路店</Text>
                <Text style={styles.addressText}>永辉超市-石坪桥店</Text>
              </View>
            </View>
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
    zIndex: 999
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
