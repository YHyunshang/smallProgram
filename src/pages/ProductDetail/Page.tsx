/**
 * Created by 李华良 on 2019-11-26
 */
import * as React from 'react'
import {BaseObj, ProductType} from "@common/typings";
import {getGoodsDetailData, getPoster, getSimilarProduct} from '@services/goodsDetail'
import {ProductThumbnail} from "@common/config";
import {transPenny} from "@utils/FormatUtil";
import PreSale from "./containers/PreSale";
import Normal from "./containers/Normal";
import {showToast} from "@utils/native";
import withInitialProductData from "@components/business/Content/HOC/withInitialProductData";

export interface PageProps {
  type: ProductType
  productCode: string
  storeCode: string
  initialData?: BaseObj
}

interface PageState {
  productDetail: BaseObj // 商品详情数据
  similarProducts: BaseObj[] // 相似商品
  poster: string // 商品海报
}

class Page extends React.Component<PageProps, PageState> {
  static defaultProps = {
    type: ProductType.Normal
  }

  constructor(props: PageProps) {
    super(props)
    this.state = {
      productDetail: {},
      similarProducts: [],
      poster: '',
    }
  }

  componentDidMount(): void {
    this.init()
  }

  init = async () => {
    // const { productCode, storeCode, type } = this.props
    const type = ProductType.PreSale
    const productCode = '251440'
    const storeCode = '9010'

    // request similar products
    if (type !== ProductType.PreSale) {
      getSimilarProduct(productCode, storeCode)
        .then(({result: similarProducts}) => this.setState({similarProducts}))
    }

    // request detail data
    const { result: product } = await getGoodsDetailData(storeCode, productCode)
    if (!product) {
      showToast('找不到该商品', '0')
      return
    }
    this.setState({ productDetail: product })

    // get poster
    const {
      resChannelStoreProductVO: detailInfo = {},  // 商详信息
      productSliderImagesResponseVOList: sliderInfo = [],  // 轮播图
    } = product
    const priceOnPoster = detailInfo.promotionPrice || detailInfo.price
    let thumbnail = detailInfo.mainUrl
    if (!thumbnail) {
      const firstImgInSlider = sliderInfo.find(ele => ele.fileType === 0 && ele.url)
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

  render() {
    const { type, initialData } = this.props
    const { productDetail, poster, similarProducts } = this.state

    return (type === ProductType.PreSale || (productDetail.resChannelStoreProductVO || {}).isAdvanceSale === 1)
      ? (
        <PreSale
          product={productDetail}
          poster={poster}
          initialData={initialData}
        />
      ) : (
        <Normal
          product={productDetail}
          poster={poster}
          similarProducts={similarProducts}
          initialData={initialData}
        />
      )
  }
}

export default withInitialProductData(Page)
