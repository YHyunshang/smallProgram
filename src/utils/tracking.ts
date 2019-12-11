/**
 * 埋点
 * Created by 李华良 on 2019-12-05
 */
import { NativeModules } from 'react-native';
const RNSensorsAnalyticsModule = NativeModules.RNSensorsAnalyticsModule;

/**
 * 神策埋点
 * @param event 事件名
 * @param data 事件数据
 */
export function track(event: string, data: object):void {
  try {
    console.log(`tracking: event[${event}] data`)
    console.table(data)
    RNSensorsAnalyticsModule.track(event, data)
  } catch (e) {
    console.warn('[TRACK] tracking failed', e)
  }
}