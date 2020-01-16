/**
 * Created by 李华良 on 2019-11-25
 */
import * as React from 'react'
import { ActivityStatus } from '@common/typings'
import { transMilliseconds, transPenny } from '@utils/FormatUtil'
import { useActivityStatus } from '@utils/hooks'
import { Text, View } from 'react-native'
import styles from './PreSaleBar.styles'
import FastImage from 'react-native-fast-image'
import {
  activityExpired,
  activityPending,
  activityProcessing,
  preSaleBarBlock,
} from '@const/resources'
import LinearGradient from 'react-native-linear-gradient'

const StatusIconMapper = {
  [ActivityStatus.Pending]: activityPending,
  [ActivityStatus.Processing]: activityProcessing,
  [ActivityStatus.Expired]: activityExpired,
}
const StatusTextMapper = {
  [ActivityStatus.Pending]: '活动未开始',
  [ActivityStatus.Processing]: '活动进行中',
  [ActivityStatus.Expired]: '活动已结束',
}

export interface PreSaleBarProps {
  price: number
  startTs: number
  endTs: number
  onStatusChange: (status: ActivityStatus, oldStatus: ActivityStatus) => void
}

const TimerSeparator: React.FunctionComponent<object> = () => (
  <View style={styles.timerSeparatorBox}>
    <View style={styles.timerSeparatorDot} />
    <View style={styles.timerSeparatorDot} />
  </View>
)
const TimerPad: React.FunctionComponent<{
  backgroundColor?: string
  children: number
}> = ({ backgroundColor = '#706EF9', children }) => (
  <View style={[styles.timerPadBox, { backgroundColor }]}>
    <Text style={styles.timerPadText}>{`${children}`.padStart(2, '0')}</Text>
  </View>
)

const PreSaleBar: React.FunctionComponent<PreSaleBarProps> = ({
  price,
  startTs,
  endTs,
  onStatusChange,
}) => {
  const { status, milliseconds } = useActivityStatus(
    startTs,
    endTs,
    onStatusChange
  )

  let activityStatusComp = null
  if (
    status === ActivityStatus.Processing &&
    milliseconds <= 72 * 60 * 60 * 1000
  ) {
    const [hours, minutes, seconds] = transMilliseconds(milliseconds)
    activityStatusComp = (
      <>
        <Text style={styles.processingText}>距离结束仅剩：</Text>
        <TimerPad>{hours}</TimerPad>
        <TimerSeparator />
        <TimerPad>{minutes}</TimerPad>
        <TimerSeparator />
        <TimerPad backgroundColor="#8A6BFD">{seconds}</TimerPad>
      </>
    )
  } else if (startTs && endTs) {
    const icon = StatusIconMapper[status]
    const text = StatusTextMapper[status]

    activityStatusComp = (
      <>
        <FastImage style={styles.statusIcon} source={icon} />
        <Text style={styles.statusText}>{text}</Text>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.frontBg}>
        <LinearGradient
          style={styles.linearBox}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#7071FA', '#6F57F1']}
        />
        <FastImage style={styles.blockImg} source={preSaleBarBlock} />
      </View>
      <View style={styles.contentBox}>
        <View style={[styles.textBox, styles.textBoxFirst]}>
          <Text style={styles.pricePrefix}>预售价 ¥&nbsp;</Text>
          <Text style={styles.price}>{transPenny(price)}</Text>
        </View>
        <View style={styles.textBox}>{activityStatusComp}</View>
      </View>
    </View>
  )
}

export default PreSaleBar
