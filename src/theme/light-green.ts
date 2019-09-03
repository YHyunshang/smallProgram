/**
 * 主题色
 * 颜色 0 ～ 10 逐渐变浅
 * @Author: 李华良 
 * @Date: 2019-09-03 14:50:25 
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-03 18:31:58
 */
import { Platform } from 'react-native';
const isAndroid = Platform.OS === 'android'

export const primary = '#82BF3C'
export const secondary = '#97CC5B'

export const white = '#FFFFFF'

export const black = '#333333'
export const black1 = '#666666'

export const gray = '#A3A3A3'
export const gray1 = '#B3B3B3'
export const gray10 = '#F6F6F6'

export const orange = '#FA8500'
export const orange10 = '#FFE5E0'

export const red = '#FF3914'
export const red1 = '#FF6042'
export const red10 = '#FFDED9'

// 价格字体
export const priceFFPrimary = isAndroid ? 'Alte_Din_1451_Mittelschrift' : 'Alte Din 1451 Mittelschrift'