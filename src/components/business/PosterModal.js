/*
 * @Description: 生成海报组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-30 14:53:30
 */

import React from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  NativeModules
} from 'react-native'
import PopUp from '../common/PopUp'
import {downloadImage} from '../common/DownLoadImage'
import Icon from '../../components/Icon'
import styles from './PosterModal.styles'
const isIOS = Platform.OS === 'ios'
const rnAppModule = NativeModules.RnAppModule// 原生商品详情模块
const goodsDetailManager = NativeModules.GoodsDetailsNativeManager// 原生商品详情模块
export default class PosterModal extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

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
    * @description: 弹出提示框向用户请求某项权限。返回一个promise，最终值为用户是否同意了权限申请的布尔值。
    * 其中rationale参数是可选的，其结构为包含title和message)的对象。
    * 此方法会和系统协商，是弹出系统内置的权限申请对话框，
    * 还是显示rationale中的信息以向用户进行解释。
    * */
  async requestReadPermission() {
    try {
      // 返回string类型
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          // 第一次请求拒绝后提示用户你为什么要这个权限
          title: '我要存储权限',
          message: '同意就好了'
        }
      )
      rnAppModule.showToast(String(granted), '0')
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        rnAppModule.showToast('你已获取了存储权限', '0')
      } else {
        rnAppModule.showToast('获取存储权限失败', '0')
      }
    } catch (err) {
      // rnAppModule.showToast(String(err), '0')
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
      this.requestReadPermission()
        .then(this.downloadImage())
        .catch()
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
