/*
 * @Description: 疫情配送详情页面页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-02-10 14:53:14
 */
import * as React from 'react'
import {
  View,
  ScrollView
} from 'react-native'
// import FastImage from "react-native-fast-image"
import FitImage from 'react-native-fit-image'
import { Native } from '@utils'
import styles from './PneumoniaPestilence.styles'
export default class PneumoniaPestilence extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    Native.setTitle('配送说明')
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
          <FitImage            
              source={{uri:'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/extra/emergency-top.jpeg'}}
              resizeMode="contain"
            />
            <FitImage           
              source={{uri:'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/extra/emergency-bottom.jpeg'}}
              resizeMode="contain"
            />
          </ScrollView>
      </View>
    )
  }
}
