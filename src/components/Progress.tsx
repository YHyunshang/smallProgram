/**
 * Created by 李华良 on 2019-12-13
 */
import * as React from 'react'
import styles from './Progress.styles'
import {View, Text} from "react-native";

export interface ProgressProps {
  percent: number
  strokeWidth?: number
  strokeColor?: string
  format?: (percent: number) => string
  renderText?: (percent: number) => React.ReactNode
  borderColor?: string
  borderWidth?: number
  backgroundColor?: string
  textSize?: number
  textColor?: string,
}

const Progress: React.FunctionComponent<ProgressProps> = (
  { percent, strokeWidth, strokeColor, format, renderText, borderWidth, borderColor, backgroundColor, textSize, textColor }
) => {
  const radius = strokeWidth / 2 + 0.5
  const containerStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius: radius,
  }
  const strokeStyle = {
    width: `${percent}%`,
    height: strokeWidth,
    backgroundColor: strokeColor,
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
  }
  const textStyle = {
    color: textColor,
    fontSize: textSize,
  }

  const text = renderText
    ? renderText(percent)
    : (
      <View style={styles.textBox}>
        <Text style={[ styles.text, textStyle ]}>{format(percent)}</Text>
      </View>
    )

  return (
    <View style={[ styles.container, containerStyle ]}>
      <View style={[ styles.strokeBar, strokeStyle ]} />
      {text}
    </View>
  )
}

Progress.defaultProps = {
  strokeWidth: 12,
  strokeColor: '#FFF',
  format: percent => `${percent}%`,
  borderWidth: 0.5,
  borderColor: 'transparent',
  backgroundColor: '#FFACBA',
  textColor: '#F32E57',
  textSize: 10,
}

export default Progress
