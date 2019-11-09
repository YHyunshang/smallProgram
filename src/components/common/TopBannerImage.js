/*
 * @Description:TopBannerImage
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-29 11:25:46
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-09 10:36:12
 */
import React, {Component} from 'react'
import {StyleSheet, View, NativeModules} from 'react-native'
import PropTypes from 'prop-types'
import {placeholderProduct} from '@const/resources'
import FastImage from 'react-native-fast-image'
const rnAppModule = NativeModules.RnAppModule// 原生模块
/**
 * 渲染顶部banner图片
 */
export default class TopBannerImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadComplete: false,
      sourceType: 1, // 来源类型,1：来自相似商品列表。0：来自其他
      type: 0 // 0,正常加载，1加载错误，
    }
  }
    static propTypes = {
      uri: PropTypes.string.isRequired, // 图片路径，必填
      errImage: PropTypes.number, // 加载错误图片，可不传
      defaultImage: PropTypes.number, // 预加载图片
      sourceType: PropTypes.number// 图片来源
    }
    static defaultProps = {
      defaultImage: placeholderProduct,
      errImage: placeholderProduct, // 默认加载错误图片，可在此统一设置
      sourceType: 1
    }

    render() {
      let {headImg, defaultImage, errImage, style} = this.props
      // rnAppModule.showToast(`headImg::${headImg}`, '0')
      if (this.state.type === 1) {
        headImg = errImage
      }
      return (
        <View style={styles.container}>
          <FastImage
            indicator={false}
            style={[style]}
            source={{uri: headImg}}
            resizeMode={FastImage.resizeMode.stretch}
            onError={(error) => {
              this.setState({
                type: 1
              })
            }}
            onLoadEnd={() => {
              this.setState({
                isLoadComplete: true
              })
            }}
          />
          {!this.state.isLoadComplete && (
            <FastImage style={[styles.imgDefault, styles.imgPosition]} source={defaultImage} resizeMode={FastImage.resizeMode.contain}/>
          )
          }
        </View>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgDefault: {
    width: 300,
    height: 300
  },
  imgPosition: {
    overflow: 'hidden',
    position: 'absolute'
  }
})
