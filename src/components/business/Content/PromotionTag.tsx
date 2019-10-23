import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  title: string
  content: string
  primaryColor?: string
  secondaryColor?: string
}

export default function PromotionTag({
  title,
  content,
  primaryColor = '#F24458',
  secondaryColor = '#FFF'
}: Props) {
  return (
    <View style={styles.container}>
      <View style={[ styles.titleContainer, { backgroundColor: primaryColor } ]}>
        <Text style={[ styles.title, { color: secondaryColor } ]}>{title}</Text>
      </View>
      <View style={[ styles.contentContainer, { borderColor: primaryColor } ]}>
        <Text style={[ styles.content, { color: primaryColor } ]}>{content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 5,
  },

  titleContainer: {
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1,
    paddingHorizontal: 5,
    height: 17,
    justifyContent: 'center',
  },
  title: {
    fontSize: 11,
  },

  contentContainer: {
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderLeftWidth: 0,
    paddingHorizontal: 7,
    height: 17,
    justifyContent: 'center',
  },
  content: {
    fontSize: 11,
  },
})
