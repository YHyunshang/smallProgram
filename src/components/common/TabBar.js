/*
 * @Description: tabBar组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-23 18:21:32
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-25 14:20:39
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const dimen = Dimensions.get('window')
const deviceWidth = dimen.width

function px(size) {
  return Math.round(deviceWidth / 750 * size)
}
/**
 * tab组件头部
 * props    data    tab列表
 * props    style   样式
 * props    index   默认选中的序号
 * props    onChange    选中
 */
export default class TabBar extends Component {
    static defaultProps = {
      data: [],
      index: -1,
      onChange: () => { }
    }
    constructor(props) {
      super(props)
      this.state = {
        index: props.index
      }
      this.scroll = null
      this.laout_list = []
      this.scrollW = 0
    }
    render() {
      return <View style={[tabBarStyle.tab, this.props.style]}>
        {this.props.data.map((item, index) =>
          <TouchableOpacity onPress={() => this.setIndex(index)} key={item.id} style={tabBarStyle.itemBtn}>
            <Text style={[tabBarStyle.item]} > {item.name}</Text>
            <View style={[tabBarStyle.line, this.state.index === index ? tabBarStyle.active : null]}></View>
          </TouchableOpacity>
        )}
      </View>
    }
    setIndex(index, bl = true) {
      let {clickScroll} = this.props
      clickScroll(index)
      this.setState({index})
    }
}
const tabBarStyle = StyleSheet.create({
  tab: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: px(1),
    height: 40
  },
  itemBtn: {
    paddingHorizontal: 12,
    // paddingTop: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    fontSize: px(28),
    color: '#858385'
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#F8F8F8',
    marginTop: 10
  },
  active: {
    backgroundColor: '#EE4239'
  },
  sortimg: {
    width: 55,
    height: 40
  }
})
