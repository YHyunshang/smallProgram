/**
 * Created by 李华良 on 2019-07-25
 */

export default class RequestErr extends Error {
  type: string

  constructor(type: string, ...params) {
    super(...params)
    this.type = type
  }
}