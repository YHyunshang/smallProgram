/*
 * @Description: 商品详情页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-07 17:47:24
 */
import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView, View, Text, TouchableOpacity, NativeModules, Animated, Easing} from 'react-native'
import Icon from '../../../components/Icon'
import {transPenny} from '../../../utils/FormatUtil'
import ShareModal from '../../../components/business/ShareModal'
import PosterModal from '../../../components/business/PosterModal'
import TabBar from '../../../components/common/TabBar'
import Loading from '../../../components/common/Loading'
import styles from './Normal.styles'
import {Native, Img} from '@utils'
import GoodsDetailSwiper from '../../../components/business/GoodsDetail/GoodsDetailSwiper'
import SimilarGoods from '../../../components/business/GoodsDetail/SimilarGoods'
// 商品产地图标 // 商品规格图标 //商品条件图标
import {productPlace, productSpecific} from '@const/resources'
import Tag from '../../../components/business/GoodsDetail/Tag'
import BuyLimit from '../../../components/business/GoodsDetail/BuyLimit'
import {iconDeliveryNextDay, placeholderProduct} from '../../../constants/resources'
import FastImage from 'react-native-fast-image/src/index'
import {FitImg} from '../../../components'
import memorize from "memoize-one";
import {ProductThumbnail} from '../../../common/config'
import {track} from '../../../utils/tracking'

const goodsDetailManager = NativeModules.GoodsDetailsNativeManager// 原生商品详情模块

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)

