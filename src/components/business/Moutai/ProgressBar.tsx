/*
 * @Description: ProgressBar进度条组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-10-07 15:02:09
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-14 16:54:00
 */
import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  saleNum: number // 销售数量
  stockNumber: number // 库存数量
  width: number // 宽度
  height: number // 高度
  startColor: string // 渐变开始颜色值
  endColor: string // 渐变结束颜色值
  backgroundColor: string // 背景色
}

export default class ProgressBar extends React.Component<Props> {
  constructor(props) {
    super(props)
  }
  render() {
    const { saleNum, stockNumber } = this.props
    let textColor = '#C1882C'
    let { width, height, startColor, endColor, backgroundColor } = this.props
    let showText = ''
    if (saleNum >= 0 && stockNumber) {
      if (Number(stockNumber) < 100) {
        showText = `仅剩${stockNumber}瓶`
        textColor = '#FF5333'
        startColor = '#FF5333'
        endColor = '#EFC5A6'
      } else {
        if (Number(saleNum) >= 5 && Number(saleNum) <= 100) {
          showText = `剩余${saleNum}%`
        } else if (Number(saleNum) > 100) {
          showText = '剩余100%'
        } else {
          showText = `不足${5}%`
          textColor = '#FF5333'
          startColor = '#FF5333'
          endColor = '#EFC5A6'
        }
      }
    }
    return (
      <View style={styles.container}>
        <Text style={[styles.saleNum, { color: textColor }]}>{showText}</Text>
        <View style={[styles.box, { backgroundColor, width, height }]}>
          <LinearGradient
            style={[
              styles.box,
              { width: Number(saleNum) >= 100 ? '100%' : `${saleNum}%` },
            ]}
            colors={[startColor, endColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View
              style={[
                styles.child,
                { width: Number(saleNum) >= 100 ? '100%' : saleNum },
              ]}
            />
          </LinearGradient>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  box: {
    position: 'relative',
    borderRadius: 5,
    textAlign: 'center',
  },
  child: {
    height: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleNum: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
})
