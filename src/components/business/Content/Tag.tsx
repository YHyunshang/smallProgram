/*
 * @Author: 李华良
 * @Date: 2019-09-04 17:03:24
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-05 10:24:51
 */
import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import theme from '@theme'

interface Props {
  color?: string
  backgroundColor?: string
  children: React.ReactNode
}

export default function Tag({ color, backgroundColor, children }: Props) {
  return (
    <Text
      style={[styles.container, { color, backgroundColor, }]}
      numberOfLines={1}
    >
      {children}
    </Text>
  )
}

Tag.defaultProps = {
  color: theme.tagDefaultColor,
  backgroundColor: theme.tagDefaultBg,
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 1,
    overflow: 'hidden',
    lineHeight: 16,
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    fontSize: 10,
    marginRight: 5,
  },
})
