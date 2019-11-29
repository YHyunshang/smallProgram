/**
 * Created by 李华良 on 2019-11-26
 */
import * as React from 'react'
import styles from './Header.styles'
import {TouchableOpacity, View, Text} from "react-native";
import FastImage from "react-native-fast-image";
import {iconShare} from "@const/resources";

export interface HeaderProps {
  index: number  // 当前激活的 tab index
  tabs: string[]  // tab 数组
  onIndexChange: (index: number, preIndex: number) => void  // 当前激活的 tab index 变化
  onSharePress: () => void
}

const Header: React.FunctionComponent<HeaderProps> = ({ tabs, index, onIndexChange, onSharePress }) => {
  const onShareBtnPress = e => {
    e.preventDefault()
    onSharePress()
  }

  return (
    <View style={styles.container}>
      {tabs.map((ele, idx) => (
        <TouchableOpacity
          key={idx}
          disabled={index === idx}
          onPress={() => onIndexChange(idx, index)}
        >
          <View style={styles.tabItem}>
            <Text style={[ styles.tabText, index === idx && styles.tabTextActive ]}>{ ele }</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.shareContainer}>
        <TouchableOpacity onPress={onShareBtnPress}>
          <View style={styles.btnShare}>
            <FastImage style={styles.iconShare} source={iconShare} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header
