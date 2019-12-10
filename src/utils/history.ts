/**
 * Created by 李华良 on 2019-12-10
 */
import {BaseObj} from "@common/typings";

export interface Route {
  path: string,  // e.g. 商详页
  name: string,  // e.g. 彩食鲜樱桃1kg
  extraData?: BaseObj,  // 其他附带信息
}

const MAX_COUNT = 30
let Data: Route[] =[]

/**
 * 对 RN 页面路由栈的简单封装
 * 仅保留最近的 MAX_COUNT 个路由
 */
export default class History {
  data: Route[] = []

  // 当前路由
  static cur = (): Route => {
    const route = Data.slice(-1)[0]
    return route ? {...route} : null
  }

  // 前一个路由
  static pre = (): Route => {
    const route = Data.slice(-2)[0]
    return route ? {...route} : null
  }

  // 路由入栈
  static push = (v: Route) => {
    Data.push(v)
    const length = Data.length
    if (length > MAX_COUNT) {
      Data.splice(0, length - MAX_COUNT)
    }
  }

  // 路由出栈
  static pop = () => {
    Data.pop()
  }

  // 所有路由
  static all = () => [...Data]

  // 修改当前路由对象
  static updateCur = (v: object | ((v:Route) => Route)):Route => {
    const route = History.cur()
    let nextRoute = { ...(route || {}), ...(v instanceof Function ? v(route) : v) }
    Data.pop()
    // @ts-ignore
    Data.push(nextRoute)
    // @ts-ignore
    return nextRoute
  }
}