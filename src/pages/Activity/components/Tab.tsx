import * as React from 'react'
import styles from './Tab.styles'
import { ScrollView, View, Text } from 'react-native'

interface Props {
  currentActive: string
  data: {
    key: string
    label: string
  }[]
}

export default function Tab({ currentActive, data }: Props) {
  const total = data.length
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data.map(({ key, label }, index) => (
        <View
          style={[
            styles.tabItemBox,
            index === 0 && styles.tabItemBoxFirst,
            index === total - 1 && styles.tabItemBoxLast,
          ]}
          key={key}
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
      ))}
    </ScrollView>
  )
}
