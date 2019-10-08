import * as React from 'react'
import styles from './Tab.styles'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

interface Props {
  currentActive: string
  data: {
    key: string
    label: string
  }[]
  onTabChange: (key: string) => void
}

export default function Tab({ currentActive, data, onTabChange }: Props) {
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
