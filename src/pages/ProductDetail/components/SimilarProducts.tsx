/**
 * Created by 李华良 on 2019-12-16
 */
import * as React from 'react'
import {FlatList, Text, View} from "react-native";
import {BaseObj, Product} from "@common/typings";
import styles from './SimilarProducts.styles'
import {ProductGridItem, ThemeChoices} from "@components/business/Content/ProductGridItem";
import {Native} from "@utils";

export interface SimilarProductsProps {
  products: Product[]
}

const ProductItem: React.FunctionComponent<{ _data_: BaseObj } & Product> = ({ _data_, ...passedProps }) => {
  const onModifyCount = () => Native.addToCartForSimilarProduct(_data_, true)

  return <ProductGridItem {...passedProps} theme={ThemeChoices.TWO_PER_ROW} onModifyCount={onModifyCount} />
}

const renderItem = ({ item, index }) => (
  <View style={[ styles.productWrapper, index % 2 === 0 ? styles.productWrapperEvenCol : styles.productWrapperOddCol ]}>
    <View style={styles.productBox}>
      <ProductItem {...item} />
    </View>
  </View>
)

const SimilarProducts: React.FunctionComponent<SimilarProductsProps> = (
  { products }
) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>相似商品</Text>
      </View>
      <FlatList
        style={styles.content}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => `${item.code}`}
        numColumns={2}
      />
    </View>
  )
}

export default React.memo(SimilarProducts)
