/*
 * @Descripttion: 顶部菜单栏
 * @Author: yuwen.liu
 * @Date: 2019-11-12 21:18:25
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-12 23:55:01
 */
import * as React from 'react'
import styles from './TopTab.styles'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

interface Props {
  currentActive: string
  data: {
    key: string
    label: string
  }[]
  onTabChange: (key: string) => void
}

export default function TopTab({ currentActive, data, onTabChange }: Props) {
  const total = data.length
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(({ key, label }, index) => (
          <TouchableOpacity
            activeOpacity={0.95}
            key={key}
            onPress={() => onTabChange(key)}
          >
            <View
              style={[
                styles.tabItemBox,
                index === 0 && styles.tabItemBoxFirst,
                index === total - 1 && styles.tabItemBoxLast,
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  key === currentActive && styles.tabLabelActive,
                ]}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
