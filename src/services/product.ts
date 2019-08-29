import { Http } from '@utils'

/**
 * 获取热销商品 tab 列表
 */
export function getTabList() {
  return Http.get('productCenter', '/app/product/queryHotSearchTags')
}

/**
 * 获取单个 tab 下的热销商品
 * @param tabId 热销商品 tab id
 * @param page 分页 - 第 n 页
 * @param size 分页 - 页大小
 */
export function getHotSaleProductsUnderCategory(
  tabId: string,
  storeCode: string,
  page = 1,
  size = 50
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
  console.log('---->>>', {
    storeCode,
    categoryCode,
    inventoryType,
    orderBy,
    orderType,
    page,
    size,
  })
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
