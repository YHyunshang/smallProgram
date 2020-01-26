/*
 * @Description: 弹窗通用组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-26 22:05:28
 */
import * as React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
/**
 * 弹出层
 */
const { width, height } = Dimensions.get('window')

interface Props {
  modalBoxWidth: number // 模态窗口的宽度
  modalBoxHeight: number // 模态窗口的高度
}

interface State {
  show: boolean // 是否展示模态弹窗
}

export default class CommonModal extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  /**
   * @description: 展示弹层方法
   */
  show() {
    this.setState({
      show: true,
    })
  }
  /**
   * @description: 隐藏弹层方法
   */
  hide() {
    this.setState({
      show: false,
    })
  }

  render() {
    const { modalBoxWidth, modalBoxHeight } = this.props
    if (this.state.show) {
      return (
        <View style={styles.container}>
          <View
            style={[
              styles.modalBox,
              { width: modalBoxWidth, height: modalBoxHeight },
            ]}
          >
            {this.props.children}
          </View>
        </View>
      )
    }
    return <View />
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
    alignItems: 'center',
  },
  modalBox: {
    position: 'absolute',
    top: 157,
  },
})
