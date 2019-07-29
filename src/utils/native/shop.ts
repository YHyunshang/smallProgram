/**
 * Created by 李华良 on 2019-07-23
 */
import { NativeModules } from 'react-native'

export const getShop = () => NativeModules.CalendarManager.findEvents('post', 'http://10.0.71.79:10000/usercenter/login?businessType=24', {"username":"18521032627","password":"afdd0b4ad2ec172c586e2150770fbf9e"}, (errMsg, data) => console.log('>>>>>', errMsg, data))
// export const getShop = () => NativeModules.CalendarManager.toggleHeader(true)