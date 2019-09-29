/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {View, Text} from 'react-native'
import styles from './Timer.styles'
import {padTimeByUnit, TimeUnit} from "./utils";

interface Props {
  start: number // 开始时间戳
  end: number // 结束时间戳
  millisecondVis?: boolean // 是否展示毫秒
}

export default function Timer({start, end, millisecondVis}: Props) {
  const [now, setNow] = React.useState(Date.now())

  React.useEffect(() => {
    let interval: number
    if (now < end) {
      interval = setInterval(() => {
        const _now_ = Date.now()
        if (_now_ > end) {
          clearInterval(interval)
        }
        setNow(_now_)
      }, 100)
    }
    return () => interval && clearInterval(interval)
  })

  let title = ''
  let duration = 0
  if (now < start) {
    title = '离本场开始'
    duration = start - now
  } else if (now < end) {
    title = '离本场结束'
    duration = end - now
  } else {
    title = '本场已结束'
    duration = -1
  }

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