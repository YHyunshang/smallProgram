/**
 * Created by 李华良 on 2019-11-25
 */
import * as React from 'react'
import { ActivityStatus } from '@common/typings'
import { Animated, Easing } from 'react-native'

export interface ActivityStatusWithMilliseconds {
  status: ActivityStatus
  milliseconds: number
}

/**
 * 根据开始结束时间自动结算当前状态和倒计时
 * @param start 开始时间戳，毫秒
 * @param end 结束时间戳，毫秒
 * @param onStatusChange 状态变化回调
 */
export function useActivityStatus(
  start: number,
  end: number,
  onStatusChange?: (status: ActivityStatus, oldStatus: ActivityStatus) => void
): ActivityStatusWithMilliseconds {
  const statusCalculator = (): ActivityStatusWithMilliseconds => {
    const now = Date.now()
    return now < start
      ? { status: ActivityStatus.Pending, milliseconds: start - now }
      : now < end
      ? { status: ActivityStatus.Processing, milliseconds: end - now }
      : { status: ActivityStatus.Expired, milliseconds: now - end }
  }

  const [status, setStatus] = React.useState(statusCalculator)

  React.useEffect(() => {
    setStatus(statusCalculator())
    const timer = setInterval(() => {
      const nextStatus = statusCalculator()
      setStatus((status: ActivityStatusWithMilliseconds) => {
        if (status.status !== nextStatus.status && onStatusChange) {
          onStatusChange(nextStatus.status, status.status)
        }
        return nextStatus
      })
      nextStatus.status === ActivityStatus.Expired && clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [start, end])

  return status
}

/**
 * 占位图 hooks
 * @returns [placeholderVis, placeholderOpacityStyle, onLoad]，依次表示占位图是否可见，占位图透明度样式，实际图片加载回调函数
 */
export function usePlaceholder(): [
  boolean,
  { opacity: Animated.Value },
  () => void
] {
  const [placeholderVis, setPlaceholderVis] = React.useState<boolean>(true)
  const [placeholderOpacity] = React.useState<Animated.Value>(
    new Animated.Value(1)
  )
  const onLoad = () => {
    Animated.timing(placeholderOpacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setPlaceholderVis(false))
  }

  const placeholderOpacityStyle = { opacity: placeholderOpacity }

  return [placeholderVis, placeholderOpacityStyle, onLoad]
}
