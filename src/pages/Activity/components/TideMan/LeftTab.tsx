/*
 * @Descripttion: 左边侧栏组件
 * @Author: yuwen.liu
 * @Date: 2019-11-12 23:52:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-27 11:19:14
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
  const total = data.length
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {data.map(({ categoryCode, categoryName }, index) => (
          <TouchableOpacity
            activeOpacity={0.95}
            key={categoryCode}
            onPress={() => onTabChange(categoryCode, index)}
          >
            <View
              style={[
                styles.tabItemBox,
                categoryCode === currentActive && styles.tabItemBoxActive,
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
