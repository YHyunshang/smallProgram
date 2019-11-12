/*
 * @Description:OperateNumber 加减操作组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-07 15:02:09
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-12 17:27:55
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
  componentWillReceiveProps(props) {
    if (props.availableQuantity != this.props.availableQuantity) {
      const {availableQuantity, inventoryNumber} = props
      let currentQuantity = Number(inventoryNumber) >= Number(availableQuantity) ? availableQuantity : inventoryNumber
      this.setState({numberText: currentQuantity})
    }
  }
  componentDidMount() {
    const {availableQuantity, inventoryNumber} = this.props
    let currentQuantity = Number(inventoryNumber) >= Number(availableQuantity) ? availableQuantity : inventoryNumber
    this.setState({numberText: currentQuantity})
  }
  /**
   * @msg: 加操作
   */
  handleAdd() {
    let {numberText} = this.state
    let {availableQuantity, inventoryNumber, onAdd} = this.props
    let tips = Number(inventoryNumber) >= Number(availableQuantity) ? '您已超出可购买数量' : '库存不足'
    availableQuantity = Number(inventoryNumber) >= Number(availableQuantity) ? availableQuantity : inventoryNumber
    if (Number(numberText) >= Number(availableQuantity)) {
      this.setState({addIconColor: '#CCCCCC'})
      rnAppModule.showToast(tips, '0')
      return false
    } else {
      numberText++
      if (Number(numberText) >= Number(availableQuantity)) {
        this.setState({numberText, addIconColor: '#CCCCCC', minIconColor: '#666666'})
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
    let {availableQuantity, inventoryNumber} = this.props
    availableQuantity = Number(inventoryNumber) >= Number(availableQuantity) ? availableQuantity : inventoryNumber
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
        <View style={styles.numberWrapper}>
          <Text style={styles.numberText}>{numberText}</Text>
        </View>
        <TouchableOpacity
          style={styles.operateButton}
          activeOpacity={0.95}
          onPress={() => {
            this.handleAdd()
          }} >
          <Icon name='plus' size={15} color={Number(this.state.numberText) >= Number(availableQuantity) ? '#CCCCCC' : addIconColor} />
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
    borderWidth: 0.5,
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
  numberWrapper: {
    width: 40,
    height: 30,
    borderLeftColor: '#CCCCCC',
    borderRightColor: '#CCCCCC',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberText: {
    fontSize: 16.5,
    color: '#331B00'
  }
})
