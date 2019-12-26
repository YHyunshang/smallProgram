/**
 * Created by 李华良 on 2019-12-26
 */
import * as React from 'react'
import {View} from "react-native";
import {ActivityStatus, BaseObj, Product, ProductType} from "@common/typings";
import LimitTimeBuy from './LimitTimeBuy'
import PreSale from './PreSale'
import Normal from './Normal'
import SimilarProducts from "../SimilarProducts";
import ActivityNavigator from "../ActivityNavigator";
import memoizeOne from "memoize-one";

const getTagName = memoizeOne((type: number, subType: number) => {
  if (type === 6) return 'N 元任选'
  return {
    21: '满减',
    22: '每满减',
    31: '满件折',
    32: '满件减',
  }[subType]
})

export interface ProductSectionProps {
  initialData: BaseObj
  product: BaseObj
  similarProducts: Product[]
  onStatusChange: (type: ProductType, v: ActivityStatus, ov: ActivityStatus) => void
}

const ProductSection: React.FunctionComponent<ProductSectionProps> = (
  { initialData, product, similarProducts, onStatusChange }
) => {
  const detailData = product.resChannelStoreProductVO || {}
  const productType = (detailData.productCode
    ? detailData.isAdvanceSale === 1
    : initialData.type === ProductType.PreSale)
    ? ProductType.PreSale
    : (detailData.productActivityLabel || {}).promotionType === 5
      ? ProductType.LimitTimeBuy
      : ProductType.Normal
  const orderPromotion = detailData.orderActivityLabel || {}

  const onActivityStatusChange = (v, ov) => onStatusChange(productType, v, ov)

  return (
    <>
      {/*商品信息*/}
      {productType === ProductType.LimitTimeBuy ? (
        <LimitTimeBuy
          productData={product}
          initialData={initialData}
          onStatusChange={onActivityStatusChange}
        />
      ) : productType === ProductType.PreSale ? (
        <View style={{ marginBottom: 15 }}>
          <PreSale
            productData={product}
            initialData={initialData}
            onActivityStatusChange={onActivityStatusChange}
          />
        </View>
      ) : (
        <Normal
          productData={product}
          initialData={initialData}
        />
      )}

      {/*促销活动链接*/}
      {[2, 3, 6].includes(orderPromotion.promotionType) && (
        <View style={[ { marginTop: 15 }, productType === ProductType.PreSale && { marginTop: 0, marginBottom: 15 }]}>
          <ActivityNavigator
            tag={getTagName(orderPromotion.promotionType, orderPromotion.ruleType)}
            code={orderPromotion.promotionCode}
            title={`指定商品${orderPromotion.labels.length > 0 ? orderPromotion.labels.join('，') : '促销'}`}
          />
        </View>
      )}

      {/*相似商品*/}
      {similarProducts.length > 0 && (productType !== ProductType.PreSale) && (
        <SimilarProducts products={similarProducts} />
      )}
    </>
  )
}

export default ProductSection
