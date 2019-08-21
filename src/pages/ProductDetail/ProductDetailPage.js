/*
 * @Description: 商品详情页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-21 14:17:14
 */
import React from 'react'
import {ScrollView, View, Text, Image, TouchableOpacity, NativeModules} from 'react-native'
import Icon from '../../components/Icon'
import {transPenny} from '../../utils/FormatUtil'
import ShareModal from '../../components/business/ShareModal'
import PosterModal from '../../components/business/PosterModal'
import TabBar from '../../components/common/TabBar'
import Loading from '../../components/common/Loading'
import styles from './ProductDetailPage.styles'
import {getGoodsDetailData, getPosterImgUrl} from '../../services/goodsDetail'
import GoodsDetailSwiper from '../../components/business/GoodsDetailSwiper'
import SimilarGoods from '../../components/business/SimilarGoods'
import Tag from '../../components/business/Tag'
const goodsDetailManager = NativeModules.GoodsDetailsNativeManager// 原生商品详情模块
const rnAppModule = NativeModules.RnAppModule// 原生商品详情模块
export default class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFirst: true, // 是否是第一次请求生成海报接口
      goodsDetail: {}, // 商品详情
      evaluation: {}, // 商品评价信息
      goodsInfo: {}, // 商品基本信息
      imgUrl: '', // 生成海报的图片地址
      productParams: {}, // 传给生成海报接口的参数
      productDetailImagesResponseVOList: [],
      currentIndex: 0, // 当前索引
      tablist: [
        {id: 1, name: '商品'},
        {id: 2, name: '详情'}
      ],
      imgData: [{
        url: 'https://static-yh.yonghui.cn/app/static/images/product-default.png'
      }],
      productImgList: [], // 商品详情图文
      shopUrl: []// 商家文描
    }
    this.shareIconHeight = 0// 分享按钮到高度
    this.goodsSwiperHeight = 0// 图文滚动组件到高度
    this.topTabY = 0// 页面滚动到距离
  }

  componentDidMount() {
    let productInfo = goodsDetailManager.productInfo
    productInfo = productInfo ? JSON.parse(productInfo) : {}
    this.getProductInfo(productInfo.productCode, productInfo.storeCode)
  }

  componentWillUnmount() {

  }
  /**
   * @description: 获取原生返回的商品详情数据
   */
  getProductInfo = (productCode, storeCode) => {
    getGoodsDetailData(storeCode, productCode)
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          let object = {}
          let shopUrl = data.resChannelStoreProductVO.shopUrl ? JSON.parse(data.resChannelStoreProductVO.shopUrl) : []
          object.productDesc = data.resChannelStoreProductVO.productName
          object.productPrice = data.resChannelStoreProductVO.promotionPrice ? data.resChannelStoreProductVO.promotionPrice : data.resChannelStoreProductVO.price
          object.productUrl = data.productSliderImagesResponseVOList ? data.productSliderImagesResponseVOList[0].url : ''
          object.productCode = data.resChannelStoreProductVO.productCode
          this.setState(
            {
              goodsDetail: data,
              goodsInfo: data.resChannelStoreProductVO,
              evaluation: data.resProductEvaluationVO,
              imgData: data.productSliderImagesResponseVOList,
              productImgList: data.productDetailImagesResponseVOList,
              shopUrl,
              productParams: object
            }
          )
        } else {
          rnAppModule.showToast(message, '0')
        }
      }).catch((error) => {
        rnAppModule.showToast(error, '0')
      })
  }
  /**
   * @description: 显示分享朋友圈弹层
   */
  handleShowModal() {
    goodsDetailManager.hideBottomViews()// 隐藏底部购物车模块
    this.shareModal.showShareModal()
  }
  /**
   * @description: 显示生成海报弹层
   */
  handlePosterModal=(productParams) => {
    goodsDetailManager.hideBottomViews()// 隐藏底部购物车模块
    this.posterModal.showPosterModal()
    this.sharePoster(productParams)
  }
  /**
  * @description:生成海报方法
  */
  sharePoster(productParams) {
    let params = {
      appId: 'wx6e85fc07ec7a02f3',
      productDesc: productParams.productDesc,
      productCode: productParams.productCode,
      productPrice: `¥${transPenny(productParams.productPrice)}`,
      productUrl: productParams.productUrl
    }
    if (this.state.isFirst) {
      this.loadingModal.showLoading()
      getPosterImgUrl(params)
        .then(({result: data, message, code}) => {
          this.loadingModal.dismissLoading()
          if (code === 200000 && data) {
            this.setState({imgUrl: data.imgUrl || '', isFirst: false})
          } else {
            rnAppModule.showToast(JSON.stringify(message), '0')
          }
        }
        ).catch((error) => {
          this.loadingModal.dismissLoading()
          rnAppModule.showToast(JSON.stringify(error), '0')
        })
    }
  }
  /**
   * @description: 根据点击tab选项跳转至指定区域
   */
  clickScroll=(index) => {
    if (index === 0) {
      // 其中this.layouot.y就是距离现在的高度位置
      this.myScrollView.scrollTo({x: 0, y: this.goodsLayoutY, animated: true})
    } else {
      // 其中this.layouot.y就是距离现在的高度位置
      this.myScrollView.scrollTo({x: 0, y: this.detailLayoutY, animated: true})
    }
  }
  /**
   * @description: 获取分享按钮内容区域到高度
   */
  shareIconLayout(event) {
    this.shareIconHeight = event.nativeEvent.layout.height
  }
  /**
   * @description: 获取轮播组件内容区域到高度
   */
  goodsSwiperLayout=(event) => {
    this.goodsSwiperHeight = event.nativeEvent.layout.height
  }
  /**
   * @description: 页面滚动结束时回调函数
   */
  onMomentumScrollEnd(event) {
    // 求出当前的页码
    // rnAppModule.showToast(event.nativeEvent.contentOffset.y, '0')
    // rnAppModule.showToast(this.detailLayoutY, '0')//1329
    // rnAppModule.showToast(this.goodsLayoutY, '0')
    // let currentPage = Math.floor(event.nativeEvent.contentOffset.y / this.detailLayoutY)
    // rnAppModule.showToast(currentPage, '0')
    // currentPage = currentPage == 0 ? 0 : 1
    // let tablist = this.state.tablist
    // tablist.map(index => {
    //   let topTabY = event.nativeEvent.contentOffset.y
    //   if (topTabY && topTabY >= this.goodsLayoutY && topTabY < this.detailLayoutY) {
    //     this.tabs.setIndex(index)
    //   } else if (topTabY && topTabY >= this.detailLayoutY) {
    //     this.tabs.setIndex(index)
    //   }
    // })
    let topTabY = event.nativeEvent.contentOffset.y
    if (topTabY && topTabY >= this.goodsLayoutY && topTabY < this.detailLayoutY) {
      this.tabs.resetIndex(0)
    } else if (topTabY && topTabY >= this.detailLayoutY) {
      this.tabs.resetIndex(1)
    }
  }
  /**
   * @description: 跳转至原生的评价列表页面
   */
  jumpToNativeEvaluteList=() => {
    goodsDetailManager.pushToEvaluationList()
  }
  render() {
    const {imgData, goodsInfo, productImgList, shopUrl, imgUrl, productParams} = this.state
    // let favorableRate = goodsInfo.favorableRate ? goodsInfo.favorableRate * 100 : 0
    // favorableRate = favorableRate && parseFloat(favorableRate.toFixed(2))
    // 商品详情图文列表
    const goodsImgList = productImgList ? productImgList.map(({url}, index) => (
      <Image style={styles.goodsDetailImage} source={{uri: url}} resizeMode="contain" key={index}/>
    )) : <Image style={styles.goodsDetailImage} source={{uri: 'https://static-yh.yonghui.cn/app/static/images/product-default.png'}} resizeMode="contain"/>
    // 商家文描图文列表
    const shopImgList = shopUrl ? shopUrl.map((item, index) => (
      <Image style={styles.goodsDetailImage} source={{uri: item}} resizeMode="cover" key={index}/>
    )) : []
    return (
      <View style={styles.container}>
        {
          (
            <View style={styles.topTab}>
              <View></View>
              <TabBar ref={e => this.tabs = e}
                index={this.state.currentIndex}
                data={this.state.tablist}
                clickScroll={this.clickScroll}
                onChange={index => {}} />
              <TouchableOpacity onPress={() => {
                this.handleShowModal()
              }} >
                <Icon style={styles.rightShareIcon} name='share' size={17} color="#4D4D4D" />
              </TouchableOpacity>
            </View>
          )
        }
        <ScrollView
          ref={(view) => {
            this.myScrollView = view
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle = {200}
          pagingEnabled={true}
          // 当一帧滚动完毕时调用
          onMomentumScrollEnd={(event) => this.onMomentumScrollEnd(event)}
        >
          <View onLayout={event => {
            this.goodsLayoutY = event.nativeEvent.layout.y
          }}>
            <View onLayout={this.goodsSwiperLayout.bind(this)}>
              {
                imgData ? <GoodsDetailSwiper imgData={imgData}/>
                  :
                  <Image style={styles.defaultImage} source={{uri: 'https://static-yh.yonghui.cn/app/static/images/product-default.png'}} resizeMode="contain"/>
              }
            </View>
          </View>
          <View>
            <View style={styles.goodsPromotionPriceRowFlex}>
              <Text style={styles.goodsPriceSymbol}>¥</Text>
              <Text style={styles.goodsPrice}>{transPenny(goodsInfo.promotionPrice ? goodsInfo.promotionPrice : goodsInfo.price)}</Text>
              {
                goodsInfo.promotionPrice ? <Text style={styles.throughLine} >¥{transPenny(goodsInfo.price)}</Text>
                  : <Text></Text>
              }
            </View>
            <Tag textValue='特价' marginLeft={15}></Tag>
            <View style={styles.goodsWrapper}>
              <Text style={styles.goodsName}>{goodsInfo.productName}</Text>
              <Text style={styles.goodsTips}>紧致口感 回味无穷 野生大小不定</Text>
            </View>
            <View style={styles.goodsQualityFlex}>
              <Text style={styles.goodsQualityValue}>{goodsInfo.productSpecific}</Text>
              <Text style={styles.goodsQualityValue}>{goodsInfo.shelfLife}</Text>
              <Text style={styles.goodsQualityValue}>{goodsInfo.originPlace}</Text>
            </View>
            {/* <View style={styles.goodsMinBorder}></View> */}
          </View>
          {/* <View style={styles.goodsQualityFlex}>
            <View style={styles.goodsQualityRowFlex}>
              <View style={styles.goodsQualityColumnFlex}>
                <Text style={styles.goodsQualityName}>产地</Text>
                <Text style={styles.goodsQualityValue}>{goodsInfo.originPlace}</Text>
              </View>
              <View style={styles.heightBorder}></View>
            </View>
            <View style={styles.goodsQualityRowFlex}>
              <View style={styles.goodsQualityColumnFlex}>
                <Text style={styles.goodsQualityName}>规格</Text>
                <Text style={styles.goodsQualityValue}>{goodsInfo.productSpecific}</Text>
              </View>
              <View style={styles.heightBorder}></View>
            </View>
            <View style={styles.goodsQualityRowFlex}>
              <View style={styles.goodsQualityColumnFlex}>
                <Text style={styles.goodsQualityName}>保质期</Text>
                <Text style={styles.goodsQualityValue}>{goodsInfo.shelfLife}</Text>
              </View>
            </View>
          </View>
          <View style={styles.goodsMaxBorder}></View> */}
          {/* <View onLayout={event => {
            this.evaluteLayoutY = event.nativeEvent.layout.y
          }}>
            {
              evaluation ? <GoodsDetailEvaluate jumpToEvaluteList={this.jumpToNativeEvaluteList} evaluation={evaluation} favorableRate={favorableRate}/>
                : <Text></Text>
            }

          </View> */}
          {/* <View style={styles.goodsMaxBorder}></View> */}
          {
            imgData ? <SimilarGoods imgData={imgData}></SimilarGoods>
              : <Text></Text>
          }
          <View onLayout={event => {
            this.detailLayoutY = event.nativeEvent.layout.y
          }}>
            <View style={styles.goodsDetail}>
              <Text style={styles.goodsDetailTitle}>商品详情</Text>
            </View>
            <View style={styles.imagesContent}>
              {goodsImgList}
              {shopImgList}
            </View>
          </View>
        </ScrollView>
        <ShareModal modalBoxHeight={240} productParams={productParams} onShare={this.handlePosterModal} ref={ref => this.shareModal = ref}/>
        <PosterModal modalBoxHeight={534} imgUrl={imgUrl} ref={ref => this.posterModal = ref}/>
        {
          <Loading
            title={'海报生成中'}
            ref={ref => this.loadingModal = ref}
          />
        }
      </View>
    )
  }
}
