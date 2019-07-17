/*
 * @Description: 商品详情页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-17 10:06:10
 */

import React from 'react';
import {ScrollView,View,StyleSheet,Text,Image,TouchableOpacity} from 'react-native'
// import * as WeChat from 'react-native-wechat';
import Icon from '../../../iconSets';
//import IconDefault from 'react-native-vector-icons/FontAwesome';
import GoodsDetailEvaluate from '../../components/business/GoodsDetailEvaluate'
import GoodsDetailSwiper from '../../components/business/GoodsDetailSwiper'
import GoodsFootCart from '../../components/business/GoodsFootCart'
import ShareModal from '../../components/business/ShareModal'
import PosterModal from '../../components/business/PosterModal'
export default  class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowPoster:false,
        imgData: [
          { image: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_1.jpg'},
          { image: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_2.jpg' },
          { image: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_3.jpg' },
          { image: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_4.jpg'},
        ]
      }
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
  
  }
 /**
   * @description: 显示分享朋友圈弹层
   */
  handleShowModal() {
     this.shareModal.showShareModal() 
     //this.posterModal.showPosterModal() 
  }
  /**
   * @description: 显示生成海报弹层
   */
  handlePosterModal() {
    
    //this.setState({isShowPoster:true})
  }
  render() {
    const {imgData,isShowPoster}=this.state;
    //商品详情图文列表
    const goodsImgList = imgData.map(({image}, index) => (
      <Image style={styles.goodsDetailImage} source={{uri: image}} resizeMode="cover" key={index}/>
    ))
    //商家文描图文列表
    const shopImgList = imgData.map(({image}, index) => (
      <Image style={styles.goodsDetailImage} source={{uri: image}} resizeMode="cover" key={index}/>
    ))
    return (
    <View>
      <ScrollView>
        <GoodsDetailSwiper imgData={imgData}/>
        <View>
          <View style={styles.goodsWrapper}>
            <Text style={styles.goodsName}>十三香麻辣小龙虾(约750g/份)</Text>
            {/* <IconDefault name='rocket' size={60} color="#4F8EF7" /> */}
            <Icon onPress={() => { this.handleShowModal() }} name='icon-share' size={10} color="#FA6400" />

          </View>
          <View>
            <Text style={styles.goodsPrice}>¥ 45.60</Text>
          </View>
          <View style={styles.goodsMinBorder}></View>
        </View>
        <View style={styles.goodsQualityFlex}>
           <View style={styles.goodsQualityRowFlex}>
              <View style={styles.goodsQualityColumnFlex}>
                <Text style={styles.goodsQualityName}>产地</Text>
                <Text style={styles.goodsQualityValue}>福建莆田</Text>
              </View>
              <View style={styles.heightBorder}></View>
           </View>
           <View style={styles.goodsQualityRowFlex}>
               <View style={styles.goodsQualityColumnFlex}>
                  <Text style={styles.goodsQualityName}>规格</Text>
                  <Text style={styles.goodsQualityValue}>750g</Text>
                </View>
               <View style={styles.heightBorder}></View>
            </View>
           <View style={styles.goodsQualityRowFlex}>
              <View style={styles.goodsQualityColumnFlex}>
                <Text style={styles.goodsQualityName}>保质期</Text>
                <Text style={styles.goodsQualityValue}>21天</Text>
              </View>
           </View>
        </View>
        <View style={styles.goodsMaxBorder}></View>
        <GoodsDetailEvaluate />
        <View style={styles.goodsMaxBorder}></View>
        <View>
            <View style={styles.goodsDetail}>
              <Text style={styles.goodsDetailTitle}>商品详情</Text>
            </View>
            <View>
               {goodsImgList}
               {shopImgList}            
            </View>
            <GoodsFootCart/>
        </View>
       </ScrollView>  
       <ShareModal modalBoxHeight={240} onShare={this.handlePosterModal} ref={ref => this.shareModal= ref}/>
       <PosterModal modalBoxHeight={514} isShow={isShowPoster} ref={ref => this.posterModal= ref}/>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  goodsWrapper: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:14,
    paddingBottom:11,
    paddingHorizontal:15
  },
  goodsName:{
    fontSize:16,
    fontWeight: '600',
    color:'#333333'
  },
  goodsPrice:{
    fontSize:14,
    color:'#EE4239',
    fontWeight: '600',
    paddingLeft:15,
  },
  goodsMinBorder:{
    borderStyle:'solid',
    borderWidth:0.6,
    marginHorizontal:12,
    marginTop:11,
    borderColor:'#F0F0F0'
  },
  goodsQualityFlex:{
    height:67,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around'
  },
  goodsQualityRowFlex:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center'
  },
  goodsQualityColumnFlex:{
    paddingTop:10,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
  },
  heightBorder:{
    borderStyle:'solid',
    borderRightWidth:1,
    height:26,
    borderColor:'#F0F0F0'
  },
  goodsQualityName:{
    fontSize:12,
    color:'#A3A09B',
    fontWeight:'600'
  },
  goodsQualityValue:{
    fontSize:14,
    color:'#333333',
    fontWeight:'600',
    marginTop:6,
    marginBottom:13
  },
  goodsMaxBorder:{
    borderStyle:'solid',
    borderWidth:10,
    borderColor:'#F0F0F0'
  },
  goodsDetailTitle:{
    fontSize:15,
    color:'#333333',
    fontWeight:'900',
    marginTop:9,
    marginLeft:15
  },
  goodsDetailImage:{
    width:345,
    height:306,
    marginTop:10,
    marginHorizontal:15
  }
})
