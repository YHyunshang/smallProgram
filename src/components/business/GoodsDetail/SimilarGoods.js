/*
 * @Description: 相似商品列表组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-09-05 19:44:45
 */

import React from 'react'
import {Text, View, FlatList, TouchableOpacity} from 'react-native'
import PreloadingImage from '../../common/PreloadingImage'
import DetailCartAnimated from '../../business/Animated/DetailCartAnimated'
// import Icon from '../Icon'
// import Tag from './Tag'
import {transPenny} from '../../../utils/FormatUtil'
import styles from './SimilarGoods.styles'
const cols = 2 // 列数
// 商品购物车图标
export default class SimilarGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      similarProduct: []
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {
    this.setState({
      similarProduct: nextProps.similarProduct
    })
  }
  /**
   * @description: 刷新相似商品列表
   */
  refreshGoodsList=(productCode, productNumber) => {
    let newArray = new Array()
    this.state.similarProduct.map((item) => {
      if (item.productCode == productCode) {
        item.productNum = productNumber
      }
      newArray.push(item)
    })
    this.setState({
      similarProduct: newArray
    })
  }
  /**
   * @description: 点击相似商品列表跳转到商品详情页面
   */
  handleJumpGoodsDetail(item) {
    const {jumpGoodsDetail} = this.props
    if (jumpGoodsDetail) {
      jumpGoodsDetail(item)
    }
  }
  renderData = ({item}) => (
    <View style={styles.similarGoodsList}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => {
          this.handleJumpGoodsDetail(item)
        }}
      >
        <View style={styles.similarGoodsWrapper}>
          <PreloadingImage
            style={styles.similarGoodsImg}
            uri={item.mainUrl.url}
          ></PreloadingImage>
        </View>
        {/* <Tag textValue='特价' marginLeft={10}></Tag> */}
        <Text numberOfLines={1} style={styles.goodsDesc}>
          {item.productName}
        </Text>
        {item.promotionPrice ? (
          <Text style={styles.throughLinePrice}>¥{transPenny(item.price)}</Text>
        ) : null}
      </TouchableOpacity>
      <View style={styles.goodsPriceFlex}>
        <View style={styles.goodsPriceWrap}>
          <Text style={styles.goodsPriceSymbol}>¥</Text>
          <Text style={styles.goodsPrice}>
            {transPenny(item.promotionPrice ? item.promotionPrice : item.price)}
          </Text>
        </View>
        <View style={styles.container}>
          <DetailCartAnimated goodsItem={item} refreshGoodsList={this.refreshGoodsList}></DetailCartAnimated>
        </View>
      </View>
    </View>
  )

  render() {
    let {similarProduct} = this.state
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperBg}>
          <Text style={styles.similarGoodsTitle}>相似商品</Text>
        </View>
        <FlatList
          data={similarProduct}
          numColumns={2}
          numColumns={cols}
          horizontal={false}
          renderItem={this.renderData}
        ></FlatList>
      </View>
    )
  }
}
