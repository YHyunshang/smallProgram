/*
 * @Descripttion: 顶部菜单栏
 * @Author: yuwen.liu
 * @Date: 2019-11-12 21:18:25
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2019-12-25 10:09:30
 */
import * as React from 'react'
import styles from './TopTab.styles'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

interface Props {
  currentActive: number
  data: {
    key: number
    label: string
  }[]
  onTabChange: (key: number) => void
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
                key === currentActive && styles.tabActiveItemBox,
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
            <View style={index !== total - 1 && styles.heightLine}></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
