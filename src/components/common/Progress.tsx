/*
 * @Description: Progress进度条组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-07 15:02:09
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-15 14:40:27
 */
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  saleNum: string // 销售数量
}

export default class Progress extends React.Component<Props> {
  constructor(props) {
    super(props)
  }
  render() {
    let { saleNum } = this.props
    let newSaleNum: Array<any> = saleNum ? saleNum.split('%') : []
    let showText = ''
    if (newSaleNum && newSaleNum.length > 0) {
      if (Number(newSaleNum[0]) >= 100) {
        showText = '库存'
      } else if (
        (Number(newSaleNum[0]) > 50 && Number(newSaleNum[0]) < 100) ||
        Number(newSaleNum[0] == 0)
      ) {
        showText = '剩余'
      } else {
        showText = '仅剩'
      }
    }
    return (
      <View style={styles.box}>
        <View
          style={[
            styles.child,
            { width: Number(newSaleNum[0]) >= 100 ? '100%' : saleNum },
          ]}
        />
        <View style={styles.processAnimate}>
          {saleNum ? (
            <Text style={styles.saleNum}>
              {showText}
              {saleNum}
            </Text>
          ) : null}
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
    backgroundColor: '#FFACBA',
    textAlign: 'center',
    overflow: 'hidden',
  },
  child: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processAnimate: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  saleNum: {
    fontSize: 10,
    color: '#F32E57',
    textAlign: 'center',
  },
})
