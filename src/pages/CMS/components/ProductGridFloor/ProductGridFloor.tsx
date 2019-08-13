/**
 * Created by 李华良 on 2019-07-17
 */
import * as React from 'react'
import { View } from 'react-native'
import ProductItem from './ProductItem'
import getStyles from './ProductGridFloor.styles'

interface Props {
  data: any[]
  columnNum: number
}

function ProductGridFloor ({ data, columnNum }: Props) {
  const formattedData = data.reduce(
    (acc, cur, idx) => (idx % columnNum === 0)
      ? [ ...acc, [cur] ]
      : [ ...acc.slice(0, -1), [ ...acc.slice(-1)[0], cur ] ],
    []
  )

  const styles = getStyles(columnNum)

  return (
    <View style={styles.container}>
      {formattedData.map((ele, idx) => (
        <View style={styles.row} key={idx}>
          {ele.map(itm => (
            <View style={styles.col} key={itm.id}>
              <View style={styles.productBox}>
                <ProductItem data={itm} />
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

export default ProductGridFloor