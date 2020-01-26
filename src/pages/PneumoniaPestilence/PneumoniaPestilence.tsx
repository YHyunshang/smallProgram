/*
 * @Description: 疫情配送详情页面页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-26 23:59:18
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
              source={{uri:'http://hotfile.yonghui.cn/files/%7Ccephdata%7Cfilecache%7CYHYS%7CYHYS%7C2020-01-26%7C3083314391542657024'}}
              resizeMode="contain"
            />
            <FitImage           
              source={{uri:'http://hotfile.yonghui.cn/files/%7Ccephdata%7Cfilecache%7CYHYS%7CYHYS%7C2020-01-26%7C3036626440721264640'}}
              resizeMode="contain"
            />
          </ScrollView>
      </View>
    )
  }
}
