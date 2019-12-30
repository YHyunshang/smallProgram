/**
 * Created by 李华良 on 2019-11-26
 */
import * as React from 'react'
import {
  ActivityStatus,
  BaseObj,
  Product,
  ProductDeliveryType,
  ProductType,
} from '@common/typings'
import uniqBy from 'lodash/uniqBy'
import {
  getGoodsDetailData,
  getPoster,
  getSimilarProduct,
} from '@services/goodsDetail'
import { ProductThumbnail } from '@common/config'
import { transPenny } from '@utils/FormatUtil'
import {
  setNativeBtmCart,
  showToast,
  toggleGoodsDetailCartBarVis,
} from '@utils/native'
import withInitialData from '@HOC/withInitialData'
import { track } from '@utils/tracking'
import PageContainer from './components/PageContainer'
import ShareWrapper from './components/ShareWrapper'
import memoized from 'memoize-one'
import {
  LimitTimeBuy as ProductSectionLimitTimeBuy,
  Normal as ProductSectionNormal,
  PreSale as ProductSectionPreSale,
} from './components/ProductSection'
import DetailSection from './components/DetailSection.PreSale'
import { placeholderProduct } from '@const/resources'
import SimilarProducts from './components/SimilarProducts'
import { loadRatioImage } from '@utils/img'
import {RouteContext} from "@utils/contextes";

interface InitialProductData extends BaseObj {
  type?: ProductType // 商品类型
}

export interface PageProps {
  productCode: string // 商品编码
  storeCode: string // 门店编码
  initialData?: InitialProductData // 初始数据，上级页面透传过来的简单商品数据
}

interface PageState {
  productDetail: BaseObj // 商品详情数据
  similarProducts: Product[] // 相似商品
  poster: string // 商品海报
  shareWrapperVis: boolean // 分享 wrapper 是否可见
  routeName: string
}

// 获取以小程序方式分享到微信好友所需的商品信息
const getProductInfoForSharing = memoized((data: BaseObj) => {
  const detailInfo = data.resChannelStoreProductVO || {}
  const sliderInfo = data.productSliderImagesResponseVOList || []

  let thumbnail = ProductThumbnail
  if (detailInfo.mainUrl && detailInfo.mainUrl.fileType === 0 && detailInfo.url)
    thumbnail = detailInfo.mainUrl.url
  else {
    const img = sliderInfo.find(ele => ele.fileType === 0)
    if (img) thumbnail = img.url
  }
  thumbnail = loadRatioImage(thumbnail, 300)

  return {
    code: detailInfo.productCode,
    name: detailInfo.productName,
    storeCode: detailInfo.storeCode,
    desc: detailInfo.subTitle,
    thumbnail,
  }
})

// @ts-ignore: hoc can wrap class-styled components
@withInitialData
export default class Page extends React.Component<PageProps, PageState> {
  static defaultProps = {
    initialData: {
      type: ProductType.Normal,
    },
  }

  constructor(props: PageProps) {
    super(props)
    this.state = {
      productDetail: {},
      similarProducts: [],
      poster: '',
      shareWrapperVis: false,
      routeName: '商详页',
    }
  }

  componentDidMount(): void {
    this.init()
  }

  init = async () => {
    const {
      productCode,
      storeCode,
      initialData: { $$tracking },
    } = this.props

    // request similar products
    getSimilarProduct(productCode, storeCode)
      .then(data =>
        uniqBy(data.result || [], 'productCode')
          .filter(ele => ele && !!ele.productCode)
          .map(ele => this.formatSimilarProducts(ele))
      )
      .then(similarProducts => this.setState({ similarProducts }))

    // request detail data
    const { result: product } = await getGoodsDetailData(storeCode, productCode)
    if (!product) {
      showToast('找不到该商品', '0')
      return
    }

    const detailInfo = product.resChannelStoreProductVO || {} // 商详信息
    const sliderInfo = product.productSliderImagesResponseVOList || {} // 轮播图

    this.setState({ productDetail: product, routeName: detailInfo.productName })

    // tracking
    const isFromRNPage = $$tracking instanceof Object
    isFromRNPage &&
      track('productDetail', {
        product_detail_source: $$tracking.name,
        page_type: $$tracking.path,
        product_id: detailInfo.productCode,
        product_name: detailInfo.productName,
        original_price: detailInfo.price,
        present_price: detailInfo.promotionPrice || detailInfo.price,
        product_spec: detailInfo.productSpecific,
      })

    // get poster
    const priceOnPoster = detailInfo.promotionPrice || detailInfo.price
    let thumbnail = detailInfo.mainUrl
    if (!thumbnail) {
      const firstImgInSlider = sliderInfo.find(
        ele => ele.fileType === 0 && ele.url
      )
      thumbnail = firstImgInSlider ? firstImgInSlider.url : ProductThumbnail
    }
    const { result: poster } = await getPoster({
      name: detailInfo.productName,
      price: `¥ ${transPenny(priceOnPoster)}`,
      code: detailInfo.productCode,
      storeCode: detailInfo.storeCode,
      thumbnail,
    })
    this.setState({ poster })
  }

