/*
 * @Description: 商品详情页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-31 17:30:08
 */
import React from 'react'
import {ScrollView, View, Text, Image, TouchableOpacity, NativeModules} from 'react-native'
import Icon from '../../components/Icon'
import {transPenny} from '../../utils/FormatUtil'
import ShareModal from '../../components/business/ShareModal'
import PosterModal from '../../components/business/PosterModal'
import TabBar from '../../components/common/TabBar'
import Loading from '../../components/common/Loading'
import PreloadingImage from '../../components/common/PreloadingImage'
import styles from './ProductDetailPage.styles'
import {Native, Img} from '@utils'
import {getGoodsDetailData, getPosterImgUrl, getSimilarProduct} from '../../services/goodsDetail'
import GoodsDetailSwiper from '../../components/business/GoodsDetail/GoodsDetailSwiper'
import SimilarGoods from '../../components/business/GoodsDetail/SimilarGoods'
// 商品产地图标 // 商品规格图标 //商品条件图标
import {productPlace, productSpecific} from '@const/resources'
import Tag from '../../components/business/GoodsDetail/Tag'
import BuyLimit from '../../components/business/GoodsDetail/BuyLimit'
const rnAppModule = NativeModules.RnAppModule// 原生模块
const goodsDetailManager = NativeModules.GoodsDetailsNativeManager// 原生商品详情模块
export default class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartNumber: 0,
      isFirst: true, // 是否是第一次请求生成海报接口
      goodsDetail: {}, // 商品详情
      evaluation: {}, // 商品评价信息
      goodsInfo: {}, // 商品基本信息
      imgUrl: '', // 生成海报的图片地址
      productParams: {}, // 传给生成海报接口的参数
      productDetailImagesResponseVOList: [],
      currentIndex: 0, // 当前索引
      storeCode: '', // 门店code
      tablist: [
        {id: 1, name: '商品'},
        {id: 2, name: '详情'}
      ],
      imgData: [{
        url: 'https://static-yh.yonghui.cn/app/static/images/product-default.png'// 默认占位图
      }],
      productImgList: [], // 商品详情图文
      shopUrl: [], // 商家文描
      similarProduct: [],
      productActivityLabel: {}, //  1 直降促销,4 第N件N折/N元,5 限时抢 --活动标签
      orderActivityLabel: {}// 2 满减促销, 3 满件减满减折促销 --活动标签
    }
    this.shareIconHeight = 0// 分享按钮到高度
    this.goodsSwiperHeight = 0// 图文滚动组件到高度
    this.topTabY = 0// 页面滚动到距离
  }

  componentDidMount() {
    let productInfo = goodsDetailManager.productInfo
    productInfo = productInfo ? JSON.parse(productInfo) : {}
    this.setState({storeCode: productInfo.storeCode})
    this.getProductInfo(productInfo.productCode, productInfo.storeCode)
    this.getSimilarProductList(productInfo.productCode, productInfo.storeCode)
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
          object.storeCode = storeCode
          this.setState(
            {
              goodsDetail: data,
              goodsInfo: data.resChannelStoreProductVO,
              evaluation: data.resProductEvaluationVO,
              imgData: data.productSliderImagesResponseVOList,
              productImgList: data.productDetailImagesResponseVOList,
              shopUrl,
              productParams: object,
              orderActivityLabel: data.resChannelStoreProductVO ? data.resChannelStoreProductVO.orderActivityLabel : {},
              // orderActivityLabel: {activityBeginTime: '2019-10-09 16:23:00', activityEndTime: '2019-10-11 17:20:00', activityName: '第N件N折/N元', discountPrice: 899, labels: ['满100减10元'], promotionCode: 'K001', promotionType: 2, promotionTypeName: '阶梯满减', ruleType: 0, salesRatio: '100%'},
              // productActivityLabel: {activityBeginTime: '2019-10-09 16:23:00', activityEndTime: '2019-10-11 17:20:00', activityName: '第N件N折/N元', discountPrice: 899, labels: ['第N件N折/N元'], promotionCode: 'K001', promotionType: 4, promotionTypeName: '第N件N折/N元', ruleType: 0, salesRatio: '100%'}
              productActivityLabel: data.resChannelStoreProductVO ? data.resChannelStoreProductVO.productActivityLabel : {}
            }
          )
        } else {
          rnAppModule.showToast(message, '0')
        }
      }).catch(({message}) => {
        rnAppModule.showToast(message, '0')
      })
  }
  /**
   * @description: 根据商品编码、门店编码获取相似商品列表
   */
  getSimilarProductList = (productCode, storeCode) => {
    getSimilarProduct(productCode, storeCode)
      .then(({result: data, message, code}) => {
        if (code === 200000 && data) {
          this.setState(
            {
              similarProduct: data
            }
          )
        } else {
          rnAppModule.showToast(message, '0')
        }
      }).catch(({message}) => {
        rnAppModule.showToast(message, '0')
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
  handleMaota() {
    Native.navigateTo({
      type: Native.NavPageType.RN,
      uri: 'RNPreviewPurchase',
      params: {}
    })
  }
  /**
   * @description: 点击相似商品列表跳转至商品详情
   */
  jumpGoodsDetail=(item) => {
    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'A003,A003',
      params: {productCode: item.productCode}
    })
  }
  /**
  * @description:生成海报方法
  */
  sharePoster(productParams) {
    let params = {
      appId: 'wx6e85fc07ec7a02f3',
      productName: productParams.productDesc,
      pageUrl: 'pages/product-detail/product-detail',
      productPrice: `¥${transPenny(productParams.productPrice)}`,
      productImgUrl: productParams.productUrl,
      sceneValue: `${productParams.productCode},${this.state.storeCode}`,
      width: 246

    }
    if (this.state.isFirst) {
      this.loadingModal.showLoading()
      getPosterImgUrl(params)
        .then(({result: data, message, code}) => {
          this.loadingModal.dismissLoading()
          if (code === 200000 && data) {
            this.setState({imgUrl: data, isFirst: false})
          } else {
            rnAppModule.showToast(message, '0')
          }
        }
        ).catch(({message}) => {
          this.loadingModal.dismissLoading()
          rnAppModule.showToast(message, '0')
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
    let topTabY = event.nativeEvent.contentOffset.y
    if (topTabY === 0) {
      this.tabs.resetIndex(0)
    } else if (topTabY && topTabY >= this.goodsLayoutY && topTabY < this.detailLayoutY) {
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
    let tags, productTags, orderTags// 促销类型 1 直降促销, 2 满减促销, 3 满件减满减折促销 ,4 第N件N折/N元,5 限时抢购
    const {imgData, goodsInfo, productImgList, shopUrl, imgUrl, productParams, similarProduct, productActivityLabel, orderActivityLabel} = this.state
    // let favorableRate = goodsInfo.favorableRate ? goodsInfo.favorableRate * 100 : 0
    // favorableRate = favorableRate && parseFloat(favorableRate.toFixed(2))
    // 商品详情图文列表
    const goodsImgList = productImgList ? productImgList.map(({url}, index) => (
      <PreloadingImage style={styles.goodsDetailImage} sourceType={0} uri={Img.loadRatioImage(url, Img.FullWidth)}></PreloadingImage>
    )) : null
    // 商家文描图文列表
    const shopImgList = shopUrl ? shopUrl.map((item, index) => (
      <PreloadingImage style={styles.goodsDetailImage} sourceType={0} uri={Img.loadRatioImage(item, Img.FullWidth)} ></PreloadingImage>
    )) : null
    if (productActivityLabel && productActivityLabel.promotionType === 5 && productActivityLabel.labels) { //  promotionType：5 限时抢购
      tags = <Tag textValue={productActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF'></Tag>
    } else {
      if (productActivityLabel && productActivityLabel.labels) { //  promotionType：1 直降促销， 4 第N件N折/N元
        productTags = <Tag textValue={productActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF'></Tag>
      }
      if (orderActivityLabel && orderActivityLabel.labels) { //  promotionType：2 满减促销, 3 满件减满减折促销
        orderTags = <Tag textValue={orderActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF'></Tag>
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          {
            (
              <View style={styles.topTab}>
                <TabBar ref={e => this.tabs = e}
                  index={this.state.currentIndex}
                  data={this.state.tablist}
                  clickScroll={this.clickScroll}
                  onChange={index => {}} />
                <TouchableOpacity
                  style={styles.shareTouchableOpacity}
                  activeOpacity={0.95}
                  onPress={() => {
                    this.handleShowModal()
                  }} >
                  <Icon name='share' size={18} color="#4D4D4D" />
                </TouchableOpacity>
              </View>
            )
          }
          <ScrollView
            style={styles.scrollView}
            ref={(view) => {
              this.myScrollView = view
            }}
            showsVerticalScrollIndicator={false}
            // 当一帧滚动完毕时调用
            onMomentumScrollEnd={(event) => this.onMomentumScrollEnd(event)}
          >
            <View onLayout={event => {
              this.goodsLayoutY = event.nativeEvent.layout.y
            }}>
              <View onLayout={this.goodsSwiperLayout.bind(this)}>
                {
                  productActivityLabel && productActivityLabel.promotionType === 13 && (
                    <View style={styles.newPerson}>
                      <Text style={styles.newPersonText}>{productActivityLabel.promotionTypeName}</Text>
                    </View>
                  )
                }
                {
                  imgData ? <GoodsDetailSwiper imgData={imgData}/>
                    :
                    <Image style={styles.defaultImage} source={{uri: 'https://static-yh.yonghui.cn/app/static/images/product-default.png'}} resizeMode="contain"/>
                }
              </View>
            </View>
            {
              productActivityLabel && productActivityLabel.promotionType === 5 ?
                <BuyLimit productActivityLabel={productActivityLabel}></BuyLimit>
                : null
            }
            <View>
              <View style={styles.goodsPromotionPriceRowFlex}>
                <Text style={styles.goodsPriceSymbol}>¥</Text>
                {
                  productActivityLabel && productActivityLabel.discountPrice ?
                    <View style={styles.goodsPriceWrapper}>
                      <Text style={styles.goodsPrice}>{transPenny(productActivityLabel.discountPrice ? productActivityLabel.discountPrice : goodsInfo.price)}</Text>
                      {
                        productActivityLabel.discountPrice && productActivityLabel.discountPrice != goodsInfo.price
                          ? <Text style={styles.throughLine} >¥{transPenny(goodsInfo.price)}</Text>
                          : null
                      }
                    </View>
                    : <View style={styles.goodsPriceWrapper}>
                      <Text style={styles.goodsPrice}>{transPenny(goodsInfo.promotionPrice ? goodsInfo.promotionPrice : goodsInfo.price)}</Text>
                      {
                        goodsInfo.promotionPrice
                          ? <Text style={styles.throughLine} >¥{transPenny(goodsInfo.price)}</Text>
                          : null
                      }
                    </View>
                }
              </View>
              <View style={styles.goodsTags}>
                {tags}
                {productTags}
                {orderTags}
              </View>
              <View style={styles.goodsWrapper}>
                <Text numberOfLines={1} style={styles.goodsName}>{goodsInfo.productName}</Text>
                {
                  goodsInfo.subTitle ?
                    <Text style={styles.goodsTips}>{goodsInfo.subTitle}</Text>
                    : null
                }
              </View>
              <View style={styles.goodsQualityFlex}>
                {
                  goodsInfo.productSpecific ?
                    <View style={styles.goodsQualityItemFlex}>
                      <Image source={productSpecific} style={{width: 14, height: 14}}></Image>
                      <Text style={styles.goodsQualityValue}>{goodsInfo.productSpecific}</Text>
                    </View>
                    : null
                }
                {/* {
                goodsInfo.shelfLife ?
                  <View style={styles.goodsQualityItemFlex}>
                    <Image source={productConditions} style={{width: 14, height: 14}}></Image>
                    <Text style={styles.goodsQualityValue}>{goodsInfo.shelfLife}</Text>
                  </View>
                  : null
              } */}
                {
                  goodsInfo.originPlace ?
                    <View style={styles.goodsQualityItemFlex}>
                      <Image source={productPlace} style={{width: 14, height: 14}}></Image>
                      <Text style={styles.goodsQualityValue}>{goodsInfo.originPlace}</Text>
                    </View>
                    : null
                }
              </View>
            </View>
            {
              similarProduct ? <SimilarGoods similarProduct={similarProduct} jumpGoodsDetail={this.jumpGoodsDetail}> ></SimilarGoods>
                : null
            }
            <View onLayout={event => {
              this.detailLayoutY = event.nativeEvent.layout.y
            }}>
              <View style={styles.goodsDetail}>
                <Text style={styles.goodsDetailTitle}>商品详情</Text>
              </View>
              <TouchableOpacity
                style={styles.shareTouchableOpacity}
                activeOpacity={0.95}
                onPress={() => {
                  this.handleMaota()
                }} >
                <Icon name='share' size={18} color="#4D4D4D" />
              </TouchableOpacity>
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
      </View>
    )
  }
}
