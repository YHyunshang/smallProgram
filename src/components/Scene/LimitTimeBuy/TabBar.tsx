/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {View, Text, TouchableWithoutFeedback} from "react-native";
import styles from './TabBar.styles'
import {LimitTimeBuyStatus} from "@components/business/Content/typings";
import {Global} from "@utils";
const dayjs = require('dayjs')

export interface tabs {
  start: number
  end: number
  status: LimitTimeBuyStatus
}

interface Props {
  tabs: {
    start: number
    end: number
  }[]
  currentActiveIndex: number
  onIndexChange: (index: number) => void
}

function day(date) {
  const srcDate = dayjs(date)
  return dayjs().startOf('day').subtract(1, 'day').isAfter(srcDate)
    ? srcDate.format('MM-DD HH:mm')
    : dayjs().endOf('day').subtract(1, 'day').isAfter(srcDate)
    ? srcDate.format('昨天 HH:mm')
    : dayjs().endOf('day').isAfter(srcDate)
    ? srcDate.format('HH:mm')
    : dayjs().endOf('day').isAfter(srcDate)
    ? srcDate.format('明天 HH:mm')
    : srcDate.format('MM-DD HH:mm')
}

export default function TabBar({tabs, currentActiveIndex, onIndexChange}: Props) {
  const [now, setNow] = React.useState(Date.now())
  const maxEndTime = Math.max(...tabs.map(ele => ele.end))

  React.useEffect(() => {
    let interval = setInterval(() => {
      const _now_ = Date.now()
      if (_now_ > maxEndTime) {
        clearInterval(interval)
      }
      setNow(_now_)
    }, 1000)

    return () => clearInterval(interval)
  }, [maxEndTime])

  const indicatorTranslateX = (currentActiveIndex + 0.5) * (Global.WindowWidth / tabs.length) - 2.5
  console.log(indicatorTranslateX)

  return (
    <View style={styles.container}>
      {tabs.map(({start, end}, index) => {
        const title = day(start)
        let status = now < start ? '即将开始' : now < end ? '正在抢购' : '已结束'
        return (
          <TouchableWithoutFeedback onPress={() => onIndexChange(index)} key={index}>
            <View style={[styles.tabBox, currentActiveIndex === index && styles.tabActive]}>
              <Text style={[styles.tabTitle, currentActiveIndex === index && styles.tabTitleActive]}>{title}</Text>
              <Text style={[styles.tabStatus, currentActiveIndex === index && styles.tabStatusActive]}>{status}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
      <View style={[ styles.indicator, { transform: [{ translateX: indicatorTranslateX }] } ]} />
    </View>
  )
}