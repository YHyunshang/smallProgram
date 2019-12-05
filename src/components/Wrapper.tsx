/**
 * 全屏浮层组件
 * 使用时确保组件在顶级
 * Created by 李华良 on 2019-11-29
 */
import * as React from 'react'
import {Animated, Easing, TouchableWithoutFeedback, View} from "react-native";
import styles from './Wrapper.styles'

export interface WrapperProps {
  visible: boolean  // 是否可见
  onClose: () => void  // 关闭回调
  afterVisibleAnimation?: (visible: boolean) => void  // 展示 / 隐藏过场动画结束回调，如果要销毁组件建议在这里做
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({ visible, onClose, afterVisibleAnimation, children }) => {
  const [ opacity ] = React.useState(new Animated.Value(0))
  const [ isDisplayed, setIsDisplayed ] = React.useState(false)

  React.useEffect(() => {
    visible && setIsDisplayed(true)
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 120,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      !visible && setIsDisplayed(false)
      afterVisibleAnimation instanceof Function && afterVisibleAnimation(visible)
    })
  }, [visible])

  return (
    <Animated.View style={[ styles.container, { opacity }, !isDisplayed && { display: 'none', position: 'relative' } ]}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.closeArea} />
      </TouchableWithoutFeedback>

      {children}
    </Animated.View>
  )
}

export default Wrapper
