import * as React from 'react'
import styles from './TimePad.styles'
import { View, Text } from 'react-native'

interface TimePadProps {
  backgroundColor?: string // 背景色
  color?: string // 文字颜色
  children: number
}

const TimePad: React.FunctionComponent<TimePadProps> = ({
  backgroundColor,
  color,
  children,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>
        {`${children}`.padStart(2, '0')}
      </Text>
    </View>
  )
}

TimePad.defaultProps = {
  backgroundColor: '#333',
  color: '#FFF',
}

export default TimePad
