/*
 * @Description: 下载网络图片保存至本地相册
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-18 12:30:01
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-09 10:09:00
 */
import RNFS from 'react-native-fs'
import {
  Platform,
  CameraRoll
} from 'react-native'
export const downloadImage = url => {
  if (!url) return null
  return new Promise((resolve, reject) => {
    let timestamp = new Date().getTime() // 获取当前时间错
    let random = String((Math.random() * 1000000) | 0) // 六位随机数
    let dirs =
    Platform.OS === 'ios' ?
      // eslint-disable-next-line no-undef
      RNFS.LibraryDirectoryPath :
      // eslint-disable-next-line no-undef
      RNFS.DocumentDirectoryPath // 外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${timestamp + random}.jpg`
    const formUrl = url
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: res => {}
    }
    try {
      const ret = RNFS.downloadFile(options)
      ret.promise
        .then(res => {
          let promise = CameraRoll.saveToCameraRoll(downloadDest)
          promise
            .then((result) => {
              console.log('result', result)
            })
            .catch((error) => {
              console.log('error', error)
            })
          resolve(res)
        })
        .catch(err => {
          reject(new Error(err))
        })
    } catch (e) {
      reject(new Error(e))
    }
  })
}
