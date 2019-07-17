/*
 * @Description: 商品详情底部购物车组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-17 11:13:59
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from '../../components/Icon'
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
          <Icon name='cart' size={26} color="#FFFFFF" />
        </View>
        <View style={styles.cartGoodsBg}>
            <Text style={styles.cartGoodsNumber}>2</Text>
        </View>
        <View style={styles.rightWrapper}>
          <Icon name='minus' size={18} color="#FFFFFF" />
          <Text style={styles.textColor}>2</Text>
          <Icon name='plus' size={18} color="#FFFFFF" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper:{
    position:'relative',
    width:'100%',
    height:50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftWrapper: {
    width:40,
    height:40,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius:100,
    backgroundColor:'#EE4239',
    marginLeft:15,
    marginVertical:5,
  },
  cartGoodsBg:{
    position:'absolute',
    left:39,
    bottom:33,
    width:15,
    height:15,
    borderColor:'#FFFFFF',
    borderWidth:1,
    borderRadius:100,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#EE4239'
  },
  cartGoodsNumber:{
    fontSize:15,
    color:'#FFFFFF'
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