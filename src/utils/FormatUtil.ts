/*
 * @Description: 格式处理的方法
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-22 13:37:10
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-15 17:24:21
 */

/**
 * @description:将人民币分转为人民币元
 * @param {num}
 * @param {dec}
 * @return:num
 */
const parseNumber = function(num, dec = 0) {
  return num ? parseFloat(num.toFixed(dec)) : num
}
/**
 * @description:将人民币分转为人民币元
 * @param {num}
 * @return:num
 */
export const transPenny = (num) => parseNumber(num ? num / 100 : 0, 2)
/**
 * @description: 将时间戳转为字符串格式
 * @param {timestamp}
 * @return: string
 */
export const formatYMDEn = (timestamp) => {
  if (timestamp === undefined) {
    return ''
  }
  const date = new Date(parseInt(timestamp))
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}
/**
 * @description:创建map数据结构的函数
 */
export const Map = function() {
  let struct = function(key, value) {
      this.key = key
      this.value = value
    },
    // 添加map键值对
    put = function(key, value) {
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i].key === key) {
          this.arr[i].value = value
          return
        }
      }
      this.arr[this.arr.length] = new struct(key, value)
    },
    //  根据key获取value
    get = function(key) {
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i].key === key) {
          return this.arr[i].value
        }
      }
      return null
    },
    //   根据key删除
    remove = function(key) {
      let v
      for (let i = 0; i < this.arr.length; i++) {
        v = this.arr.pop()
        if (v.key === key) {
          continue
        }
        this.arr.unshift(v)
      }
    }
  //   获取map键值对个数
  let size = function() {
      return this.arr.length
    },
    // 判断map是否为空
    isEmpty = function() {
      return this.arr.length <= 0
    }
  this.arr = new Array()
  this.get = get
  this.put = put
  this.remove = remove
  this.size = size
  this.isEmpty = isEmpty
}

/**
 * 将毫秒转化为 [hours, minutes, seconds, milliseconds] 结构
 * @param milliseconds 毫秒时长
 */
export function transMilliseconds(milliseconds) {
  return [
    Math.floor(milliseconds / (1000 * 60 * 60)),
    Math.floor( milliseconds % (1000 * 60 * 60) / (1000 * 60)),
    Math.floor(milliseconds % (1000 * 60) / 1000),
    milliseconds % 1000,
  ]
}
