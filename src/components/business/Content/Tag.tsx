/*
 * @Author: 李华良
 * @Date: 2019-09-04 17:03:24
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-05 10:24:51
 */
import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import theme from '@theme'

interface Props {
  color: string
  children: React.ReactNode
}

export default function Tag({ color, children }: Props) {
  return (
    <Text style={[styles.container, { backgroundColor: color }]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 1,
    overflow: 'hidden',
    lineHeight: 17,
    textAlignVertical: 'center',
    paddingHorizontal: 3,
    fontSize: 10,
    color: theme.white,
    marginRight: 5,
  },
})
