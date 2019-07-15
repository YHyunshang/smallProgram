/**
 * Created by 李华良 on 2019-07-15
 */
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FitImage from 'react-native-fit-image'

interface Props {
  data: object
}

const styles = StyleSheet.create({})

export default function ProductListFloor (props: Props) {
  const { data } = props
  return (
    <View>
      <View>
        <FitImage source={{ uri: data.productImage }} />
      </View>
      <View>
        <Text>{ data.productName }</Text>
        <View>
          <Text>
            <Text>¥</Text>
            <Text>{ data.price }</Text>
          </Text>
          <Button />
        </View>
      </View>
    </View>
  )
}