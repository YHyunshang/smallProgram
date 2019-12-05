/*
 * @Descripttion: 左边侧栏组件
 * @Author: yuwen.liu
 * @Date: 2019-11-12 23:52:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-12-05 10:30:48
 */
import * as React from 'react'
import styles from './LeftTab.styles'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

interface Props {
  currentActive: string
  data: {
    categoryCode: string
    categoryName: string
  }[]
  onTabChange: (key: string, index: number) => void
}

export default function LeftTab({ currentActive, data, onTabChange }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map(({ categoryCode, categoryName }, index) => (
          <TouchableOpacity
            activeOpacity={0.95}
            key={categoryCode}
            onPress={() => onTabChange(categoryCode, index)}
          >
            <View
              style={[
                styles.tabItemBox,
                categoryCode === currentActive &&
                  index !== 0 &&
                  styles.tabBoxActive,
                categoryCode === currentActive &&
                  index === 0 &&
                  styles.tabBottomBoxActive,
              ]}
            >
              <View
                style={categoryCode === currentActive && styles.heightLine}
              ></View>
              <Text
                style={[
                  styles.tabLabel,
                  categoryCode === currentActive && styles.tabLabelActive,
                ]}
              >
                {categoryName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
