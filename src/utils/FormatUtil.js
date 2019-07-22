/*
 * @Description: 格式处理的方法
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-22 13:37:10
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-22 14:11:13
 */
var parseNumber = function (num, dec = 0) {
  return num ? parseFloat(num.toFixed(dec)) : num
}
/**
 * @description:将人民币分转为人民币元 
 * @param {num} 
 * @return:num
 */
export const transPenny =  (num)=> {
  return parseNumber(num ? num / 100 : 0, 2)
}
/**
 * @description: 将时间戳转为字符串格式
 * @param {timestamp} 
 * @return: string
 */
export const formatYMDEn = (timestamp) => {
  if (timestamp === undefined) {
    return '';
  }
  const date = new Date(parseInt(timestamp));
  const year = date.getFullYear();
  const month = parseInt(date.getMonth()) + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};
/**
 * @description: 字符串转成html格式
 * @param {originString} 
 * @return: newString
 */
export const formatStringWithHtml = (originString) => {
  if (originString === undefined) {
    return '';
  }
  const newString = originString
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  return newString;
};
