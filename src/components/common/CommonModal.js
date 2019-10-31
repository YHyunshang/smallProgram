/*
 * @Description: 弹窗通用组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-31 11:34:51
 */
import React, {Component} from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
/**
 * 弹出层
 */
const {width, height} = Dimensions.get('window')
export default class CommonModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }
  /**
   * @description: 展示弹层方法
   */
  show() {
    this.setState({
      show: true
    })
  }
  /**
   * @description: 隐藏弹层方法
   */
  hide() {
    this.setState({
      show: false
    })
  }

  render() {
    const {modalBoxWidth, modalBoxHeight} = this.props
    if (this.state.show) {
      return (
        <View style={styles.container}>
          <View style={[styles.modalBox, {width: modalBoxWidth, height: modalBoxHeight}]}>
            {this.props.children}
          </View>
        </View>
      )
    }
    return <View/>
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    top: 0,
    zIndex: 9,
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalBox: {
    position: 'absolute',
    borderRadius: 6,
    top: 94,
    backgroundColor: '#fff'
  }
})
