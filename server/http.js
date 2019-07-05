import axios from 'axios'
import ApiList from './api.json'
import _ from 'lodash'
let CancelToken = axios.CancelToken
// let cancel
// /*
//  * 设置请求头
//  * 设置请求时间
//  */
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.timeout = 60000

// // request 请求前拦截器
// axios.interceptors.request.use(config => {
//     console.log(config)
// },error=>{
//     Promise.reject(error)
// })

// 请求后response,响应拦截器
axios.interceptors.response.use(
  response => response.data, error => {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 400:
          console.log('400')
          break
        case 401:
          console.log('会话已失效! 请重新登录')
          break
        case 402:
          console.log('登陆超时')
          break
        case 403:
          console.log('没有权限！')
          break
        default:
          console.log(`错误${error.response.status}`)
      }
      return Promise.resolve(error.response)
    }
    return Promise.resolve(error)
  }
)

// http请求
export default class HTTP {
  static api(method, url, data, params) {
    let postData = {}
    let _data = _.assign({}, data)
    _.forEach(_data, (val, key) => {
      if (['timeout'].indexOf(key) === -1) {
        postData[key] = val
      }
    })
    return axios({
      method,
      url,
      data: postData,
      params,
      withCredentials: true,
      CancelToken: new CancelToken(((c) => {
        // cancel = c
      }))
    })
  }

  /***
 * url获取
 * key传入路径
 */
  static getUrl(key) {
    if (typeof ApiList[key] === 'undefined' || ApiList[key] === '') {
      return ''
    }
    let url = ApiList[key]
    return url
  }
}