  formatSimilarProducts = (
    data: BaseObj
  ): { beforeNav: () => void, _data_: BaseObj } & Product => {
    const {
      mainUrl = {},
      promotionPrice,
      price,
      productActivityLabel,
      orderActivityLabel,
    } = data
    const thumbnail = mainUrl.fileType === 0 ? mainUrl.url : placeholderProduct
    const labels = [
      ...new Set([
        ...((productActivityLabel || {}).labels || []),
        ...((orderActivityLabel || {}).labels || []),
      ]),
    ]
    return {
      type:
        data.isAdvanceSale === 1
          ? ProductType.PreSale
          : (productActivityLabel || {}).promotionType === 5
          ? ProductType.LimitTimeBuy
          : ProductType.Normal,
      code: data.productCode,
      name: data.productName,
      thumbnail,
      desc: data.subTitle,
      spec: data.productSpecific,
      price: Math.min(promotionPrice || Infinity, price || 0),
      slashedPrice: price,
      count: data.productNum,
      shopCode: data.storeCode,
      remark: data.productNoteName,
      remarks: data.noteContentList,
      inventoryLabel: data.inventoryLabel,
      isPreSale: data.isAdvanceSale === 1,
      deliveryType:
        {
          1: ProductDeliveryType.InTime,
          2: ProductDeliveryType.NextDay,
        }[data.deliveryType] || ProductDeliveryType.Other,
      labels,
      beforeNav: () => {
        const { productDetail } = this.state
        const product = productDetail.resChannelStoreProductVO || {}

        track('RecommendClick', {
          scenerio_name: '相似商品',
          product_id: data.productCode,
          product_name: data.productName,
          origin_price: data.price,
          present_price: data.promotionPrice || data.price,
          product_spec: data.productSpecific,
          opration_type: '点击商品',
          strategy_id: '',
          from_product_id: product.productCode,
          from_product_name: product.productName,
          from_product_original_price: product.price,
          from_product_present_price: product.promotionPrice || product.price,
        })
      },
      _data_: data, // 原始数据
    }
  }

  toggleShareVis = (visible: boolean) => {
    if (visible) {
      toggleGoodsDetailCartBarVis(false)
      const { productDetail: product = {} } = this.state
      const detailData = product.resChannelStoreProductVO || {}
      track('Share', {
        page_type: '商详页',
        $screen_name: detailData.productName,
        product_id: detailData.productCode,
        product_name: detailData.productName,
        original_price: detailData.price,
        present_price: detailData.promotionPrice || detailData.price,
      })
    }
    this.setState({ shareWrapperVis: visible })
  }

  afterShareVisAnimation = (visible: boolean) => {
    !visible && toggleGoodsDetailCartBarVis(true)
  }

  // 获取分享给微信好友需要的商品信息
  static getProductInfoForSharing = memoized(
    (data: BaseObj = {}): BaseObj => {
      const detailInfo = data.resChannelStoreProductVO || {}

      return {
        code: detailInfo.productCode,
        name: detailInfo.prodcutName,
        storeCode: detailInfo.storeCode,
        desc: data.subTitle,
        thumbnail: data.mainUrl,
      }
    }
  )

  onLimitTimBuyStatusChange = (
    status: ActivityStatus,
    oldStatus: ActivityStatus
  ) => {
    status === ActivityStatus.Expired && this.init()
  }

  onPreSaleStatusChange = (status: ActivityStatus) => {
    setNativeBtmCart(status !== ActivityStatus.Processing)
  }

  renderProductSection = () => {
    const { initialData } = this.props
    const { productDetail, similarProducts } = this.state
    const detailData = productDetail.resChannelStoreProductVO || {}
    const productType = (detailData.productCode
    ? detailData.isAdvanceSale === 1
    : initialData.type === ProductType.PreSale)
      ? ProductType.PreSale
      : (detailData.productActivityLabel || {}).promotionType === 5
      ? ProductType.LimitTimeBuy
      : ProductType.Normal

    switch (productType) {
      case ProductType.LimitTimeBuy:
        return (
          <>
            <ProductSectionLimitTimeBuy
              productData={productDetail}
              initialData={initialData}
              onStatusChange={this.onLimitTimBuyStatusChange}
            />
            {similarProducts.length > 0 && (
              <SimilarProducts products={similarProducts} />
            )}
          </>
        )
      case ProductType.PreSale:
        return (
          <ProductSectionPreSale
            productData={productDetail}
            initialData={initialData}
            onActivityStatusChange={this.onPreSaleStatusChange}
          />
        )
      default:
        return (
          <>
            <ProductSectionNormal
              productData={productDetail}
              initialData={initialData}
            />
            {similarProducts.length > 0 && (
              <SimilarProducts products={similarProducts} />
            )}
          </>
        )
    }
  }

  renderTabContent = (tabContent, index) => {
    const { productDetail } = this.state

    switch (index) {
      case 0:
        return this.renderProductSection()
      case 1:
      default:
        return <DetailSection productData={productDetail} />
    }
  }

  render() {
    const { productDetail, poster, shareWrapperVis, routeName } = this.state

    // 分享到微信好友需要的商品信息
    const productInfoForWXFriendsSharing = getProductInfoForSharing(
      productDetail
    )

    return (
      <RouteContext.Provider value={{ path: '商详页', name: routeName }}>
        <PageContainer
          tabs={['商品', '详情']}
          tabContentRenderer={this.renderTabContent}
          onSharePress={() => this.toggleShareVis(true)}
        />
        <ShareWrapper
          visible={shareWrapperVis}
          product={productInfoForWXFriendsSharing}
          poster={poster}
          onClose={() => this.toggleShareVis(false)}
          afterVisibleAnimation={this.afterShareVisAnimation}
        />
      </RouteContext.Provider>
    )
  }
}
