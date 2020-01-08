/*
 * @Author: 李华良
 * @Date: 2019-09-26 15:52:20
 * @Last Modified by: 李华良
 * @Last Modified time: 2020-01-08 14:22:46
 */
import * as React from 'react'
import styles from './AdTitle.styles'
import { Native } from '@utils'
import { TouchableWithoutFeedback, View, Text, Image } from 'react-native'
import { iconArrowRight } from '@const/resources'

interface Props {
  children: string // 标题文本
  link?: Native.Navigation // 链接
  moreVisible?: boolean // 是否显示更多
}

const AdTitle: React.FunctionComponent<Props> = ({
  children,
  link,
  moreVisible,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
      <View style={styles.container}>
        <Text style={styles.title}>{children}</Text>
        {moreVisible && (
          <View style={styles.navBox}>
            <Text style={styles.navText}>更多</Text>
            <Image style={styles.navIcon} source={iconArrowRight} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

AdTitle.defaultProps = {
  moreVisible: false,
}

export default AdTitle
