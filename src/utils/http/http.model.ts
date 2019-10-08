/**
 * Created by 李华良 on 2019-07-25
 */
namespace http {
  export interface HttpConfig {
    method: string
    host: string
    path: string
    query: object
    data: object
  }

  export interface ApiConfig {
    host: string
    path: string
  }
}
