/*
 * @Description: 弹出浮层组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-31 18:22:38
 */
import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, Animated, Easing, Dimensions} from 'react-native'
/**
 * 弹出层
 */
const {width, height} = Dimensions.get('window')
export default class PopUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: new Animated.Value(0),
      show: false
    }
  }
  /**
   * @description: 淡进动画效果
   */
  fadeIn() {
    Animated.timing(
      this.state.offset,
      {
        easing: Easing.linear,
        duration: 200,
        toValue: 1
      }
    ).start()
  }
  /**
   * @description: 淡出动画效果
   */
  fadeOut() {
    Animated.timing(
      this.state.offset,
      {
        easing: Easing.linear,
        duration: 300,
        toValue: 0
      }
    ).start()
    setTimeout(
      () => this.setState({show: false}),
      300
    )
  }
  /**
   * @description: 展示弹层方法
   */
  show() {
    this.setState({
      show: true
    }, this.fadeIn())
  }
  /**
   * @description: 隐藏弹层方法
   */
  hide() {
    this.fadeOut()
  }
  /**
   * @description: 默认隐藏弹层
   */
  defaultHide() {
    this.props.hide()
    this.fadeOut()
  }

  render() {
    let {transparentIsClick, modalBoxBg, modalBoxHeight} = this.props
    if (this.state.show) {
      return (
        <View style={[styles.container, {height}]}>
          <TouchableOpacity style={{height: height - modalBoxHeight}} onPress={transparentIsClick && this.defaultHide.bind(this)}>
          </TouchableOpacity>
          <Animated.View
            style={[styles.modalBox, {
              height, top: 0, backgroundColor: modalBoxBg,
              transform: [{
                translateY: this.state.offset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, height - modalBoxHeight]
                })
              }]
            }]}>
            {this.props.children}
          </Animated.View>
        </View>
      )
    }
    return <View />
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    zIndex: 9
  },
  modalBox: {
    position: 'absolute',
    width
  }
})

PopUp.defaultProps = {
  modalBoxHeight: 300, // 盒子高度默认300
  modalBoxBg: '#fff', // 背景色默认白色
  hide() { }, // 关闭时的回调函数
  transparentIsClick: true // 透明区域是否可以点击
}
