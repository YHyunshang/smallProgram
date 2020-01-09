/**
 * Created by 李华良 on 2019-12-27
 */
import * as React from "react";
import {BaseObj} from "@common/typings";

export interface Route {
  path: string,  // e.g. 商详页
  name: string,  // e.g. 彩食鲜樱桃1kg
  extraData?: BaseObj,  // 其他附带信息
}

export const RouteContext:React.Context<Route> = React.createContext({ path: '', name: '' })
RouteContext.displayName = 'RouteContext'