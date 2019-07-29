/**
 * xuanshanbo
 * 2019
 */

import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Image, Button} from 'react-native'
import Api from './server/http'
const instructions = Platform.select({})
const YHimg = require('./images/yh.png')
//const YHwc = require('./images/wc.png')

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      name: '永辉超市',
      text: '采用的是react-native配合UI:react-native-element',
      textInput: 'input测试'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imagesStyle}
          source={YHimg}
        />
        <Text style={styles.welcome}>{this.state.name}</Text>
        <Text>{instructions}</Text>
        <Text style={styles.instructions}>{this.state.text}</Text>
        <Button
          color="#987892"
          onPress={this._onPressButton}
          title="点击测试Api接口"
        />
      </View>
    )
  }
  // 测试请求Api
  _onPressButton() {
    Api.api('post', 'http://localhost:8082/apiGet')
      .then((e) => {
        console.log(e)
        // alert('测试成功android-imgs')
      })
      .catch(e => {
        console.log(e)
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  textInputStyle: {
    width: 200,
    height: 40,
    marginTop: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 12
  },
  imagesStyle: {
    borderWidth: 2,
    borderRadius: 10,
    width: 140,
    height: 140
  }
})
