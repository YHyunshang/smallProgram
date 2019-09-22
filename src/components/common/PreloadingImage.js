/*
 * @Description:PreloadingImage
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-29 11:25:46
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-22 16:22:41
 */
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types'
import {placeholderProduct} from '@const/resources'
import FitImage from 'react-native-fit-image'
/**
 * 自定义图片
 */
export default class PreloadingImage extends Component {
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
      const {uri, defaultImage, errImage, style, sourceType} = this.props
      let source = {uri}
      if (this.state.type === 1) {
        source = errImage
      }
      return (
        <View style={[styles.container]}>
          <FitImage
            source={source}
            resizeMode="cover"
            style={[sourceType ? style : '']}
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
          {this.state.isLoadComplete ? null : <FitImage style={[styles.imgDefault, style]} source={defaultImage} resizeMode="contain"/> }
        </View>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  imgDefault: {
    width: 150,
    height: 150
  }
})
