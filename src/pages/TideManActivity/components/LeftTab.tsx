/*
 * @Descripttion: 左边侧栏组件
 * @Author: yuwen.liu
 * @Date: 2019-11-12 23:52:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-13 16:26:58
 */
import * as React from 'react'
import styles from './LeftTab.styles'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

interface Props {
  currentActive: string
  data: {
    key: string
    label: string
  }[]
  onTabChange: (key: string) => void
}

export default function LeftTab({ currentActive, data, onTabChange }: Props) {
  const total = data.length
  return (
    <View style={styles.container}>
      <ScrollView  showsHorizontalScrollIndicator={false}>
        {data.map(({ key, label }, index) => (
          <TouchableOpacity
            activeOpacity={0.95}
            key={key}
            onPress={() => onTabChange(key)}
          >  
            <View
              style={[
                styles.tabItemBox,
                key === currentActive && styles.tabItemBoxActive,
              ]}
            >
              <View style={ key === currentActive && styles.heightLine}></View>
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