class Normal extends React.Component {
  static propTypes = {
    product: PropTypes.object,
    poster: PropTypes.string,
    similarProducts: PropTypes.arrayOf(PropTypes.object),
    initialData: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 是否在请求商品详情数据
      thumbnailOpacity: new Animated.Value(1),
      thumbnailVis: true,
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
      imgData: [], // 默认占位图
      productImgList: [], // 商品详情图文
      shopUrl: [], // 商家文描
      similarProduct: [],
      productActivityLabel: {}, //  1 直降促销,4 第N件N折/N元,5 限时抢 --活动标签
      orderActivityLabel: {} // 2 满减促销, 3 满件减满减折促销 --活动标签
    }
    this.shareIconHeight = 0// 分享按钮到高度
    this.goodsSwiperHeight = 0// 图文滚动组件到高度
    this.topTabY = 0// 页面滚动到距离
  }

  tabRef = React.createRef()
  scrollViewRef = React.createRef()
  shareModalRef = React.createRef()
  posterModalRef = React.createRef()
  loadingRef = React.createRef()

  /**
   * @description: 显示分享朋友圈弹层
   */
  handleShowModal = () => {
    goodsDetailManager.hideBottomViews()// 隐藏底部购物车模块
    this.shareModalRef.current.showShareModal()
    const { product = {} } = this.props
    const detailData = product.resChannelStoreProductVO || {}
    track('Share', {
      Page_type: '商详页',
      Page_name: detailData.productName,
      product_id: detailData.productCode,
      product_name: detailData.productName,
      original_price: detailData.price,
      present_price: detailData.promotionPrice || detailData.price,
    })
  }
  /**
   * @description: 显示生成海报弹层
   */
  handlePosterModal=() => {
    goodsDetailManager.hideBottomViews()// 隐藏底部购物车模块
    this.posterModalRef.current.showPosterModal()
    track('ShareChanel', { Share_Chanel: '微信小程序分享图', Page_type: '商详页' })
  }

  handleMaota() {
    Native.navigateTo({
      type: Native.NavPageType.RN,
      uri: 'RNPreviewPurchase',
      params: {activityCode: '茅台-NS7419983'}
    })
  }
  /**
   * @description: 点击相似商品列表跳转至商品详情
   */
  jumpGoodsDetail=(item) => {
    const { product } = this.props
    const detailData = product.resChannelStoreProductVO || {}
    track('RecommendClick', {
      scenerio_name: '相似商品',
      product_id: item.productCode,
      product_name: item.productName,
      origin_price: item.price,
      present_price: item.promotionPrice || item.price,
      product_spec: item.productSpecific,
      opration_type: '点击商品',
      strategy_id: '',
      from_product_id: detailData.productCode,
      from_product_name: detailData.productName,
      from_product_original_price: detailData.price,
      from_product_present_price: detailData.promotionPrice || detailData.price,
    })

    Native.navigateTo({
      type: Native.NavPageType.NATIVE,
      uri: 'A003,A003',
      params: {
        productCode: item.productCode,
        directTransmitParams: {
          name: item.productName,
          subTitle: item.subTitle,
          price: item.promotionPrice || item.price,
          slashedPrice: item.price,
          spec: item.productSpecific,
          thumbnail: Img.loadRatioImage(item.mainUrl.url, 200),
        }
      }
    })
  }
  /**
   * @description: 根据点击tab选项跳转至指定区域
   * @description: 根据点击tab选项跳转至指定区域
   */
  clickScroll = (index) => {
    if (index === 0) {
      // 其中this.layouot.y就是距离现在的高度位置
      this.scrollViewRef.current.scrollTo({x: 0, y: this.goodsLayoutY, animated: true})
    } else {
      // 其中this.layouot.y就是距离现在的高度位置
      this.scrollViewRef.current.scrollTo({x: 0, y: this.detailLayoutY, animated: true})
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
  goodsSwiperLayout = (event) => {
    this.goodsSwiperHeight = event.nativeEvent.layout.height
  }
  /**
   * @description: 页面滚动结束时回调函数
   */
  onMomentumScrollEnd = (event) => {
    let topTabY = event.nativeEvent.contentOffset.y
    this.tabRef.current.resetIndex(topTabY < this.detailLayoutY ? 0 :1)
  }
  /**
   * @description: 跳转至原生的评价列表页面
   */
  jumpToNativeEvaluteList=() => {
    goodsDetailManager.pushToEvaluationList()
  }

  onCarouselLoadEnd = () => {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    })
      .start(
        () => this.setState({ thumbnailVis: false })
      )
  }

  renderHeader = () => {
    const { currentIndex } = this.state
    return (
      <View style={styles.topTab}>
        <TabBar
          ref={this.tabRef}
          index={currentIndex}
          data={[
            {id: 1, name: '商品'},
            {id: 2, name: '详情'}
          ]}
          clickScroll={this.clickScroll}
        />
        <TouchableOpacity
          style={styles.shareTouchableOpacity}
          activeOpacity={0.95}
          onPress={this.handleShowModal}
        >
          <Icon name="share" size={18} color="#4D4D4D" />
        </TouchableOpacity>
      </View>
    )
  }

  renderSwiper = () => {
    const { initialData = {}, product } = this.props
    const { thumbnailVis, thumbnailOpacity } = this.state

    const productActivityLabel = (product.resChannelStoreProductVO || {}).productActivityLabel || {}
    const imgData = product.productSliderImagesResponseVOList || []

    return (
      <View onLayout={event => {
        this.goodsLayoutY = event.nativeEvent.layout.y
      }}>
        <View onLayout={this.goodsSwiperLayout}>
          {productActivityLabel && productActivityLabel.promotionType === 13 && (
            <View style={styles.newPerson}>
              <Text style={styles.newPersonText}>{productActivityLabel.promotionTypeName}</Text>
            </View>
          )}
          <View style={{ position: 'relative' }}>
            <GoodsDetailSwiper imgData={imgData} onAllLoadEnd={this.onCarouselLoadEnd} />
            {thumbnailVis && (
              <AnimatedFastImage
                style={[ styles.defaultImage, { opacity: thumbnailOpacity } ]}
                source={initialData.thumbnail ? { uri: initialData.thumbnail } : placeholderProduct}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </View>
    )
  }

  getShopUrl = memorize(str => {
    let result = []
    try {
      result = JSON.parse(str || '[]')
    } catch (e) {
      console.error(e)
    }
    return result
  })

  getProductParams = memorize(
    ({resChannelStoreProductVO: detail = {}, productSliderImagesResponseVOList: sliders = [] }) => {
      let thumbnail = detail.mainUrl
      if (!thumbnail) {
        const firstSlider = sliders.find(ele => ele.fileType === 0 && ele.url)
        thumbnail = firstSlider ? firstSlider.url : ProductThumbnail
      }
      return {
        productDesc: detail.productName,
        productPrice: detail.promotionPrice || detail.price,
        productUrl: thumbnail,
        productCode: detail.productCode,
        storeCode: detail.storeCode,
      }
    }
  )

  render() {
    let tags, productTags, orderTags// 促销类型 1 直降促销, 2 满减促销, 3 满件减满减折促销 ,4 第N件N折/N元,5 限时抢购
    const { initialData = {}, product = {}, poster, similarProducts = [] } = this.props

    const goodsInfo = product.resChannelStoreProductVO || {}
    const productImgList = product.productDetailImagesResponseVOList || []

    const loading = !goodsInfo.productCode
    const shopUrl = this.getShopUrl(goodsInfo.shopUrl)
    const productActivityLabel = goodsInfo.productActivityLabel || {}
    const orderActivityLabel = goodsInfo.orderActivityLabel || {}
    const productParams = this.getProductParams(product)

    const isLimitTimeBuy = productActivityLabel && productActivityLabel.promotionType === 5

    // let favorableRate = goodsInfo.favorableRate ? goodsInfo.favorableRate * 100 : 0
    // favorableRate = favorableRate && parseFloat(favorableRate.toFixed(2))
    // 商品详情图文列表
    const goodsImgList = (productImgList || []).map(({url, id}) => (
      <FitImg key={id} source={{ uri: Img.loadRatioImage(url, Img.FullWidth) }} resizeMode="contain" />
    ))
    // 商家文描图文列表
    const shopImgList = shopUrl.map((item, index) => (
      <FitImg key={index} source={{ uri: Img.loadRatioImage(item, Img.FullWidth) }} resizeMode="contain"/>
    ))
    if (productActivityLabel && productActivityLabel.promotionType === 5 && productActivityLabel.labels) { //  promotionType：5 限时抢购
      tags = <Tag textValue={productActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF' />
    } else {
      if (productActivityLabel && productActivityLabel.labels) { //  promotionType：1 直降促销， 4 第N件N折/N元
        productTags = <Tag textValue={productActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF' />
      }
      if (orderActivityLabel && orderActivityLabel.labels) { //  promotionType：2 满减促销, 3 满件减满减折促销
        orderTags = <Tag textValue={orderActivityLabel.labels[0]} marginLeft={5} minWidth={30} backgroundColor="#FF816A" color='#FFFFFF' />
      }
    }

    const price = loading
      ? initialData.price
      : (productActivityLabel && productActivityLabel.discountPrice && productActivityLabel.discountPrice < goodsInfo.price)
        ? productActivityLabel.discountPrice
        : goodsInfo.price
    const slashedPrice = loading ? initialData.slashedPrice : goodsInfo.price
    const name = loading ? initialData.name : goodsInfo.productName
    const subTitle = loading ? initialData.subTitle : goodsInfo.subTitle
    // 规格
    const specNode = loading && initialData.spec
      ? (
        <View style={styles.goodsQualityItemFlex}>
          <FastImage source={productSpecific} style={{width: 14, height: 14}} />
          <Text style={styles.goodsQualityValue}>{initialData.spec}</Text>
        </View>
      ) : (!loading && !!goodsInfo.productSpecific) ? (
        <View style={styles.goodsQualityItemFlex}>
          <FastImage source={productSpecific} style={{width: 14, height: 14}} />
          <Text style={styles.goodsQualityValue}>{goodsInfo.productSpecific}</Text>
        </View>
      ) : null

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          {this.renderHeader()}

          <ScrollView
            style={{ flex: 1 }}
            ref={this.scrollViewRef}
            showsVerticalScrollIndicator={false}
            // 当一帧滚动完毕时调用
            onMomentumScrollEnd={this.onMomentumScrollEnd}
          >
            {this.renderSwiper()}

            {isLimitTimeBuy && (
              <BuyLimit productActivityLabel={productActivityLabel} />
            )}

            <View>
              <View style={styles.goodsPromotionPriceRowFlex}>
                <Text style={styles.goodsPriceSymbol}>¥</Text>
                <View style={styles.goodsPriceWrapper}>
                  <Text style={styles.goodsPrice}>{transPenny(price)}</Text>
                  {slashedPrice > price && (
                    <Text style={styles.throughLine}>¥{transPenny(slashedPrice)}</Text>
                  )}
                </View>
              </View>
              <View style={styles.goodsTags}>
                {goodsInfo.deliveryType === 2 && (
                  <FastImage source={iconDeliveryNextDay} style={{ width: 38, height: 16 }} />
                )}
                {tags}
                {productTags}
                {orderTags}
              </View>
              <View style={styles.goodsWrapper}>
                <Text numberOfLines={1} style={styles.goodsName}>{name}</Text>
                {!!subTitle && (
                  <Text style={styles.goodsTips}>{subTitle}</Text>
                )}
              </View>
              <View style={styles.goodsQualityFlex}>
                {specNode}
                {/* {
                goodsInfo.shelfLife ?
                  <View style={styles.goodsQualityItemFlex}>
                    <Image source={productConditions} style={{width: 14, height: 14}}></Image>
                    <Text style={styles.goodsQualityValue}>{goodsInfo.shelfLife}</Text>
                  </View>
                  : null
              } */}
                {!!goodsInfo.originPlace && (
                  <View style={styles.goodsQualityItemFlex}>
                    <FastImage source={productPlace} style={{width: 14, height: 14}} />
                    <Text style={styles.goodsQualityValue}>{goodsInfo.originPlace}</Text>
                  </View>
                )}
              </View>
            </View>
            {similarProducts.length > 0 && (
              <SimilarGoods similarProduct={similarProducts} jumpGoodsDetail={this.jumpGoodsDetail} />
            )}
            <View onLayout={event => {
              this.detailLayoutY = event.nativeEvent.layout.y
            }}>
              <View style={styles.goodsDetail}>
                <Text style={styles.goodsDetailTitle}>商品详情</Text>
              </View>
              {/* <TouchableOpacity
                style={styles.shareTouchableOpacity}
                activeOpacity={0.95}
                onPress={() => {
                  this.handleMaota()
                }} >
                <Icon name='share' size={18} color="#4D4D4D" />
              </TouchableOpacity> */}
              <View style={styles.imagesContent}>
                {goodsImgList}
                {shopImgList}
              </View>
            </View>
          </ScrollView>
        </View>

        <ShareModal modalBoxHeight={240} productParams={productParams} onShare={this.handlePosterModal} ref={this.shareModalRef}/>
        <PosterModal modalBoxHeight={534} imgUrl={poster} ref={this.posterModalRef}/>
        <Loading title="海报生成中" ref={this.loadingRef} />
      </View>
    )
  }
}

export default Normal