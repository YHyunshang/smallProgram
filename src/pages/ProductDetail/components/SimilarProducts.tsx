/**
 * Created by 李华良 on 2019-12-16
 */
import * as React from 'react'
import {FlatList, Text, View} from "react-native";
import {BaseObj, Product} from "@common/typings";
import styles from './SimilarProducts.styles'
import {ProductGridItem, ThemeChoices} from "@components/business/Content/ProductGridItem";
import {Native} from "@utils";
import {track} from "@utils/tracking";
import {RouteContext} from "@utils/contextes";
import {transPenny} from "@utils/FormatUtil";

export interface SimilarProductsProps {
  products: Product[]
}

const ProductItem: React.FunctionComponent<{ _data_: BaseObj } & Product> = ({ _data_, ...passedProps }) => {
  const [count, setCount] = React.useState(passedProps.count)

  const childrenRender = ctxVal => {
    const onModifyCount = () =>
      Native.addToCartForSimilarProduct({ ..._data_, productNum: count  }, true)
        .then(count => {
          setCount(count)

          track('addToShoppingcart', {
            $screen_name: ctxVal.name,
            page_type: ctxVal.path,
            product_id: passedProps.code,
            product_name: passedProps.name,
            original_price: transPenny(passedProps.slashedPrice || passedProps.price),
            present_price: transPenny(passedProps.price),
            product_spec: passedProps.spec,
            tab_name: ctxVal.extraData ? ctxVal.extraData.currentTab || '' : ''
          })
        })

    return <ProductGridItem {...passedProps} count={count} theme={ThemeChoices.TWO_PER_ROW} onModifyCount={onModifyCount} />
  }

  return (
    <RouteContext.Consumer>
      {childrenRender}
    </RouteContext.Consumer>
  )
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
