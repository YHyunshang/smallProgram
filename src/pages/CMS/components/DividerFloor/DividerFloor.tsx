/**
 * Created by 李华良 on 2019-07-12
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import FitImage from 'react-native-fit-image'

const styles = StyleSheet.create({})

interface Props {
  image: string
}

export default function DividerFloor(props: Props) {
  const { image } = props
  return (
    <FitImage source={{ uri: image }} />
  )
}