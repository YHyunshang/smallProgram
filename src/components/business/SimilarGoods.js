/*
 * @Description: 相似商品列表组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-16 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-21 19:32:03
 */

import React from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import FitImage from 'react-native-fit-image'
import Icon from '../Icon'
import Tag from './Tag'
import styles from './SimilarGoods.styles'
import LinearGradient from 'react-native-linear-gradient'
// 一些常量设置
const cols = 2 // 列数
export default class SimilarGoods extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgData: [
        {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850063216&di=0f4f9bbaaee6bafe24fab3e5f472c481&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201512%2F12%2F20151212120309_BduTC.jpeg'},
        {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850063214&di=f73de557becc9667bb105fdfecd39426&imgtype=0&src=http%3A%2F%2Fimgq.duitang.com%2Fuploads%2Fitem%2F201503%2F22%2F20150322171820_UtwMk.thumb.700_0.jpeg'},
        {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850063210&di=b936ead7972601ea0c12e8648a8f1df0&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140403%2F0020033029624335_b.jpg'},
        {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850155795&di=72f9878782ad4b80ea320111effe0b71&imgtype=0&src=http%3A%2F%2Fpic27.photophoto.cn%2F20130420%2F0005018421916914_b.jpg'},
        {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537850155794&di=4efaecca3f367346ff49c42f8f89d9f2&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201206%2F26%2F20120626190359_MjB3s.thumb.700_0.jpeg'}
      ]
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  /**
   * @description: 调用原生的添加购物车的方法
   */
  handleAddCart() {
    // 调用原生方法
  }
  renderData=({item, index}) => (
    <View style={styles.similarGoodsList}>
      <FitImage style={styles.similarGoodsImg} source={{uri: item.url}} indicator={false} />
      {/* <Image style={styles.SimilarGoodsImg} source={{uri: url}} resizeMode="cover"/> */}
      <Tag textValue='特价' marginLeft={10}></Tag>
      <Text style={styles.goodsDesc}>套袋红富士套袋红富</Text>
      <Text style={styles.throughLinePrice}>¥20.34</Text>
      <View style={styles.goodsPriceFlex}>
        <View style={styles.goodsPriceWrap}>
          <Text style={styles.goodsPriceSymbol}>¥</Text>
          <Text style={styles.goodsPrice}>16.99</Text>
        </View>
        <LinearGradient colors={['#FF3914', '#FF6042']} style={styles.cartIcon}>
          <TouchableOpacity onPress={() => {
            this.handleAddCart()
          }} >
            <Icon style={styles.rightShareIcon} name='cart' size={13} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )

  render() {
    let {imgData} = this.props
    // const similarGoodsList = imgData.map(({url}, index) => (
    //   <View style={styles.similarGoodsList}>
    //     <FitImage style={styles.SimilarGoodsImg} source={{uri: url}} indicator={false} />
    //     {/* <Image style={styles.SimilarGoodsImg} source={{uri: url}} resizeMode="cover"/> */}
    //     <Tag textValue='特价' marginLeft={10}></Tag>
    //     <Text style={styles.goodsDesc}>套袋红富士套袋红富</Text>
    //     <Text style={styles.throughLinePrice}>¥20.34</Text>
    //     <View style={styles.goodsPriceFlex}>
    //       <View style={styles.goodsPriceWrap}>
    //         <Text style={styles.goodsPriceSymbol}>¥</Text>
    //         <Text style={styles.goodsPrice}>16.99</Text>
    //       </View>
    //       <LinearGradient colors={['#FF3914', '#FF6042']} style={styles.cartIcon}>
    //         <TouchableOpacity onPress={() => {
    //           this.handleAddCart()
    //         }} >
    //           <Icon style={styles.rightShareIcon} name='cart' size={13} color="#FFFFFF" />
    //         </TouchableOpacity>
    //       </LinearGradient>
    //     </View>
    //   </View>
    // ))
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperBg}>
          <Text style={styles.similarGoodsTitle}>相似商品</Text>
        </View>
        <FlatList
          data={this.state.imgData}
          numColumns ={2}
          numColumns={cols}
          horizontal={false}
          renderItem={this.renderData}>
        </FlatList>
      </View>
    )
  }
}
