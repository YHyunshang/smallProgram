import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  title: string
  content: string
  bgColor?: string
  customStyles?: {
    [index: string]: {}
  }
}

export default function PromotionTag({
  title,
  content,
  bgColor = '#F24458',
  customStyles = {},
}: Props) {
  return (
    <View
      style={[
        styles.container,
        { borderColor: bgColor },
        customStyles.container,
      ]}
    >
      <Text
        style={[styles.title, { backgroundColor: bgColor }, customStyles.title]}
      >
        {title}
      </Text>
      <Text style={[styles.content, { color: bgColor }, customStyles.content]}>
        {content}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 17,
    borderWidth: 1,
    borderRadius: 1,
    overflow: 'hidden',
    marginRight: 5,
  },
  title: {
    lineHeight: 15,
    color: '#FFF',
    fontSize: 11,
    paddingHorizontal: 5,
  },
  content: {
    fontSize: 11,
    lineHeight: 15,
    paddingHorizontal: 7,
  },
})
