/**
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { View } from 'react-native'
import FitImage from 'react-native-fit-image'
import styles from './DividerFloor.styles'

interface Props {
  image: string
}

export default function DividerFloor(props: Props) {
  const { image } = props
  return (
    <View style={styles.container}>
      <FitImage source={{ uri: image }} indicator={false} />
    </View>
  )
}
