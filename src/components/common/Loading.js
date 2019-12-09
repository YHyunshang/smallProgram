/*
 * @Description: Loading组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-31 10:28:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-12-09 11:09:09
 */

import React from 'react'
import {greenLoading} from '@const/resources'
import {StyleSheet, View, Dimensions, Animated, Easing} from 'react-native'
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.rotateValue = new Animated.Value(0)
    this.minShowingTime = 200
    this.state = {
      isLoading: false,
      setIsLoading: (isLoading) => {
        if (isLoading != this.state.isLoading) {
          let curTimeLong = new Date().getTime()
          if (isLoading) {
            this.startTime = curTimeLong
            this.setState({
              isLoading
            })
          } else {
            let hasShowingTimeLong = curTimeLong - this.startTime
            if (hasShowingTimeLong < this.minShowingTime) {
              setTimeout(() => {
                this.setState({
                  isLoading
                })
              }, this.minShowingTime - hasShowingTimeLong)
            } else {
              this.setState({
                isLoading
              })
            }
          }
        }
      }
    }
  }
  componentDidMount() {
    this.rotate()
  }
  /**
   * @description: 展示loading图标
   */
  showLoading = () => {
    this.state.setIsLoading(true)
  }
  /**
   * @description: 隐藏loading图标
   */
  hideLoading = () => {
    this.state.setIsLoading(false)
  }
  /**
   * @description:旋转方法
   */
    rotate = () => {
      this.rotateValue.setValue(0)
      Animated.timing(this.rotateValue, {
        toValue: 1, // 最终值 为1，这里表示最大旋转 360度
        duration: 1000,
        easing: Easing.linear
      }).start(() => this.rotate())
    }
    render() {
      const rotate = this.rotateValue.interpolate({
        inputRange: [0, 1], // 输入值
        outputRange: ['0deg', '360deg'] // 输出值
      })

      if (!this.state.isLoading) {
        return null
      }
      return (
        <View style={styles.loadingContent}>
          <View style={styles.loading}>
            <Animated.Image style={[styles.circle, {transform: [{rotate}]}]} source={greenLoading}/>
          </View>
        </View>
      )
    }
}
/**
 * @description: loading组件样式
 */
const styles = StyleSheet.create({
  loadingContent: {
    flex: 1,
    width,
    height,
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  loading: {
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: (height - 80) / 2
  },
  circle: {
    width: 41,
    height: 41
  }
})
