/*
 * @Description: 相似商品列表组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-06 20:16:30
 */

import React from 'react'
import {Img} from '@utils'
import {Text, View, FlatList, TouchableOpacity} from 'react-native'
import DetailCartAnimated from '../../business/Animated/DetailCartAnimated'
// import Icon from '../Icon'
import Tag from './Tag'
import {transPenny} from '../../../utils/FormatUtil'
import styles from './SimilarGoods.styles'
import ProductImage from '../ProductImage'
// const productActivityLabel = {activityBeginTime: '2019-09-29 00:00:00', activityEndTime: '2019-09-29 22:20:40', activityName: '限时抢购活动', discountPrice: 20, labels: ['特价', '满减', '限时抢购'], promotionCode: 'K001', promotionType: 0, promotionTypeName: '限时抢购', ruleType: 0, salesRatio: '45%'}
// 商品购物车图标
export default class SimilarGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      similarProduct: []
    }
  }
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
          {
            item.productActivityLabel && item.productActivityLabel.promotionType === 13 && (
              <View style={styles.newPerson}>
                <Text style={styles.newPersonText}>{item.productActivityLabel.promotionTypeName}</Text>
              </View>
            )
          }
          <ProductImage source={{ uri: Img.loadRatioImage(item.mainUrl.url, 200) }} size={150} />
        </View>
        <View style={styles.goodsTags}>
          {
          // 促销类型 1 直降促销, 2 满减促销, 3 满件减满减折促销 ,4 第N件N折/N元,5 限时抢购
          // 满减规则 5>1>4>2>3
            item.productActivityLabel && item.productActivityLabel.promotionType === 5 && item.productActivityLabel.labels ?
              <Tag textValue={item.productActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF'></Tag>
              : item.productActivityLabel && item.productActivityLabel.promotionType === 1 && item.productActivityLabel.labels ?
                <Tag textValue={item.productActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF'></Tag>
                : item.productActivityLabel && item.productActivityLabel.promotionType === 4 && item.productActivityLabel.labels ?
                  <Tag textValue={item.productActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF'></Tag>
                  : item.orderActivityLabel && item.orderActivityLabel.labels && (
                    <Tag textValue={item.orderActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF'></Tag>
                  )
          }
        </View>
        <Text numberOfLines={1} style={styles.goodsDesc}>
          {item.productName}
        </Text>
        <Text style={styles.throughLinePrice}>
          {item.promotionPrice ? `¥${transPenny(item.price)}` : ''}
        </Text>
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
          horizontal={false}
          renderItem={this.renderData}
          keyExtractor={item => item.productCode}
        />
      </View>
    )
  }
}
