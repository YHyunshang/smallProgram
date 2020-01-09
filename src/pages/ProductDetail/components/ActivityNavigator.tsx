/**
 * 满减活动跳转
 * Created by 李华良 on 2019-12-26
 */
import * as React from 'react'
import styles from './ActivityNavigator.styles'
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {iconArrowRight} from "@const/resources";
import {Native} from "@utils";
import {NavPageType} from "@utils/native";

export interface ActivityNavigatorProps {
  tag: string // 满减活动标签
  code: string // 满减活动编码
  title: string // 满减活动标题
}

const ActivityNavigator: React.FunctionComponent<ActivityNavigatorProps> = (
  { tag, code, title }
) => {
  const navToActivity = () => Native.navigateTo({
    type: NavPageType.NATIVE,
    uri: 'B002,B002',
    params: { promotionCode: code }
  })

  return (
    <TouchableWithoutFeedback onPress={navToActivity}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.tagBox}
          colors={[ '#F34343', '#FF8671' ]}
          start={{ x: 0, y: 0}}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.tagText}>{tag}</Text>
        </LinearGradient>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Image style={styles.icon} source={iconArrowRight} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ActivityNavigator
