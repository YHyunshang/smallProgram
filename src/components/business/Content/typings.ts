export interface Product {
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
  inventoryLabel: string // 商品缺货提示
  shopCode?: string // 商品所在门店编码
  remark: string // 商品在购物车中的备注 / 默认备注
  remarks: string[] // 商品备注列表
  onModifyCount?: (count: number) => any // 修改数量
}
