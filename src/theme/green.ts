/*
 * @Author: 李华良
 * @Date: 2019-09-15 09:38:01
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-15 09:38:55
 */
import { Platform } from 'react-native'
const isAndroid = Platform.OS === 'android'

export const primary = '#41B25D'
export const secondary = '#41B25D'

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

export const darkGreen = '#5E882E'

export const refreshColor = '#4ECC6D'

// 价格字体
export const priceFFPrimary = isAndroid
  ? 'Alte_Din_1451_Mittelschrift'
  : 'Alte Din 1451 Mittelschrift'
