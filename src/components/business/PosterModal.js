/*
 * @Description: 生成海报组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-30 17:12:15
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
import PopUp from '../common/PopUp'
import {downloadImage} from '../common/DownLoadImage'
import Icon from '../../components/Icon'
import styles from './PosterModal.styles'
import {applyPermission, subscriptApplyPermissionChange} from '../../services/goodsDetail'
const isIOS = Platform.OS === 'ios'
const rnAppModule = NativeModules.RnAppModule// 原生商品详情模块
const goodsDetailManager = NativeModules.GoodsDetailsNativeManager// 原生商品详情模块
export default class PosterModal extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!isIOS) {
    // 保存图片到相册到权限申请事件native 事件监听
      this.nativeSubscription = subscriptApplyPermissionChange(
        this.onNativeApplyPermissionChange
      )
    }
  }

  componentWillUnmount() {
    if (!isIOS) {
      this.nativeSubscription && this.nativeSubscription.remove()
    }
  }
  /**
  * @description: 显示生成海报弹层
  */
  showPosterModal() {
    this.popUp.show()
  }
  /**
  * @description: 隐藏生成海报弹层
  */
  hidePosterModal() {
    this.popUp.hide()
    goodsDetailManager.showBottomViews()// 展示底部购物车模块
  }
  /**
   * @param {resultValue}
   * @description:  保存图片到相册到权限申请事件监听返回权限申请是否成功标识resultValue，true：成功，false：失败
   */
  onNativeApplyPermissionChange = ({resultValue}) => {
    if (resultValue == 'true') {
      this.downloadImage()
    }
  }
  /**
   * @description: 调用下载图片的方法
   */
  downloadImage() {
    const {imgUrl} = this.props
    if (imgUrl) {
      downloadImage(imgUrl).then((res) => {
        if (res && res.statusCode === 200) {
          rnAppModule.showToast('图片保存成功', '1')// 1成功，2失败
          this.hidePosterModal()
        } else {
          rnAppModule.showToast('图片保存失败', '0')
        }
      }).catch((error) => {
        rnAppModule.showToast('图片保存失败', '0')
        console.log(error)
      })
    } else {
      rnAppModule.showToast('图片地址为空', '0')
    }
  }

  /**
  * @description: 保存图片到本地相册
  */
  saveImage() {
    if (isIOS) {
      this.downloadImage()
    } else {
      applyPermission()// android需要调用申请存储权限的方法
    }
  }

  render() {
    const {modalBoxHeight, imgUrl} = this.props
    return (
      <PopUp ref={ref => this.popUp = ref} modalBoxHeight={modalBoxHeight}>
        <View style={styles.shareTitleInfo}>
          <View></View>
          <View style={styles.shareTitleText}>
            <Text>保存到相册</Text>
          </View>
          <TouchableOpacity activeOpacity={0.95} onPress={() => {
            this.hidePosterModal()
          }}>
            <Icon style={styles.closeIcon} name='close' size={21} color="#9B9B9B" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContent}>
          <Image style={styles.posterImage} source={{uri: imgUrl}} resizeMode="cover" ></Image>
        </View>
        <TouchableOpacity activeOpacity={0.95} onPress={() => {
          this.saveImage()
        }}>
          <View style={styles.imageContent}>
            <View style={styles.saveImage}>
              <Text style={styles.saveText}>保存图片</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.tipsContent}>
          <Text style={styles.tips}>保存图片到手机相册后，将图片分享到您的圈</Text>
        </View>
      </PopUp>
    )
  }
}
