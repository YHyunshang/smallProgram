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

// 商品类型
export enum ProductType {
  Normal = 'normal',
  LimitTimeBuy = 'limit-time-buy',
  PreSale = 'pre-sale',
}

// 商品标签
export interface ProductLabels {
  delivery?: string[]  // 配送类标签
  activity?: string[]  // 活动类标签
  product?: string[]  // 商品属性类标签
  service?: string[]  // 服务类标签
}

// 商品配送类型
export enum ProductDeliveryType {
  InTime = '及时达',
  NextDay = '次日达',
  Other = '其他',
}

// 商品
export interface Product {
  type?: ProductType // 商品类型，预售 / 普通
  cartId?: string // 购物车商品id
  code: string // 商品编码
  thumbnail: string // 缩略图
  name: string // 商品名称
  desc: string // 商品描述
  spec: string // 规格
  price: number // 当前价格
  slashedPrice?: number // 划线价
  count: number // 商品在购物车中的数量
  shopCode: string // 商品所在门店编码
  remark: string // 商品在购物车中的备注
  remarks: string[] // 商品备注列表
  inventoryLabel?: string // 商品缺货提示
  onModifyCount?: (count: number) => any // 修改数量
  labels?: string[]
  deliveryType: ProductDeliveryType  // 配送时效
  isPreSale: boolean
}
