/*
 * @Description: 帮助与反馈
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-16 09:54:53
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-29 19:35:49
 */
import {Http} from '@utils'
/**
 *获取帮助与反馈的问题列表
 * @return {Promise} Http request instance
 */
export const getTypeList = () => Http.post('feedback', '/sys/sysQuestion/typeList', {}, {})
/**
 *获取帮助与反馈的问题解答
 * @return {Promise} Http request instance
 */
export const getAnswerList = (questionTypeId) => Http.post('feedback', '/sys/sysQuestion/subList', {questionTypeId}, {questionTypeId})
