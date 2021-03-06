/*
 * @Description: 弹出浮层组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-15 14:35:27
 */
import * as React from 'react'
import {StyleSheet, View, TouchableOpacity, Animated, Easing, Dimensions, NativeModules} from 'react-native'
const goodsDetailManager = NativeModules.GoodsDetailsNativeManager// 原生商品详情模块
/**
 * 弹出层
 */
const {width, height} = Dimensions.get('window')

interface Props {
  transparentIsClick: boolean  // 透明区域是否可以点击
  modalBoxBg: string // 背景色默认白色
  modalBoxHeight: number // 盒子高度默认300
  hide: Function // 关闭时的回调函数
}

interface State {
  offset: Animated.AnimatedValue // offset动画初始值
  show: boolean // 是否展示模态弹窗
}
export default class PopUp extends React.Component <Props, State>{
  static defaultProps: {
  modalBoxHeight: number; // 盒子高度默认300
    modalBoxBg: string; // 背景色默认白色
    hide(): void; // 关闭时的回调函数
    transparentIsClick: boolean; // 透明区域是否可以点击
  };
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
    goodsDetailManager.showBottomViews() // 展示底部购物车模块
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
    zIndex: 0
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
