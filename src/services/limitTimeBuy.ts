/**
 * Created by 李华良 on 2019-09-29
 */
import { NativeEventEmitter, NativeModules } from 'react-native'
import { Http, Log, Native } from '@utils'

/**
 * 获取限时抢购活动列表
 * @param shopCode 门店编码
 */
export function getActivityList(shopCode: string) {
  return Http.post('productCenter', '/app/limitedTimePurchase/activities', {}, { shopCode })
}