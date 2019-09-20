/*
 * @Author: 李华良
 * @Date: 2019-09-20 10:55:05
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-20 15:49:51
 */
import { PixelRatio, Dimensions } from 'react-native'
import * as Log from './log'
/**
 * 根据屏幕像素密度获取对应尺寸的图片，仅支持 hotfile cdn
 * @param src 图片地址
 * @param width pt 宽度
 * @param height pt 高度
 */
export function loadRatioImage(src: string, width?: number, height?: number) {
  if (!/^https?:\/\/hotfile-cdn\.yonghui\.cn/) {
    Log.warn(
      'only support images on hotfile cdn: http(s)://hotfile-cdn.yonghui.cn'
    )
    return src
  }

  if (!width && !height) return src

  const query = {
    width: width ? PixelRatio.getPixelSizeForLayoutSize(width) : undefined,
    height: height ? PixelRatio.getPixelSizeForLayoutSize(height) : undefined,
  }
  const queryStr = Object.entries(query)
    .filter(([k, v]) => v !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
  return !!queryStr ? `${src}?${queryStr}` : src
}

export const FullWidth = Dimensions.get('window').width
