/**
 * 分割图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { View } from 'react-native'
import FitImage from 'react-native-fit-image'
import styles from './Divider.styles'

interface Props {
  image: string
}

export default function Divider(props: Props) {
  const { image } = props
  return (
    <View style={styles.container}>
      <FitImage source={{ uri: image }} indicator={false} />
    </View>
  )
}
