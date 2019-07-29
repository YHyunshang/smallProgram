/*
 * @Description: 分享朋友圈组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-26 17:09:34
 */

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
// import * as WeChat from 'react-native-wechat'
import PopUp from '../common/PopUp'
import Icon from '../../components/Icon'
import Toast from 'react-native-easy-toast'
const shareIconWechat = {uri: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/wechat-friend.png'}
const shareIconMoments = {uri: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/wechat-moments.png'}
export default class ShareModal extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //WeChat.registerApp('wx3e5bc65c8d751e70')
  }

  componentWillUnmount() {

  }
  /**
  * @description: 显示分享弹层
  */
  showShareModal() {
    this.popUp.show()
  }
  /**
  * @description: 隐藏分享弹层
  */
  hideShareModal() {
    this.popUp.hide()
  }
  /**
  * @description: 发送微信朋友方法
  */
  shareFriend() {
    // WeChat.isWXAppInstalled().then((isInstalled) => {
    //   if (isInstalled) {
    //     WeChat.shareToSession({
    //       title: '刘玉文的二维码',
    //       description: '分享自：iReading',
    //       thumbImage: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_3.jpg',
    //       type: 'news',
    //       webpageUrl: 'https://blog.csdn.net/weixin_34221036/article/details/91056421'
    //     }).catch((error) => {
    //       this.refs.toast.show(error.message, 2000)
    //     })
    //   } else {
    //     this.refs.toast.show('没有安装微信软件，请您安装微信之后再试', 2000)
    //   }
    // })
  }
  /**
  * @description: 分享朋友圈
  */
  showPosterMoal() {
    // WeChat.isWXAppInstalled().then((isInstalled) => {
    //   if (isInstalled) {
    //     WeChat.shareToTimeline({
    //       title: '刘玉文的二维码',
    //       thumbImage: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_1.jpg',
    //       type: 'news',
    //       description: '永辉到家链接',
    //       webpageUrl: 'https://blog.csdn.net/weixin_34221036/article/details/91056421'
    //     }).catch((error) => {
    //       this.refs.toast.show(error.message, 2000)
    //     })
    //   } else {
    //     this.refs.toast.show('没有安装微信软件，请您安装微信之后再试', 2000)
    //   }
    // })
    this.popUp.hide()
    const {onShare, productParams} = this.props
    //this.refs.toast.show(productParams, 12000)
    if (onShare) {
      onShare(productParams)
    }
  }
  render() {
    const {modalBoxHeight} = this.props
    return (
      <PopUp ref={ref => this.popUp = ref} modalBoxHeight={modalBoxHeight}>
        <View style={styles.shareTitleInfo}>
          <View></View>
          <View style={styles.shareTitleText}><Text>分享至</Text></View>
          <TouchableOpacity onPress={() => {
            this.hideShareModal()
          }}>
            <Icon style={styles.closeIcon} name='close' size={21} color="#9B9B9B" />
          </TouchableOpacity>
        </View>
        <View style={styles.shareInfo}>
          <TouchableOpacity onPress={() => {
            this.shareFriend()
          }}>
            <Image style={styles.shareImage} source={shareIconWechat} resizeMode="cover"></Image>
            <Text style={styles.shareText} >微信好友</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.showPosterMoal()
          }}>
            <Image style={styles.shareImage} source={shareIconMoments} resizeMode="cover"></Image>
            <Text style={styles.shareText} >微信朋友圈</Text>
          </TouchableOpacity>
        </View>
        <Toast
          ref="toast"
          style={{backgroundColor: '#444444'}}
          position='top'
          positionValue={200}
          fadeInDuration={750}
        />
      </PopUp>
    )
  }
}

const styles = StyleSheet.create({
  shareInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 44
  },
  shareTitleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeIcon: {
    textAlign: 'right',
    marginVertical: 14,
    marginRight: 13
  },
  shareTitleText: {
    height: 49,
    fontSize: 16,
    color: '#333333',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareImage: {
    width: 60,
    height: 60
  },
  shareText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    marginTop: 10
  }
})
