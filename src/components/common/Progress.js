/*
 * @Description: Progress进度条组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-07 15:02:09
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-07 23:36:00
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
    return (
      <View style={styles.box}>
        <View style={[styles.child, {width: saleNum}]}>
        </View>
        <View style={styles.processAnimate}>
          {
            saleNum ?
              <Text style={styles.saleNum}>已售{saleNum}</Text>
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
    backgroundColor: '#FFACBA'
  },
  child: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: '#FFFFFF'
  },
  processAnimate: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 7
  },
  saleNum: {
    fontSize: 10,
    color: '#F32E57',
    marginRight: 5,
    textAlign: 'right'
  }
})
