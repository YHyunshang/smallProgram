/**
 * Created by 李华良 on 2019-07-25
 */
export interface HttpConfig {
  method: string
  host: string
  path: string
  query?: {
    [index:string]: string
  }
  data?: {
    [index:string]: string
  }
}

export interface ApiConfig {
  host: string
  path: string
}