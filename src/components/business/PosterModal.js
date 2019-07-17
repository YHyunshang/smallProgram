/*
 * @Description: 生成海报组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-17 10:57:33
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import PopUp from '../common/PopUp'
import Icon from '../../components/Icon'
export default  class PosterModal extends React.Component {
  constructor(props) {
    super(props);
  
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
  
  }
 /**
  * @description: 显示生成海报弹层
  */ 
 showPosterModal(){
  this.popUp.show()
 }
 /**
  * @description: 隐藏生成海报弹层
  */ 
 hidePosterModal(){
  this.popUp.hide()
}
 
  render() {
  const {modalBoxHeight}=this.props
      return (
        <PopUp ref={ref => this.popUp = ref} modalBoxHeight={modalBoxHeight}>
         <View style={styles.shareTitleInfo}>
           <View></View>
           <View style={styles.shareTitleText}><Text>保存到相册</Text></View>
           <TouchableOpacity onPress={() => { this.hidePosterModal() }}>
             <Icon style={styles.closeIcon} name='close' size={21} color="#9B9B9B" />
           </TouchableOpacity>
         </View>
          <Image style={styles.posterImage} source={{uri: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_2.jpg'}} resizeMode="cover" ></Image>          
          <View style={styles.saveImage}>
            <Text style={styles.saveText}>保存图片</Text>
          </View>
          <View style={styles.tipsContent}>
            <Text style={styles.tips}>保存图片到手机相册后，将图片分享到您的圈</Text>
          </View>
        </PopUp>
      )
  }
}

const styles = StyleSheet.create({
  shareTitleInfo:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  closeIcon:{
    textAlign:'right',
    marginVertical:14,
    marginRight:13
  },
  shareTitleText:{
    height:49,
    fontSize:16,
    color:'#333333',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center'
  },
  posterImage:{
    width:246,
    height:365,
    marginHorizontal:65
  },
  saveImage:{
    width:246,
    height:45,
    backgroundColor:'#EE4239',
    borderRadius:23,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    marginHorizontal:65,
    marginTop:16
  },
  saveText:{
    fontSize:16,
    color:'#FFFFFF',
  },
  tipsContent:{
    marginHorizontal:62,
    marginVertical:10
  },
  tips:{
    fontSize:12,
    color:'#848791',
  }
})