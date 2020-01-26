/*
 * @Description: 肺炎瘟疫弹窗组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-26 23:20:19
 */
import {Native} from '@utils'
import * as React from 'react'
import FastImage from "react-native-fast-image"
import CommonModal from './CommonModal'
import {StyleSheet, View, Text, ImageBackground, ScrollView, TouchableOpacity} from 'react-native'
import { pneumoniaBg, close,  decorate} from '@const/resources'
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
   * @description: 跳转到疫情配送详情页面
   */
  handleJumpToPneumoniaPestilence() {
    Native.navigateTo({
      type: Native.NavPageType.RN,
      uri: 'RNPneumoniaPestilence',
      params: {},
      title: String(''),
    })
  }
  render() {
    return (
      <CommonModal ref={this.commonModalRef} modalBoxHeight={354} modalBoxWidth={280}>
        <ImageBackground 
        style={styles.pneumoniaBg}
        resizeMode="contain"
        source={pneumoniaBg}>
          <FastImage
            style={styles.decorate}
            source={decorate}
            resizeMode="contain"
          />
          <Text style={styles.titleText}>配送说明</Text> 
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
          <View style={styles.contentWrapper}>
            <Text style={styles.contentText}>
              针对近日来新型冠状病毒感染的肺炎疫情，考虑到配送服务人员岗位每日会接触大量人群的特殊性质，为确保群众健康和民生供给，永辉买菜在配送条件达到的情况下，即日起执行特殊时期配送方式。
             </Text>
          </View>
          </ScrollView>
          <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => {
            this.handleJumpToPneumoniaPestilence()
          }} >
          <View
            style={[styles.seeDetailButton]}
          >
            <Text style={styles.seeText}>查看详情</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => {
            this.handleCloseModal()
          }} >
        <FastImage
            style={styles.close}
            source={close}
            resizeMode="contain"
          />
          </TouchableOpacity>
        </ImageBackground>        
      </CommonModal>
    )
  }
}

const styles = StyleSheet.create({
  pneumoniaBg: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleText:{
    fontSize: 22,
    fontWeight:'600',
    color: '#FFF',
    position:'absolute',
    top:55,
    left:95,
  },
  close:{
    width:33,
    height:33
  },
  decorate:{
    flex:1,
    position:'absolute',
    top:61,
    left:45,
    width:190,
    height:8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:92
  },
  contentText: {
    paddingHorizontal:35,
    fontSize: 15,
    lineHeight:24,
    color: '#FFFFFF',
    marginBottom: 12
  },
  seeDetailButton: {
    width: 222,
    height: 40,
    borderRadius: 2,
    marginBottom: 10,
    backgroundColor:'#FEFAA2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seeText: {
    fontSize: 17,
    fontWeight:'600',
    color: '#D55040'
  }
})
