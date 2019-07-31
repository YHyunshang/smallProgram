/*
 * @Description: 生成海报组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-31 17:13:05
 */

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NativeModules
} from 'react-native'
import PopUp from '../common/PopUp'
//import {downloadImage} from '../common/DownLoadImage'
import Toast from 'react-native-easy-toast'
import {isIPhoneXFooter} from '../../utils/IsIphoneX'
import Icon from '../../components/Icon'
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
    goodsDetailManager.showBottomViews()//展示底部购物车模块
  }

  /**
  * @description: 保存图片到本地相册
  */
  //  saveImage(){
  //   let url="https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_2.jpg"
  //    downloadImage(url).then((res)=>{
  //       if(res && res.statusCode===200){
  //         this.refs.toast.show('图片保存成功', 2000);
  //        // this.hidePosterModal()
  //       }else{
  //         this.refs.toast.show('图片保存失败', 2000);
  //       }
  //   }).catch((error)=>{
  //       this.refs.toast.show('图片保存失败', 2000);
  //       console.log(error)
  //   })

  // }

  render() {
    const {modalBoxHeight, imgUrl} = this.props
    const baseImg = `data:image/png;base64,${imgUrl}`
    return (
      <PopUp ref={ref => this.popUp = ref} modalBoxHeight={modalBoxHeight}>
        <View style={styles.shareTitleInfo}>
          <View></View>
          <View style={styles.shareTitleText}>
            <Text>保存到相册</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.hidePosterModal()
          }}>
            <Icon style={styles.closeIcon} name='close' size={21} color="#9B9B9B" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContent}>
          <Image style={styles.posterImage} source={{uri: baseImg}} resizeMode="cover" ></Image>
        </View>
        <TouchableOpacity onPress={() => {
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
  imageContent: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  posterImage: {
    width: 246,
    height: 365
  },
  saveImage: {
    width: 246,
    height: 45,
    backgroundColor: '#EE4239',
    borderRadius: 23,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  saveText: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  tipsContent: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //iPhoneX底部兼容处理
    marginBottom: isIPhoneXFooter(0)
  },
  tips: {
    fontSize: 12,
    color: '#848791'
  }
})
