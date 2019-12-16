/**
 * Created by 李华良 on 2019-12-13
 */
import * as React from 'react'
import {Text, View} from "react-native";
import styles from './LimitTimeBuyBar.styles'
import LinearGradient from "react-native-linear-gradient";
import {Progress} from "@components";
import {ActivityStatus} from "@common/typings";
import {useActivityStatus} from "@utils/hooks";
import {transMilliseconds} from "@utils/FormatUtil";

export interface LimitTimeBuyBarProps {
  percent: number
  startTs: number
  endTs: number
  onStatusChange: (v: ActivityStatus, ov: ActivityStatus) => void
}

const TimePad: React.FunctionComponent<{children: number, backgroundColor?: string}> = (
  { children, backgroundColor = '#F32E57' }
) => (
  <View style={[styles.timePad, { backgroundColor }]}>
    <Text style={styles.timePadText}>{children}</Text>
  </View>
)
const TimeSeparator: React.FunctionComponent = () => (
  <View style={styles.timeSeparator}>
    <View style={styles.timeSeparatorDot} />
    <View style={styles.timeSeparatorDot} />
  </View>
)

const LimitTimeBuyBar: React.FunctionComponent<LimitTimeBuyBarProps> = (
  { percent, startTs, endTs, onStatusChange }
) => {
  const {status, milliseconds} = useActivityStatus(startTs, endTs, onStatusChange)

  const countdownText = {
    [ActivityStatus.Pending]: '离本场开始:',
    [ActivityStatus.Processing]: '离本场结束:',
    [ActivityStatus.Expired]: '本场已结束',
  }[status]

  const [ hours, minutes, seconds ] = transMilliseconds(milliseconds)

  return (
    <View style={styles.container}>
      <LinearGradient colors={[ '#FF5F5F', '#EF1D53' ]} style={styles.inventoryBox} start={{ x:0, y:0}} end={{ x: 1, y:0}}>
        <Text style={styles.ltbTitle}>限时抢购</Text>
        <Progress percent={percent} format={percent => `剩余${percent}%`} strokeWidth={12} />
        <View style={styles.triangleDivider} />
      </LinearGradient>
      <View style={styles.countdownBox}>
        <Text style={styles.countdownTitle}>{countdownText}</Text>
        {(status === ActivityStatus.Processing || status === ActivityStatus.Pending) && (
          <View style={styles.timerBox}>
            <TimePad>{hours}</TimePad>
            <TimeSeparator />
            <TimePad>{minutes}</TimePad>
            <TimeSeparator />
            <TimePad backgroundColor="#FF7D98">{seconds}</TimePad>
          </View>
        )}
      </View>
    </View>
  )
}

export default LimitTimeBuyBar
