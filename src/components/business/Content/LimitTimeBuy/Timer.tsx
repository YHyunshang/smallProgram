/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import { View, Text } from 'react-native'
import styles from './Timer.styles'
import { transMilliseconds } from '@utils/FormatUtil'
import TimePad from './TimePad'

interface Props {
  title: string
  duration: number
  millisecondVis?: boolean // 是否展示毫秒
}

export default function Timer({ title, duration, millisecondVis }: Props) {
  const [hour, minutes, seconds, milliseconds] = transMilliseconds(duration)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {duration > 0 && (
        <React.Fragment>
          <TimePad>{hour}</TimePad>
          <Text style={styles.colon}>:</Text>
          <TimePad>{minutes}</TimePad>
          <Text style={styles.colon}>:</Text>
          <TimePad>{seconds}</TimePad>
          {!!millisecondVis && (
            <React.Fragment>
              <Text style={styles.colon}>:</Text>
              <TimePad>{Math.floor(milliseconds / 100)}</TimePad>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </View>
  )
}
