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
        <PreSale
          productData={product}
          initialData={initialData}
          onActivityStatusChange={onActivityStatusChange}
        />
      ) : (
        <Normal
          productData={product}
          initialData={initialData}
        />
      )}

      {/*满减活动*/}
      {orderPromotion.promotionType === 2 && (
        <View style={{ marginTop: 15 }}>
          <ActivityNavigator
            tag={orderPromotion.ruleType === 22 ? '每满减' : '满减'}
            code={orderPromotion.promotionCode}
            title={`指定商品${orderPromotion.labels.length > 0 ? orderPromotion.labels.join('，') : '满减'}`}
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
