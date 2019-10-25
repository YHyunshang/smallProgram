/*
 * @Author: 李华良
 * @Date: 2019-09-20 10:55:05
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-20 15:49:51
 */
import {PixelRatio, Dimensions, Image, ImageURISource, ImageRequireSource} from 'react-native'
import * as Log from './log'
/**
 * 根据屏幕像素密度获取对应尺寸的图片
 * 仅支持 hotfile cdn，仅支持 按照宽度等比剪裁 或 按照固定宽高剪裁
 * 宽度自动最低 140
 * @param src 图片地址
 * @param width pt 宽度
 * @param height pt 高度
 */
export function loadRatioImage(src: string, width?: number, height?: number) {
  if (!/^https?:\/\/hotfile(-cdn)?\.yonghui\.cn/.test(src)) {
    Log.warn(
      'only support images on hotfile cdn: http(s)://hotfile(-cdn).yonghui.cn',
      src
    )
    return src
  }
  if (!(
    width > 0 &&
    (height === undefined || height > 0)
  )) {
    Log.warn('only support cut by width with ratio automatically or both width and height')
    return src
  }

  const fixedWidth = Math.max(PixelRatio.getPixelSizeForLayoutSize(width), 140)
  const fixedHeight = (!!height && height > 0) ? fixedWidth * height / width : undefined

  const query = {
    width: fixedWidth,
    height: fixedHeight,
  }
  const queryStr = Object.entries(query)
    .filter(([k, v]) => v !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v.toString())}`)
    .join('&')

  return !!queryStr ? `${src}?${queryStr}` : src
}

/**
 * 全屏宽度
 */
export const FullWidth = Dimensions.get('window').width

/**
 * 图片尺寸
 */
export interface ImageSize {
  width: number
  height: number
}

/**
 * 获取图片尺寸
 * @param img 图片资源
 */
export function getSize(img: ImageURISource | ImageRequireSource):Promise<ImageSize> {
  // resolve the source and use it instead
  const src = Image.resolveAssetSource(img)

  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error('must pass in a valid source'))
    } else if (src.uri) {
      Image.getSize(
        src.uri,
        (width, height) => resolve({ width, height }),
        reject
      )
    } else {
      resolve({ width: src.width, height: src.height })
    }
  })
}

/**
 * 获取图片宽高比
 * @param img 图片资源
 */
export function getRatio(img: ImageURISource | ImageRequireSource): Promise<number> {
  return getSize(img)
    .then(({ width, height }) => width / height)
}