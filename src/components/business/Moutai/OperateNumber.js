/*
 * @Description:OperateNumber 加减操作组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-07 15:02:09
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-06 00:31:21
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
      addIconColor: '#666666',
      minIconColor: '#666666'
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
      this.setState({addIconColor: '#CCCCCC'})
      rnAppModule.showToast('您已超出可购买数量', '0')
      return false
    } else {
      numberText++
      if (Number(numberText) >= Number(availableQuantity)) {
        this.setState({numberText, addIconColor: '#CCCCCC'})
      } else {
        this.setState({numberText, addIconColor: '#666666', minIconColor: '#666666'})
      }
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
    if (numberText == 1) {
      this.setState({minIconColor: '#CCCCCC'})
    }
    if (Number(numberText) < Number(availableQuantity)) {
      this.setState({addIconColor: '#666666'})
    }
    onMin(numberText)
  }
  render() {
    const {numberText, addIconColor, minIconColor} = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.operateButton}
          activeOpacity={0.95}
          onPress={() => {
            this.handleMin()
          }} >
          <Icon name='minus' size={15} color={Number(this.state.numberText) <= 1 ? '#CCCCCC' : minIconColor } />
        </TouchableOpacity>
        <Text style={styles.numberText}>{numberText}</Text>
        <TouchableOpacity
          style={styles.operateButton}
          activeOpacity={0.95}
          onPress={() => {
            this.handleAdd()
          }} >
          <Icon name='plus' size={15} color={Number(this.state.numberText) >= Number(this.props.availableQuantity) ? '#CCCCCC' : addIconColor} />
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
  operateButton: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
