/*
 * @Description: tabBar组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-23 18:21:32
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-21 14:02:19
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

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
            <Text style={[this.state.index === index ? tabBarStyle.active : tabBarStyle.item]} > {item.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    }
    /**
     * @description: 调用父组件的setIndex方法并修改当前index状态
     * @param {index}
     * @return:  void
     */
    setIndex(index, bl = true) {
      let {clickScroll} = this.props
      clickScroll(index)
      this.setState({index})
    }
    /**
     * @description: 重置当前index状态
     * @param {index}
     * @return:  void
     */
    resetIndex(index) {
      this.setState({index})
    }
}
/**
 * @description: tabBar组件样式
 */
const tabBarStyle = StyleSheet.create({
  tab: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  itemBtn: {
    paddingHorizontal: 20,
    paddingTop: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    fontSize: 19,
    color: '#B3B3B3'
  },
  active: {
    color: '#4D4D4D',
    fontSize: 19
  },
  sortimg: {
    width: 55,
    height: 40
  }
})
