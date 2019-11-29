/**
 * Created by 李华良 on 2019-11-25
 */
export enum ActivityStatus {
  Pending = '未开始',
  Processing = '进行中',
  Expired = '已结束',
}

export interface BaseObj {
  [index: string]: any
}

export enum ShareChannel {
  WeChatFriends = '微信好友',
  Poster = '朋友圈'
}

export enum ProductType {
  Normal = 'normal',
  PreSale = 'pre-sale',
}