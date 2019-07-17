/*
 * @Description: 分享朋友圈组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-17 10:57:42
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
import PosterModal from '../../components/business/PosterModal'
const shareIconWechat = {uri: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/wechat-friend.png'};
const shareIconMoments = {uri: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/wechat-moments.png'};
export default  class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isShowModal: false//默认隐藏分享朋友圈和海报弹层
    // }
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
  
  }
 /**
  * @description: 显示分享弹层
  */ 
 showShareModal(){
  this.popUp.show()
 }
 /**
  * @description: 隐藏分享弹层
  */ 
 hideShareModal(){
  this.popUp.hide()
}
 /**
  * @description: 分享朋友圈方法
  */ 
shareFriend(){
  
}
 /**
  * @description: 展示生成海报弹层
  */ 
 showPosterMoal(e){
  this.popUp.hide()
  const {onShare} = this.props
  if (onShare) {
    onShare(e)
  }
}
  render() {
    const {modalBoxHeight} = this.props
    return (
      <PopUp ref={ref => this.popUp = ref} modalBoxHeight={modalBoxHeight}>
          <View style={styles.shareTitleInfo}>
            <View></View>
            <View style={styles.shareTitleText}><Text>分享至</Text></View>
            <TouchableOpacity onPress={() => { this.hideShareModal() }}>
                <Icon style={styles.closeIcon} name='close' size={21} color="#9B9B9B" />
            </TouchableOpacity>
          </View>
      <View style={styles.shareInfo}>
         <TouchableOpacity onPress={() => { this.shareFriend() }}>
           <Image style={styles.shareImage} source={shareIconWechat} resizeMode="cover"></Image>
           <Text style={styles.shareText} >微信好友</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => { this.showPosterMoal() }}>
           <Image style={styles.shareImage} source={shareIconMoments} resizeMode="cover"></Image>
           <Text style={styles.shareText} >生成海报</Text>
         </TouchableOpacity>
      </View>
    </PopUp>
    )
  }
}

const styles = StyleSheet.create({
  shareInfo:{
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    marginTop:44
  },
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
  shareImage:{
    width:60,
    height:60
  },
  shareText:{
    fontSize:14,
    color:'#333333',
    fontWeight:'600',
    marginTop:10
  }
})