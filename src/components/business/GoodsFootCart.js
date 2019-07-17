/*
 * @Description: 商品详情底部购物车组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-16 11:20:57
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Icon from '../../../iconSets';
export default  class GoodsFootCart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
  
  }


  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.leftWrapper}>
          <Icon></Icon>
        </View>
        <View style={styles.rightWrapper}>
          <Text style={styles.textColor}>-</Text>
          <Text style={styles.textColor}>2</Text>
          <Text style={styles.textColor}>+</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper:{
    width:'100%',
    height:50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:40,
    height:40,
    borderRadius:100,
    backgroundColor:'#EE4239',
    marginLeft:15,
    marginVertical:5,
  },
  rightWrapper: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:164,
    height:50,
    backgroundColor:'#EE4239'
  },
  textColor:{
    color:'#FFFFFF',
    fontSize:18,
    fontWeight:'600'
  }
})