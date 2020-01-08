/*
 * @Description:TopBannerImage
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-29 11:25:46
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-08 11:41:12
 */
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types'
import {placeholderProductCarousel} from '@const/resources'
import FastImage from 'react-native-fast-image'
/**
 * 渲染顶部banner图片
 */
export default class TopBannerImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadComplete: false,
      type: 0 // 0,正常加载，1加载错误，
    }
  }
    static propTypes = {
      uri: PropTypes.string.isRequired, // 图片路径，必填
      errImage: PropTypes.number, // 加载错误图片，可不传
      defaultImage: PropTypes.number, // 预加载图片
      type: PropTypes.number // 图片类型 1:轮播图，2:banner广告图
    }
    render() {
      let {headImg, defaultImage, errImage, style, type} = this.props
      defaultImage = type === 1 ? placeholderProductCarousel : ''
      errImage = defaultImage
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
            resizeMode={FastImage.resizeMode.cover}
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
            <FastImage style={[styles.imgDefault, styles.imgPosition, style]} source={defaultImage} resizeMode={FastImage.resizeMode.contain}/>
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
    width: '100%',
    height: 118
  },
  imgPosition: {
    overflow: 'hidden',
    position: 'absolute'
  }
})
