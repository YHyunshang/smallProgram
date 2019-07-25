/*
 * @Description: 下载网络图片保存至本地相册
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-18 12:30:01
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-23 09:38:04
 */
//import RNFS from 'react-native-fs'
import {Platform,CameraRoll} from 'react-native'
async const requestCameraPermission=()=> {
    if (Platform.OS == 'ios') return true;
    //申请相机权限
    try {
     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: '申请摄像头权限',
      message: '一个很牛逼的应用想借用你的摄像头'
     });
     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('现在你获得摄像头权限了');
      return true;
     } else {
      console.log('用户并不屌你');
      return false;
     }
    } catch (err) {
     console.warn(err);
     return false;
    }
   }
export const downloadImage=(uri)=> {
    requestCameraPermission() //申请相机权限
    if (!uri) return null;
    return new Promise((resolve, reject) => {
        let timestamp = (new Date()).getTime();//获取当前时间错
        let random = String(((Math.random() * 1000000) | 0))//六位随机数
        let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
        const downloadDest = `${dirs}/${timestamp+random}.jpg`;
        const formUrl = uri;
        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
            },
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                var promise = CameraRoll.saveToCameraRoll(downloadDest);
                promise.then(function(result) {
                    console.log('result', result);
                }).catch(function(error) {
                     console.log('error', error);
                });
                resolve(res);
            }).catch(err => {
                reject(new Error(err))
            });
        } catch (e) {
            reject(new Error(e))
        }

    })

}