/*
 * @Description: Progress进度条组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-07 15:02:09
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-23 18:10:29
 */
import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
export default class Progress extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render() {
    let {saleNum} = this.props
    let newSaleNum = saleNum ? saleNum.split('%') : ''
    let showText = ''
    if (newSaleNum) {
      if (Number(newSaleNum[0]) >= 100) {
        showText = '库存'
      } else if ((Number(newSaleNum[0]) > 50 && Number(newSaleNum[0]) < 100) || Number(newSaleNum[0] == 0)) {
        showText = '剩余'
      } else {
        showText = '仅剩'
      }
    }
    return (
      <View style={styles.box}>
        <View style={[styles.child, {width: Number(newSaleNum[0]) >= 100 ? '100%' : saleNum}]}>
          <View>
            {
              saleNum ?
                <Text style={styles.saleNum}>{showText}{saleNum}</Text>
                : null
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    width: 120,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#FFACBA',
    textAlign: 'center'
  },
  child: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  saleNum: {
    fontSize: 10,
    color: '#F32E57',
    textAlign: 'center'
  }
})
