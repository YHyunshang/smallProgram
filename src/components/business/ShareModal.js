/*
 * @Description: 分享朋友圈组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-26 13:18:40
 */

import React from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  NativeModules
} from 'react-native'
import * as WeChat from 'react-native-wechat'
import PopUp from '../common/PopUp'
import Icon from '../../components/Icon'
import styles from './ShareModal.styles'
const rnAppModule = NativeModules.RnAppModule// 原生商品详情模块
const goodsDetailManager = NativeModules.GoodsDetailsNativeManager// 原生商品详情模块
// const shareIconWechat = {uri: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/wechat-friend.png'}
// const shareIconMoments = {uri: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/wechat-moments.png'}
const shareIconWechat = Platform.OS === 'ios' ? require('@img/wechat-friend.png') : require('@img/wechat-friend.png')
const shareIconMoments = Platform.OS === 'ios' ? require('@img/wechat-moments.png') : require('@img/wechat-moments.png')
export default class ShareModal extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    WeChat.registerApp('wx3e5bc65c8d751e70')
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
    goodsDetailManager.showBottomViews()// 展示底部购物车模块
    this.popUp.hide()
  }
  /**
  * @description: 发送微信朋友方法
  */
  shareFriend() {
    let {productParams} = this.props
    // WeChat.isWXAppInstalled().then((isInstalled) => {
    //   if (isInstalled) {
    //     WeChat.shareToSession({
    //       title: '刘玉文的二维码',
    //       description: '分享自：iReading',
    //       thumbImage: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_3.jpg',
    //       type: 'video',
    //       videoUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
    //     }).catch((error) => {
    //       this.refs.toast.show(error.message, 2000)
    //     })
    //   } else {
    //     this.refs.toast.show('没有安装微信软件，请您安装微信之后再试', 2000)
    //   }
    // })
    let weixinMiniProgramShareInfo = {
      type: 'miniProgram',
      title: '商品详情分享',
      thumbImage: productParams.productUrl,
      description: productParams.productDesc,
      miniProgramType: 0, // 分享小程序版本 正式版:0，测试版:1，体验版:
      webpageUrl: 'https://blog.csdn.net/weixin_34221036/article/details/91056421',
      userName: 'gh_913462fd944f', // 小程序原生id非appid
      path: '/pages/home/home' // 小程序页面路径
    }
    WeChat.isWXAppInstalled().then((isInstalled) => {
      if (isInstalled) {
        WeChat.shareToSession(weixinMiniProgramShareInfo).catch((error) => {
          rnAppModule.showToast(error.message, '0')
        })
      } else {
        rnAppModule.showToast('没有安装微信软件，请您安装微信之后再试', '0')
      }
    })
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
          <TouchableOpacity activeOpacity={0.95} onPress={() => {
            this.hideShareModal()
          }}>
            <Icon style={styles.closeIcon} name='close' size={21} color="#9B9B9B" />
          </TouchableOpacity>
        </View>
        <View style={styles.shareInfo}>
          <TouchableOpacity activeOpacity={0.95} onPress={() => {
            this.shareFriend()
          }}>
            <Image style={styles.shareImage} source={shareIconWechat} resizeMode="cover"></Image>
            <Text style={styles.shareText} >微信好友</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.95} onPress={() => {
            this.showPosterMoal()
          }}>
            <Image style={styles.shareImage} source={shareIconMoments} resizeMode="cover"></Image>
            <Text style={styles.shareText} >微信朋友圈</Text>
          </TouchableOpacity>
        </View>
      </PopUp>
    )
  }
}
