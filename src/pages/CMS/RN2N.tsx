/**
 * Created by 李华良 on 2019-07-27
 */
import React from 'react'
import { View, Button, Text, NativeModules } from 'react-native'
import { Http, Log } from '../../utils'

export default class RN2N extends React.Component {
  constructor(props) {
    super(props)
  }

  onPressNavBtn = () => {
    NativeModules.HomeNativeManager.pushToNewPage('0', 'C001', JSON.stringify({ testData: 'guess who am i' }))
  }

  onPressAddCartBtn = () => {
    NativeModules.HomeNativeManager.addToCart(
      'post',
      'http://xszt-sit.2c-order.sitapis.yonghui.cn/shopping_cart/product',
      JSON.stringify({ productCode: "1234", productNum: 3, productPrice: 1 }),
      (errMsg, data) => {
        Log.debug('NativeModules.addToCart returns:', errMsg, data)
      }
    )
  }

  onPressGetStoreCodeBtn = () => {
    const storeCode = NativeModules.HomeNativeManager.storeCode
    Log.debug('HomeNativeManager.storeCode returns', storeCode)
  }

  render() {
    return (
      <View>
        <Text>GoodsDetailsNativeManager.YEAR</Text>
        <Text>{NativeModules.GoodsDetailsNativeManager.YEAR}</Text>

        <Text>HomeNativeManager.pushToNewPage</Text>
        <Button
          title="navigate to usercenter"
          onPress={this.onPressNavBtn}
        />

        <Text>HomeNativeManager.addToCart</Text>
        <Button
          title="add to cart"
          onPress={this.onPressAddCartBtn}
        />

        <Text>HomeNativeManager.storeCode</Text>
        <Button
          title="get storeCode"
          onPress={this.onPressGetStoreCodeBtn}
        />
      </View>
    )
  }
}