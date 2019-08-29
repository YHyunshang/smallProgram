/**
 * Created by 李华良 on 2019-07-23
 */
import { NativeModules } from 'react-native'
import RequestErr from './http-err'
import HostMapper from './host-mapper'
import * as Log from '../log'
import { showToast } from '../native'

/**
 * send http request based on native
 * @param method {string} HTTP request method
 * @param url {string} api path
 * @param data {object} post data
 * @returns {Promise}
 */
async function request(
  method: string,
  url: string,
  data?: object
): Promise<{
  code: number
  message: string
  result?: { [index: string]: any } | []
  page?: { result: [] }
}> {
  let request: Function
  try {
    request = NativeModules.HttpNativeManager.sendRequest
  } catch (e) {
    return Promise.reject(
      new RequestErr(
        'RN',
        'can not found HttpNativeManager.sendRequest in native module!'
      )
    )
  }

  return new Promise<{ result: any; code: number; message: string }>(
    (resolve, reject) =>
      request(
        method.toLowerCase(),
        url,
        method.toLowerCase() === 'get' ? null : JSON.stringify(data),
        (errMsg, responseData) => {
          if (errMsg) {
            Log.debug(
              `NativeModules.HttpNativeManager.sendRequest returned an error. ARGS:`,
              method,
              url,
              data,
              `ERR:`,
              errMsg
            )
            showToast(errMsg)
            return reject(new RequestErr('NATIVE', errMsg))
          }

          const result = responseData ? JSON.parse(responseData) : {}
          Log.debug(
            `NativeModules.HttpNativeManager.sendRequest returned. ARGS:`,
            method,
            url,
            data,
            `RESULT:`,
            result
          )
          if (result.code === 400109) {
            // token 过期或未登录
            return reject(new RequestErr('SYSTEM', result.message))
          } else if (result.code !== 200000) {
            showToast(result.message || '系统异常')
            return reject(new RequestErr('SYSTEM', result.message))
          }
          return resolve(result)
        }
      )
  )
}

/**
 * format url with host/path/queryObj
 * @param hostKey {string}
 * @param path {string}
 * @param query {object}
 */
export function formatUrl(hostKey: string, path: string, query = {}) {
  const nativeEnv = NativeModules.HttpNativeManager.envPathType
  const env = { 0: 'test', 1: 'dev', 2: 'prod' }[nativeEnv]
  if (!env)
    throw new RequestErr(
      'RN',
      `map native env[${nativeEnv}] to RN env[${env}] failed`
    )

  const host = (HostMapper[env][hostKey] || '').trim().replace(/\/+$/, '')
  if (!host) throw new RequestErr('RN', `no host for hostKey[${hostKey}]`)

  const queryStr = Object.entries(query)
    .map(
      ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    )
    .join('&')
  const _path_ = path.trim().replace(/^\//, '')

  return `${host}/${_path_}${queryStr ? `?${queryStr}` : ''}`
}

/**
 * Http request
 * @param config {object}
 * @param config.method {string} http request method
 * @param config.host {string} host name
 * @param config.path {string} api path
 * @param config.query {object} query object which will be encoded and appended after path with a '?' prefix
 * @param config.data {object} payload data used in POST / PUT request
 * @return {Promise}
 */
export default function Http(config: HttpModel.HttpConfig) {
  const { method, host, path, query, data } = config
  const url = formatUrl(host, path, query)
  return request(method, url, data)
}

export const get = (host: string, path: string, query = {}) =>
  Http({ method: 'get', host, path, query })
export const post = (host: string, path: string, query = {}, data = {}) =>
  Http({ method: 'post', host, path, query, data })
export const put = (host: string, path: string, query = {}, data = {}) =>
  Http({ method: 'put', host, path, query, data })
export const del = (host: string, path: string, query = {}) =>
  Http({ method: 'del', host, path, query })
