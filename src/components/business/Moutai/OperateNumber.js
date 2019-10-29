/*
 * @Description:OperateNumber 加减操作组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-07 15:02:09
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-29 17:27:00
 */
import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity
} from 'react-native'
import Icon from '../../Icon'
const rnAppModule = NativeModules.RnAppModule// 原生模块
export default class OperateNumber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberText: 1,
      iconColor: '#666666'
    }
  }
  componentDidMount() {
    const {availableQuantity} = this.props
    this.setState({numberText: availableQuantity})
  }
  /**
   * @msg: 加操作
   */
  handleAdd() {
    let {numberText} = this.state
    const {availableQuantity, onAdd} = this.props
    if (Number(numberText) >= Number(availableQuantity)) {
      this.setState({iconColor: '#CCCCCC'})
      rnAppModule.showToast(`您当月可购买数量为${availableQuantity}瓶`, '0')
      return false
    } else {
      numberText++
      this.setState({numberText, iconColor: '#666666'})
    }
    onAdd(numberText)
  }
  /**
   * @msg: 减操作
   */
  handleMin() {
    let {numberText} = this.state
    const {availableQuantity, onMin} = this.props
    if (numberText > 1) {
      numberText--
      this.setState({numberText})
    }
    if (Number(numberText) < Number(availableQuantity)) {
      this.setState({iconColor: '#666666'})
    }
    onMin(numberText)
  }
  render() {
    const {numberText, iconColor} = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.shareTouchableOpacity}
          activeOpacity={0.95}
          onPress={() => {
            this.handleMin()
          }} >
          <Icon name='minus' size={15} color="#CCCCCC" />
        </TouchableOpacity>
        <Text style={styles.numberText}>{numberText}</Text>
        <TouchableOpacity
          style={styles.shareTouchableOpacity}
          activeOpacity={0.95}
          onPress={() => {
            this.handleAdd()
          }} >
          <Icon name='plus' size={15} color={iconColor} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#CCCCCC'
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CCCCCC'
  },
  numberText: {
    fontSize: 16.5,
    color: '#331B00'
  }
})
