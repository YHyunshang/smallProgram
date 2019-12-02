/**
 * 限时抢购
 * Created by 李华良 on 2019-09-29
 */
import * as React from 'react'
import {LimitTimeBuyStatus, Product} from "@common/typings"
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import styles from './LimitTimeBuy.styles'
import Timer from "./Timer";
import ProductItem from "@components/business/Content/LimitTimeBuy/ProductItem";
import {iconArrowRight} from "@const/resources";
import {Native} from "@utils";

interface Props {
  startTime: number // timestamp
  endTime: number // timestamp
  products: Product[]
  onExpired?: () => void // 过期回调
}

function getActivityDurationAndStatus({start, end}: {start: number, end: number}):[ number, LimitTimeBuyStatus ] {
  const now = Date.now()
  return now < start ? [ start - now, LimitTimeBuyStatus.Pending ]
    : now < end ? [ end - now, LimitTimeBuyStatus.Processing ]
    : [ 0, LimitTimeBuyStatus.Expired ]
}

function statusToTitle(status: LimitTimeBuyStatus) {
  switch (status) {
    case LimitTimeBuyStatus.Pending:
      return '离本场开始'
    case LimitTimeBuyStatus.Processing:
      return '离本场结束'
    case LimitTimeBuyStatus.Expired:
      return '本场已结束'
    default:
      return '本场已结束.'
  }
}

const ProductRow = React.memo(ProductItem)

export default function LimitTimeBuy({startTime, endTime, products, onExpired}: Props) {
  const [ activityDuration, activityStatus ] = getActivityDurationAndStatus({ start: startTime, end: endTime })
  const [ duration, setDuration ] = React.useState(activityDuration)
  const [ status, setStatus ] = React.useState(activityStatus)

  React.useEffect(() => {
    const durationAndStatus = getActivityDurationAndStatus({ start: startTime, end: endTime })
    setDuration(durationAndStatus[0])
    setStatus(durationAndStatus[1])

    let timer = setInterval(() => {
      const [ nextDuration, nextStatus ] = getActivityDurationAndStatus({ start: startTime, end: endTime })
      setDuration(nextDuration)
      setStatus(preStatus => {
        if (preStatus !== nextStatus && nextStatus === LimitTimeBuyStatus.Expired) { // 状态变化回调
          onExpired && onExpired()
        }
        return nextStatus
      })

      if (nextDuration === 0) clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [ startTime, endTime ])

  const title = statusToTitle(status)

  return (
    <TouchableWithoutFeedback
      onPress={() => Native.navigateTo({type: Native.NavPageType.RN, uri: 'LimitTimeBuy', title: '限时抢购'})}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>限时抢购</Text>
          <Timer duration={duration} title={title} />
          <Text style={styles.more}>更多</Text>
          <Image style={styles.iconArrowRight} source={iconArrowRight}/>
        </View>

        <View style={styles.productGrid}>
          {products.map(product => (
            <View style={styles.productBox} key={product.code}>
              <ProductRow {...product} status={status} />
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
