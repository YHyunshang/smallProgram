/**
 * Created by 李华良 on 2019-07-16
 */
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../Icon'
import styles from './ProductItem.styles'

interface Props {
  data: object
}

export default function ProductItem (props: Props) {
  const { data } = props
  return (
    <View style={styles.container}>
      <View style={styles.productImgBox}>
        <Image style={styles.productImg} source={{ uri: data.imgUrl }} resizeMode="contain" />
      </View>
      <View style={styles.productDetailBox}>
        <Text style={styles.productName} numberOfLines={1}>{ data.name }</Text>
        <LinearGradient colors={[ '#FF5247', '#FF873E' ]} style={styles.productTagBox}>
          {data.tag && (<Text style={styles.productTag}>{ data.tag }</Text>)}
        </LinearGradient>
        <View style={styles.btmBox}>
          <Text style={styles.productPriceBox}>
            <Text style={styles.pricePrefix}>¥ </Text>
            <Text style={styles.productPrice}>{ data.price }</Text>
          </Text>
          <TouchableOpacity onPress={console.log}>
            <LinearGradient colors={[ '#EE4239', '#FF766F' ]} style={styles.cartBtn}>
              <Icon name="cart" style={styles.cartIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
