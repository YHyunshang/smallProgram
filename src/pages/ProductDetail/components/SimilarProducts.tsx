/**
 * Created by 李华良 on 2019-12-16
 */
import * as React from 'react'
import {View, Text, FlatList} from "react-native";
import {Product} from "@common/typings";
import styles from './SimilarProducts.styles'
import ProductGridItem from "@components/business/Content/ProductGridItem";

export interface SimilarProductsProps {
  products: Product[]
}

const renderItem = ({ item, index }) => (
  <View style={[ styles.productWrapper, index % 2 === 0 ? styles.productWrapperEvenCol : styles.productWrapperOddCol ]}>
    <View style={styles.productBox}>
      <ProductGridItem {...item} theme="2x" />
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
