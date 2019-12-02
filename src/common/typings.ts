/**
 * Created by 李华良 on 2019-11-25
 */
export interface BaseObj {
  [index: string]: any
}

export enum ShareChannel {
  WeChatFriends = '微信好友',
  Poster = '朋友圈'
}

// 活动状态
export enum ActivityStatus {
  Pending = '未开始',
  Processing = '进行中',
  Expired = '已结束',
}

// 限时抢购活动状态
export import LimitTimeBuyStatus = ActivityStatus

// 商品类型
export enum ProductType {
  Normal = 'normal',
  PreSale = 'pre-sale',
}
// 商品
export interface Product {
  type?: ProductType // 商品类型
  cartId: string // 购物车商品id
  code: string // 商品编码
  thumbnail: string // 缩略图
  name: string // 商品名称
  desc: string // 商品描述
  productTags?: string[] // 商品标签列表
  priceTags?: string[] // 价格标签列表
  spec: string // 规格
  price: number // 当前价格
  slashedPrice?: number // 划线价
  count: number // 商品在购物车中的数量
  shopCode?: string // 商品所在门店编码
  remark: string // 商品在购物车中的备注
  remarks: string[] // 商品备注列表
  inventoryLabel?: string // 商品缺货提示
  onModifyCount?: (count: number) => any // 修改数量
}