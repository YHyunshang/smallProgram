/*
 * @Description: 相似商品列表组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-26 11:32:12
 */

import React from 'react'
import {
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity
} from 'react-native'
import FitImage from 'react-native-fit-image'
import LinearGradient from 'react-native-linear-gradient'
// import Icon from '../Icon'
// import Tag from './Tag'
import {transPenny} from '../../utils/FormatUtil'
import styles from './SimilarGoods.styles'
// import LinearGradient from 'react-native-linear-gradient'
// 一些常量设置
const cols = 2 // 列数
// 商品购物车图标
const cartImg = Platform.OS === 'ios' ? require('@img/cart.png') : {uri: 'asset:/src_assets_imgs_cart.png'}
export default class SimilarGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  /**
   * @description: 调用原生的添加购物车的方法
   */
  handleAddCart(item) {
    const {addCart} = this.props
    if (addCart) {
      addCart(item)
    }
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
  renderData=({item}) => (
    <View style={styles.similarGoodsList}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => {
          this.handleJumpGoodsDetail(item)
        }}
      >
        <FitImage style={styles.similarGoodsImg} source={{uri: item.mainUrl.url || this.props.defaultImg}} indicator={false} />
        {/* <Tag textValue='特价' marginLeft={10}></Tag> */}
        <Text numberOfLines={1} style={styles.goodsDesc}>{item.productName}</Text>
        {
          item.promotionPrice
            ? <Text style={styles.throughLinePrice} >¥{transPenny(item.price)}</Text>
            : null
        }
        <View style={styles.goodsPriceFlex}>
          <View style={styles.goodsPriceWrap}>
            <Text style={styles.goodsPriceSymbol}>¥</Text>
            <Text style={styles.goodsPrice}>{transPenny(item.promotionPrice ? item.promotionPrice : item.price)}</Text>
          </View>
          <LinearGradient style={styles.container} colors={['#FF3914', '#FF6042']}>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {
                this.handleAddCart(item)
              }} >
              <FitImage style={styles.goodsCartImg} source={cartImg}></FitImage>
              {/* <Icon style={styles.rightShareIcon} name='cart' size={13} color="#FFFFFF" /> */}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  )

  render() {
    let {similarProduct} = this.props
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperBg}>
          <Text style={styles.similarGoodsTitle}>相似商品</Text>
        </View>
        <FlatList
          data={similarProduct}
          numColumns ={2}
          numColumns={cols}
          horizontal={false}
          renderItem={this.renderData}>
        </FlatList>
      </View>
    )
  }
}
