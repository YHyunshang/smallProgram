/*
 * @Description:OperateNumber 加减操作组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-07 15:02:09
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-14 16:56:31
 */
import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity,
} from 'react-native'
import Icon from '../../Icon'
const rnAppModule = NativeModules.RnAppModule // 原生模块

interface Props {
  availableQuantity: number // 当前用户可购买的茅台数量
  inventoryNumber: number // 茅台总库存量
  onAdd: Function // 添加操作
  onMin: Function // 减加操作
}

interface State {
  numberText: number // 文本值
  addIconColor: string // 添加按钮的颜色值
  minIconColor: string // 减少按钮的颜色值
}

export default class OperateNumber extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      numberText: 1,
      addIconColor: '#666666',
      minIconColor: '#666666',
    }
  }
  /**
   * @msg: 加操作
   */
  handleAdd() {
    let { numberText } = this.state
    let { availableQuantity, inventoryNumber, onAdd } = this.props
    let tips =
      Number(inventoryNumber) >= Number(availableQuantity)
        ? '您已超出可购买数量'
        : '库存不足'
    availableQuantity =
      Number(inventoryNumber) >= Number(availableQuantity)
        ? availableQuantity
        : inventoryNumber
    if (Number(numberText) >= Number(availableQuantity)) {
      this.setState({ addIconColor: '#CCCCCC' })
      rnAppModule.showToast(tips, '0')
      return false
    } else {
      numberText++
      if (Number(numberText) >= Number(availableQuantity)) {
        this.setState({
          numberText,
          addIconColor: '#CCCCCC',
          minIconColor: '#666666',
        })
      } else {
        this.setState({
          numberText,
          addIconColor: '#666666',
          minIconColor: '#666666',
        })
      }
    }
    onAdd(numberText)
  }
  /**
   * @msg: 减操作
   */
  handleMin() {
    let { numberText } = this.state
    const { availableQuantity, onMin } = this.props
    if (numberText > 1) {
      numberText--
      this.setState({ numberText })
    }
    if (numberText == 1) {
      this.setState({ minIconColor: '#CCCCCC' })
    }
    if (Number(numberText) < Number(availableQuantity)) {
      this.setState({ addIconColor: '#666666' })
    }
    onMin(numberText)
  }
  render() {
    const { numberText, addIconColor, minIconColor } = this.state
    let { availableQuantity, inventoryNumber } = this.props
    availableQuantity =
      Number(inventoryNumber) >= Number(availableQuantity)
        ? availableQuantity
        : inventoryNumber
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.operateButton}
          activeOpacity={0.95}
          onPress={() => {
            this.handleMin()
          }}
        >
          <Icon
            name="minus"
            size={15}
            color={
              Number(this.state.numberText) <= 1 ? '#CCCCCC' : minIconColor
            }
          />
        </TouchableOpacity>
        <View style={styles.numberWrapper}>
          <Text style={styles.numberText}>{numberText}</Text>
        </View>
        <TouchableOpacity
          style={styles.operateButton}
          activeOpacity={0.95}
          onPress={() => {
            this.handleAdd()
          }}
        >
          <Icon
            name="plus"
            size={15}
            color={
              Number(this.state.numberText) >= Number(availableQuantity)
                ? '#CCCCCC'
                : addIconColor
            }
          />
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
    borderColor: '#CCCCCC',
  },
  operateButton: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CCCCCC',
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
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 16.5,
    color: '#331B00',
  },
})
