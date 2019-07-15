/**
 * Created by 李华良 on 2019-07-12
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import FitImage from 'react-native-fit-image'

const styles = StyleSheet.create({
  container: {}
})

interface Props {
  data: array<object>
  countPerRow: number
}

export default function ProductListFloor ({ data, countPerRow }: Props) {
  let formattedData = []
}