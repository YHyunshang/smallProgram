/*
 * @Author: 李华良
 * @Date: 2019-09-26 15:52:20
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-26 17:25:51
 */
import * as React from 'react'
import styles from './AdTitle.styles'
import { Native } from '@utils'
import { TouchableWithoutFeedback, View, Text, Image } from 'react-native'
import { iconArrowRight } from '@const/resources'

interface Props {
  children: string
  link?: Native.Navigation
}

export default function AdTitle({ children, link }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
      <View style={styles.container}>
        <Text style={styles.title}>{children}</Text>
        <View style={styles.navBox}>
          <Text style={styles.navText}>更多</Text>
          <Image style={styles.navIcon} source={iconArrowRight} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
