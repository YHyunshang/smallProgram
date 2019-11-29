/**
 * 底部弹出框
 * Created by 李华良 on 2019-11-27
 */
import * as React from 'react'
import styles from './PopUp.styles'
import {View, Text, TouchableOpacity, Animated, Easing} from "react-native";
import FastImage from "react-native-fast-image";
import {iconClose} from "@const/resources";
import {WindowHeight} from "@utils/global";

export interface PopUpProps {
  visible: boolean  // 展示 / 隐藏
  title: string  // 标题
  onClose: () => void  // 关闭回调
  afterVisibleAnimation?: (visible: boolean) => void  // 展示/隐藏过场动画结束回调，如果要销毁组件建议在此执行
  autoSafeArea?: boolean  // 是否自动适屏，自动为 iPhoneX+ 机型添加底部预留空间（34pt）
}

const PopUp: React.FunctionComponent<PopUpProps> =
  ({ visible, title, onClose, afterVisibleAnimation, autoSafeArea, children }) => {
  const [ selfHeight, setSelfHeight ] = React.useState(0)
  const onLayout = e => {
    const { height } = e.nativeEvent.layout
    setSelfHeight(height)
  }

  const [ translateY ] = React.useState(new Animated.Value(0))
  React.useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? WindowHeight - selfHeight : WindowHeight,
      duration: 120,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(
      () => afterVisibleAnimation instanceof Function && afterVisibleAnimation(visible)
    )
  }, [ visible, selfHeight ])

  return (
    <Animated.View
      style={[ styles.container, { transform: [{ translateY }] }, autoSafeArea && styles.safeArea ]}
      onLayout={onLayout}
    >
      <View style={styles.header}>
        <Text style={styles.textTitle}>{ title }</Text>

        <TouchableOpacity style={styles.btnClose} onPress={onClose}>
          <FastImage style={styles.iconClose} source={iconClose} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {children}
      </View>
    </Animated.View>
  )
}

PopUp.defaultProps = {
  autoSafeArea: true,
}

export default PopUp
