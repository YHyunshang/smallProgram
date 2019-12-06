/**
 * Created by 李华良 on 2019-11-25
 */
import * as React from 'react'
import {ActivityStatus} from "@common/typings";

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
  start:number,
  end:number,
  onStatusChange?: (status: ActivityStatus, oldStatus: ActivityStatus) => void
): ActivityStatusWithMilliseconds {
  const statusCalculator = ():ActivityStatusWithMilliseconds => {
    const now = Date.now()
    return now < start
      ? { status: ActivityStatus.Pending, milliseconds: start - now }
      : now < end
        ? { status: ActivityStatus.Processing, milliseconds: end - now }
        : { status: ActivityStatus.Expired, milliseconds: now - end}
  }

  const [ status, setStatus ] = React.useState(statusCalculator)

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