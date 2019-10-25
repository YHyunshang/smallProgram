/**
 * Created by 李华良 on 2019-10-21
 */
import * as React from 'react'
import {View, Text} from 'react-native'
import styles from './SceneFooter.styles'

export interface SceneFooterProps {}

const SceneFooter: React.FunctionComponent<SceneFooterProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>没有更多了，左右滑动切换类目</Text>
    </View>
  )
}

export default SceneFooter
