/*
 * @Description: Progress进度条组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-07 15:02:09
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-10 20:04:03
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
    const {saleNum} = this.props
    let showText = ''
    if (saleNum == '100%') {
      showText = '库存'
    } else if ((saleNum >= '50%') || saleNum == '0%') {
      showText = '剩余'
    } else {
      showText = '仅剩'
    }
    return (
      <View style={styles.box}>
        <View style={[styles.child, {width: saleNum > '100%' ? '100%' : saleNum}]}>
        </View>
        <View style={styles.processAnimate}>
          {
            saleNum ?
              <Text style={styles.saleNum}>{showText}{saleNum}</Text>
              : null
          }
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
    backgroundColor: '#FFFFFF'
  },
  processAnimate: {
    position: 'absolute',
    right: 39,
    top: 0,
    bottom: 0,
    borderRadius: 7
  },
  saleNum: {
    fontSize: 10,
    color: '#F32E57',
    textAlign: 'center'
  }
})
