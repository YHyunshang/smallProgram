/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {View, Text} from 'react-native'
import styles from './Timer.styles'
import {padTimeByUnit, TimeUnit} from "./utils";

interface Props {
  title: string
  duration: number
  millisecondVis?: boolean // 是否展示毫秒
}

export default function Timer({ title, duration, millisecondVis }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {duration > 0 && (
        <React.Fragment>
          <Text style={styles.timerText}>
            {padTimeByUnit(duration, TimeUnit.Hour)}
          </Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.timerText}>
            {padTimeByUnit(duration, TimeUnit.Min)}
          </Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.timerText}>
            {padTimeByUnit(duration, TimeUnit.Sec)}
          </Text>
          {!!millisecondVis && (
            <React.Fragment>
              <Text style={styles.colon}>:</Text>
              <Text style={[ styles.timerText, styles.timerTextMillisecond ]}>
                {padTimeByUnit(duration, TimeUnit.MsH)}
              </Text>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </View>
  )
}