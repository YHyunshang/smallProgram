import {Http} from '@utils'
import {Product} from "@common/typings";

/**
 * 获取热销商品 tab 列表
 */
export function getTabList() {
  return Http.get('productCenter', '/app/product/queryHotSearchTags')
}

/**
 * 获取单个 tab 下的热销商品
 * @param tabId 热销商品 tab id
 * @param storeCode 门店编码
 * @param page 分页 - 第 n 页
 * @param size 分页 - 页大小
 */
export function getHotSaleProductsUnderCategory(
  tabId: string,
  storeCode: string,
  page = 1,
  size = 20
) {
  return Http.get(
    'productCenter',
    '/app/product/queryProductSellwelByCategorie',
    { categorie: tabId, storeCode, page, size }
  )
}

/**
 * 获取门店商品分类
 * @param storeCode 门店编码
 * @param parentCode 父级分类编码，不传为顶级分类
 * @param storeTypeCode 门店业态类型
 */
export function getCategory(
  storeCode: string,
  storeTypeCode: string,
  parentCode?: string
) {
  return Http.post(
    'productCenter',
    '/app/product/queryChannelCategory',
    {},
    {
      storeCode,
      storeTypeCode,
      parentCode: parentCode || null,
      channelCode: '22',
    }
  )
}

/**
 * 查询商品
 * @param storeCode
 * @param categoryCode
 * @param inventoryType
 * @param orderBy
 * @param orderType
 * @param page
 * @param size
 */
export function queryProductList(
  storeCode,
  categoryCode,
  inventoryType,
  orderBy,
  orderType,
  page,
  size
) {
  return Http.post(
    'productCenter',
    '/app/product/queryStoreProductList',
    {},
    {
      storeCode,
      categoryCode,
      inventoryType,
      orderBy,
      orderType,
      page,
      size,
    }
  )
}

/**
 * 格式化商品中心返回的商品数据
 * @param data api 返回的商品数据
 */
export function formatProduct<T extends Product>(data: {[index:string]: any}) {
  const remarkOptions = (data.resProdcutNoteNewVO || { noteContentName: [] }).noteContentName
  const remarks = remarkOptions.sort((a, b) => a.isDefault ? -1 : 1).map(ele => ele.name)
  const salesRatio = (data.productActivityLabel || {}).salesRatio || ''

  const isLimitTimeBuy = (data.productActivityLabel || {}).promotionType === 5
  const promotionPrice = isLimitTimeBuy
    ? (data.productActivityLabel || {}).duscountPrice || data.promotionPrice
    : data.promotionPrice

  return {
    cartId: data.shopCartId,
    code: data.productCode,
    thumbnail: data.mainUrl,
    name: data.productName,
    desc: data.subTitle,
    productTags: [],
    priceTags: [],
    spec: data.productSpecific,
    price: promotionPrice,
    slashedPrice: data.price,
    count: data.productNum,
    remark: '',
    remarks,
    isLimitTimeBuy,
    inventoryPercentage: !/(\d+(\.\d+)?)%/.test(salesRatio)
      ? 100
      : Number(salesRatio.match(/(\d+(\.\d+)?)%/)[1]),
    inventoryLabel: data.zeroInventory ? '补货中' : '',
  }
}
