/**
 * Created by 李华良 on 2019-10-10
 */
import * as React from 'react'
import TimerDisplay from "@components/business/Content/LimitTimeBuy/Timer"
import {ActivityStatus} from "@common/typings";

interface Props {
  start: number
  end: number
  onStatusChange?: (preStatus: ActivityStatus, status: ActivityStatus) => void
}


function getActivityDurationAndStatus({start, end}: {start: number, end: number}):[ number, ActivityStatus ] {
  const now = Date.now()
  return now < start ? [ start - now, ActivityStatus.Pending ]
    : now < end ? [ end - now, ActivityStatus.Processing ]
      : [ 0, ActivityStatus.Expired ]
}

function statusToTitle(status: ActivityStatus) {
  switch (status) {
    case ActivityStatus.Pending:
      return '离本场开始'
    case ActivityStatus.Processing:
      return '离本场结束'
    case ActivityStatus.Expired:
      return '本场已结束'
    default:
      return '本场已结束.'
  }
}

export default function Timer ({start, end, onStatusChange}: Props) {
  const activity = { start, end }
  const [ activityDuration, activityStatus ] = getActivityDurationAndStatus(activity)
  const [ duration, setDuration ] = React.useState(activityDuration)
  const [ status, setStatus ] = React.useState(activityStatus)

  React.useEffect(() => {
    const durationAndStatus = getActivityDurationAndStatus(activity)
    setDuration(durationAndStatus[0])
    setStatus(durationAndStatus[1])

    let timer = setInterval(() => {
      const [ nextDuration, nextStatus ] = getActivityDurationAndStatus(activity)
      setDuration(nextDuration)
      setStatus(preStatus => {
        if (preStatus !== nextStatus) { // 状态变化回调
          onStatusChange && onStatusChange(preStatus, nextStatus)
        }
        return nextStatus
      })

      if (nextDuration === 0) clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [ activity ])

  const title = statusToTitle(status)

  return <TimerDisplay title={title} duration={duration} millisecondVis />
}