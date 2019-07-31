/*
 * @Description: 商品详情页面
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-07-31 14:24:44
 */
import React from 'react'
import {ScrollView, View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, NativeModules, Platform} from 'react-native'
// import * as WeChat from 'react-native-wechat';
import Icon from '../../components/Icon'
import {transPenny} from '../../utils/FormatUtil'
import ShareModal from '../../components/business/ShareModal'
import PosterModal from '../../components/business/PosterModal'
import TabBar from '../../components/common/TabBar'
import Loading from '../../components/common/Loading'
import Toast from 'react-native-easy-toast'
import {isIPhoneXMarginTop, isIPhoneXFooter} from '../../utils/IsIphoneX'
import {getGoodsDetailData, getPosterImgUrl} from '../../services/goodsDetail'
import GoodsDetailSwiper from '../../components/business/GoodsDetailSwiper'
import GoodsDetailEvaluate from '../../components/business/GoodsDetailEvaluate'
const {width} = Dimensions.get('window')
const goodsDetailManager = NativeModules.GoodsDetailsNativeManager// 原生商品详情模块
export default class ProductDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFirst: true, //是否是第一次请求生成海报接口
      isShowTopTab: false, //是否展示顶部tab
      goodsDetail: {}, //商品详情
      evaluation: {}, //商品评价信息
      goodsInfo: {}, //商品基本信息
      imgUrl: '', //生成海报的图片地址
      productParams: {}, //传给生成海报接口的参数
      productDetailImagesResponseVOList: [],
      currentIndex: 0, //当前索引
      tablist: [
        {id: 1, name: '商品'},
        {id: 2, name: '评价'},
        {id: 3, name: '详情'}
      ],
      imgData: [],
      productImgList: [], //商品详情图文
      shopUrl: []//商家文描
    }
    this.shareIconHeight = 0//分享按钮到高度
    this.goodsSwiperHeight = 0//图文滚动组件到高度
    this.topTabY = 0//页面滚动到距离
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
          let shopUrl = JSON.parse(data.resChannelStoreProductVO.shopUrl || '')
          object.productDesc = data.resChannelStoreProductVO.productName
          object.productPrice = data.resChannelStoreProductVO.price
          object.productUrl = data.productSliderImagesResponseVOList[0].url
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
          this.refs.toast.show(message, 3000)
        }
      }).catch((error) => {
        this.refs.toast.show(error, 3000)
      })
  }
  /**
   * @description: 显示分享朋友圈弹层
   */
  handleShowModal() {
    this.shareModal.showShareModal()
  }
  /**
   * @description: 显示生成海报弹层
   */
  handlePosterModal=(productParams) => {
    this.posterModal.showPosterModal()
    this.sharePoster(productParams)
  }
  /**
    * 生成海报方法
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
    }
    getPosterImgUrl(params)
      .then(({result: data, message, code}) => {
        this.loadingModal.dismissLoading()
        if (code === 200000 && data) {
          this.setState({imgUrl: data.imgUrl, isFirst: false})
        } else {
          this.refs.toast.show(message, 3000)
        }
      }
      ).catch((error) => {
        this.loadingModal.dismissLoading()
        this.refs.toast.show(error, 3000)
      })
    // let url = 'http://xszt-sit.yh-sod-usercenter.sitapis.yonghui.cn/public/getWXComposeImg'
    // httpManager.sendRequest('post', url, params, (errMsg, responseData) => {
    //   this.setState({imgUrl: responseData.result.imgUrl})
    // })
  }
  /**
   * @description: 根据点击tab选项跳转至指定区域
   */
  clickScroll=(index) => {
    if (index === 0) {
      // 其中this.layouot.y就是距离现在的高度位置
      this.myScrollView.scrollTo({x: 0, y: this.goodsLayoutY, animated: false})
    } else if (index === 1) {
      // 其中this.layouot.y就是距离现在的高度位置
      this.myScrollView.scrollTo({x: 0, y: this.evaluteLayoutY, animated: false})
    } else {
      // 其中this.layouot.y就是距离现在的高度位置
      this.myScrollView.scrollTo({x: 0, y: this.detailLayoutY, animated: false})
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
   * @description: 页面滚动时到回调函数
   */
  scrollEvent(event) {
    let topTabY = event.nativeEvent.contentOffset.y
    if (topTabY > this.goodsSwiperHeight + this.shareIconHeight + 15) {
      this.setState({
        isShowTopTab: true
      })
    } else {
      this.setState({
        isShowTopTab: false
      })
    }
  }
  /**
   * @description: 跳转至原生的评价列表页面
   */
  jumpToNativeEvaluteList=() => {
    goodsDetailManager.pushToEvaluationList()
  }
  render() {
    const {imgData, isShowTopTab, goodsInfo, evaluation, productImgList, shopUrl, imgUrl, productParams, isFirst} = this.state
    let favorableRate = goodsInfo.favorableRate ? goodsInfo.favorableRate * 100 : 0
    favorableRate = favorableRate && parseFloat(favorableRate.toFixed(2))
    //商品详情图文列表
    const goodsImgList = productImgList ? productImgList.map(({url}, index) => (
      <Image style={styles.goodsDetailImage} source={{uri: url}} resizeMode="cover" key={index}/>
    )) : []
    //商家文描图文列表
    const shopImgList = shopUrl ? shopUrl.map((item, index) => (
      <Image style={styles.goodsDetailImage} source={{uri: item}} resizeMode="cover" key={index}/>
    )) : []
    return (
      <View style={styles.container}>
        {
          isShowTopTab ?
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
                  <Icon style={styles.rightShareIcon} name='share' size={17} color="#333333" />
                </TouchableOpacity>
              </View>
            ) : (<View ></View>)

        }
        <ScrollView
          ref={(view) => {
            this.myScrollView = view
          }}
          scrollEventThrottle = {200}
          onScroll={(event) => {
            this.scrollEvent(event)
          }}
        >
          <View onLayout={event => {
            this.goodsLayoutY = event.nativeEvent.layout.y
          }}>
            <View onLayout={this.goodsSwiperLayout.bind(this)}>
              <GoodsDetailSwiper imgData={imgData}/>
            </View>
          </View>
          <View>
            <View style={styles.goodsWrapper}>
              <Text style={styles.goodsName}>{goodsInfo.productName}</Text>
              <TouchableOpacity onPress={() => {
                this.handleShowModal()
              }} onLayout={this.shareIconLayout.bind(this)}>
                <View style={styles.iconBg}>
                  <Icon name='share' size={10} color="#FA6400" />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.goodsPrice}>¥ {transPenny(goodsInfo.promotionPrice ? goodsInfo.promotionPrice : goodsInfo.price)}</Text>
            </View>
            <View style={styles.goodsMinBorder}></View>
          </View>
          <View style={styles.goodsQualityFlex}>
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
          <View style={styles.goodsMaxBorder}></View>
          <View onLayout={event => {
            this.evaluteLayoutY = event.nativeEvent.layout.y
          }}>
            <GoodsDetailEvaluate jumpToEvaluteList={this.jumpToNativeEvaluteList} evaluation={evaluation} favorableRate={favorableRate}/>
          </View>
          <View style={styles.goodsMaxBorder}></View>
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
        {/* <View style={styles.footCart}>
          <GoodsFootCart/>
       </View> */}
        <ShareModal modalBoxHeight={240} productParams={productParams} onShare={this.handlePosterModal} ref={ref => this.shareModal = ref}/>
        <PosterModal modalBoxHeight={514} imgUrl={imgUrl} ref={ref => this.posterModal = ref}/>
        <Toast
          ref="toast"
          style={{backgroundColor: '#444444'}}
          position='top'
          positionValue={200}
          fadeInDuration={750}
        />
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'relative'
  },
  goodsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 14,
    paddingBottom: 11,
    paddingHorizontal: 15
  },
  goodsName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333'
  },
  iconBg: {
    width: 34,
    height: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FA6400',
    backgroundColor: '#FFE9DA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  goodsPrice: {
    fontSize: 14,
    color: '#EE4239',
    fontWeight: '600',
    paddingLeft: 15
  },
  goodsMinBorder: {
    borderStyle: 'solid',
    borderWidth: 0.6,
    marginHorizontal: 12,
    marginTop: 11,
    borderColor: '#F0F0F0'
  },
  goodsQualityFlex: {
    height: 67,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  goodsQualityRowFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  goodsQualityColumnFlex: {
    paddingTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heightBorder: {
    borderStyle: 'solid',
    borderRightWidth: 1,
    height: 26,
    borderColor: '#F0F0F0'
  },
  goodsQualityName: {
    fontSize: 12,
    color: '#A3A09B',
    fontWeight: '600'
  },
  goodsQualityValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 13
  },
  goodsMaxBorder: {
    borderStyle: 'solid',
    borderWidth: 10,
    borderColor: '#F0F0F0'
  },
  goodsDetailTitle: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '900',
    marginTop: 9,
    marginLeft: 15
  },
  goodsDetailImage: {
    width: '100%',
    height: 306,
    marginTop: 10
  },
  imagesContent: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    //iPhoneX底部兼容处理
    marginBottom: isIPhoneXFooter(0)
  },
  topTab: {
    width: '100%',
    height: 44,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //iPhoneX头部兼容处理
    marginTop: isIPhoneXMarginTop(0)
  },
  blankContent: {
    width: '100%',
    height: 44
  },
  leftIcon: {
    marginLeft: 15
  },
  rightShareIcon: {
    marginRight: 22
  },
  topTabInfo: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontSize: 14,
    color: '#333333'
  },
  itemEvaluateTitle: {
    fontSize: 14,
    color: '#333333',
    marginHorizontal: 32
  },
  footCart: {
    flex: 1,
    width,
    position: 'absolute',
    bottom: 0
  }
})
