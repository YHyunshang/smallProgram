/*
 * @Description: 肺炎瘟疫弹窗组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2020-08-25 19:21:47
 */
import { Native } from '@utils'
import * as React from 'react'
import FastImage from "react-native-fast-image"
import CommonModal from './CommonModal'
import { StyleSheet, View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { pneumoniaBg, decorate } from '@const/resources'
interface Props {
}

interface State {
}

/**
 * 弹出层
 */
export default class PneumoniaModal extends React.Component<Props, State> {
  commonModalRef: React.RefObject<any>
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.commonModalRef = React.createRef()
  }
  /**
  * @description: 显示弹层
  */
  showModal() {
    this.commonModalRef.current.show()
  }
  /**
  * @description: 隐藏弹层
  */
  handleCloseModal() {
    this.commonModalRef.current.hide()
  }

  /**
  * @description: 跳转到永辉生活app下载页面
  */
 handleJumpToYonghuiLife() {
    Native.navigateTo({
      type: Native.NavPageType.H5,
      uri: 'https://m.yonghuivip.com/yh-activity/apploadtip/index.html',
      params: {},
      title: String(''),
    })
  }
  render() {
    return (
      <CommonModal ref={this.commonModalRef} modalBoxHeight={354} modalBoxWidth={285}>
        <TouchableOpacity
        style={styles.touchableButton}
        activeOpacity={0.95}
        onPress={() => {
          this.handleJumpToYonghuiLife()
        }} >
        <ImageBackground
          style={styles.pneumoniaBg}
          resizeMode="contain"
          source={pneumoniaBg}>
         
        </ImageBackground>
        </TouchableOpacity>
      </CommonModal>
    )
  }
}

const styles = StyleSheet.create({
  pneumoniaBg: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {
    flex: 1,
    width: 285,
    height:354
  },
  titleText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFF',
    position: 'absolute',
    top: 55,
    left: 98,
  },
  decorate: {
    flex: 1,
    position: 'absolute',
    top: 63,
    left: 40,
    width: 205,
    height: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 92
  },
  contentText: {
    paddingHorizontal: 35,
    fontSize: 15,
    lineHeight: 24,
    color: '#FFFFFF'
  },
  seeDetailButton: {
    width: 200,
    height: 40,
    borderRadius: 2,
    marginBottom: 10,
    backgroundColor: '#FEFAA2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seeText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#D55040'
  }
})
