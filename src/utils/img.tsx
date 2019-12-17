/*
 * @Author: 李华良
 * @Date: 2019-09-20 10:55:05
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-20 15:49:51
 */
import {PixelRatio, Dimensions, Image, ImageURISource, ImageRequireSource, Platform, CameraRoll} from 'react-native'
import * as Log from './log'
import {FastImageSource} from "react-native-fast-image";
import {applyPhotosPermission, isiOS, onNativeEvent, showToast} from "@utils/native";
import RNFS from "react-native-fs";
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
 * 图片资源
 */
export type ImageSource = ImageURISource | ImageRequireSource | FastImageSource

/**
 * 获取图片尺寸
 * @param img 图片资源
 */
export function getSize(img: ImageSource):Promise<ImageSize> {
  // resolve the source and use it instead
  // @ts-ignore: FastImageSource includes uri
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
export function getRatio(img: ImageSource): Promise<number> {
  return getSize(img)
    .then(({ width, height }) => width / height)
}

/**
 * 下载网络图片到相册
 * @param uri 图片 uri
 */
export function download(uri) {
  if (isiOS) {
    return _download_(uri)
  } else {
    return new Promise((resolve, reject) => {
      const removeListener = onNativeEvent('applyResult', ({ resultValue }) => {
        if (resultValue !== 'true') {
          showToast('图片保存失败，请授权永辉买菜访问您的相册', '0')
          return
        }
        removeListener()
        _download_(uri)
          .then(resolve, reject)
      })
      applyPhotosPermission()
    })
  }
}
async function _download_(url:string) {
  if (!url) return new Error('图片不能为空')

  const timestamp = new Date().getTime() // 获取当前时间错
  const random = String((Math.random() * 1000000) | 0) // 六位随机数
  const dirs = isiOS ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath // 外部文件，共享目录的绝对路径（仅限android）
  const downloadDest = `${dirs}/${timestamp}${random}.jpg`

  const request = RNFS.downloadFile({
    fromUrl: url,
    toFile: downloadDest,
    background: true,
  })
  await request.promise
  return CameraRoll.saveToCameraRoll(downloadDest)
}
