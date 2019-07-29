/**
 * Created by 李华良 on 2019-07-23
 */
import { NativeModules } from 'react-native'
import RequestErr from './http-err'
import HostMapper from './host-mapper'
import { Log } from '@utils'

/**
 * send http request based on native
 * @param method {string} HTTP request method
 * @param url {string} api path
 * @param data {object} post data
 * @returns {Promise}
 */
function request(method: string, url: string, data?: object) {
  let request
  try {
    request = NativeModules.HttpNativeManager.sendRequest
  } catch (e) {
    return Promise.reject(RequestErr('RN', 'can not found HttpNativeManager.sendRequest in native module!'))
  }

  Log.debug(`calling HttpNativeManager.sendRequest(${method}, ${url}, ${data}, callbackFunc)`)
  return new Promise((resolve, reject) => request(
    method.toLowerCase(),
    url,
    method.toLowerCase() === 'get' ? null : data,
    (errMsg, responseData) => {
      if (errMsg) {
        return reject(new RequestErr('NATIVE', errMsg))
      }
      Log.debug(`HttpNativeManager.sendRequest(${method}, ${url}, ${data}, callbackFunc) returned`, errMsg, responseData)
      return resolve(responseData ? JSON.parse(responseData) : {})
    }
  ))
}

/**
 * format url with host/path/queryObj
 * @param hostKey {string}
 * @param path {string}
 * @param query {object}
 */
function formatUrl(hostKey: string, path: string, query={}) {
  const nativeEnv = NativeModules.HomeNativeManager.envPathType
  const env = { 0: 'test', 1: 'dev', 2: 'prod' }[nativeEnv]
  if (!env) throw new RequestErr('RN', `map native env[${nativeEnv}] to RN env[${env}] failed`)

  const host = (HostMapper[env][hostKey] || '').trim().replace(/\/+$/, '')
  if (!host) throw new RequestErr('RN', `no host for hostKey[${hostKey}]`)

  const queryStr = Object.entries(query)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
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

export const get = (host: string, path: string, query={}) => Http({ method: 'get', host, path, query })
export const post = (host: string, path: string, query={}, data={}) => Http({ method: 'post', host, path, query, data })
export const put = (host: string, path: string, query={}, data={}) => Http({ method: 'put', host, path, query, data })
export const del = (host: string, path: string, query={}) => Http({ method: 'del', host, path, query })
