/**
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {Text, TouchableWithoutFeedback, View} from "react-native";
import styles from './TabBar.styles'
import {Global} from "@utils";
import {Tab} from './typings'
import {LimitTimeBuyStatus} from "@common/typings";

const dayjs = require('dayjs')

interface Props {
  tabs: Tab[]
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

function statusToText(status: LimitTimeBuyStatus):string {
  return {
    [LimitTimeBuyStatus.Pending]: '即将开始',
    [LimitTimeBuyStatus.Processing]: '正在抢购',
    [LimitTimeBuyStatus.Expired]: '已结束',
  }[status]
}

export default function TabBar({tabs, currentActiveIndex, onIndexChange}: Props) {
  const indicatorTranslateX = tabs.length > 0 ? (currentActiveIndex + 0.5) * (Global.WindowWidth / tabs.length) - 2.5 : 0

  return (
    <View style={styles.container}>
      {tabs.map(({start, status}, index) => {
        return (
          <TouchableWithoutFeedback onPress={() => onIndexChange(index)} key={index}>
            <View style={[styles.tabBox, currentActiveIndex === index && styles.tabActive]}>
              <Text style={[styles.tabTitle, currentActiveIndex === index && styles.tabTitleActive]}>{day(start)}</Text>
              <Text style={[styles.tabStatus, currentActiveIndex === index && styles.tabStatusActive]}>{statusToText(status)}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
      {tabs.length > 0 && <View style={[ styles.indicator, { transform: [{ translateX: indicatorTranslateX }] } ]} />}
    </View>
  )
}