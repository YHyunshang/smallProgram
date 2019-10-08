/**
 * Created by 李华良 on 2019-10-08
 */
import * as React from 'react'
import styles from './CartFooter.styles'
import {View, Image, Text, TouchableWithoutFeedback} from "react-native";
import {cartGray} from "@const/resources";
import {Native} from "@utils";

interface Props {
  count: number // 购物车商品计数
  amount: number // 购物车商品价格
  children: React.ReactNode
}

function navToCart() {
  Native.navigateTo({
    type: Native.NavPageType.NATIVE,
    uri: 'B001,B001',
  })
}

export default function ({ count, amount, children }: Props) {
  const budget = count >= 100 ? '99+' : `${count}`
  const amountText = amount.toFixed(2)
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>

      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={navToCart}>
          <View style={styles.cartBox}>
            <Image style={styles.iconCart} source={cartGray} />
            {count > 0 && (
              <View style={styles.budgetBox}>
                <Text style={styles.budget}>{budget}</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.amountBox}>
          <Text style={styles.amount}>
            <Text style={styles.amountPrefix}>¥ </Text>
            {amountText}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={navToCart}>
          <View style={styles.navBox}>
            <Text style={styles.navText}>去购物车</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}