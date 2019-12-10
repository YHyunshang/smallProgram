/**
 * Created by 李华良 on 2019-11-26
 */
import * as React from 'react'
import memoized from "memoize-one";
import {ActivityStatus, BaseObj} from "@common/typings";
import {ProductThumbnail} from "@common/config";
import {setNativeBtmCart, toggleGoodsDetailCartBarVis} from "@utils/native";
import PageContainer from "../components/PageContainer";
import ProductSection from "../components/ProductSection.PreSale";
import DetailSection from "../components/DetailSection.PreSale";
import ShareWrapper from "../components/ShareWrapper";
import {View} from "react-native";
import {track} from "@utils/tracking";

export interface PreSaleProps {
  product: BaseObj // 商品详情数据
  poster: string // 商品海报
  initialData?: BaseObj
}

interface PreSaleState {
  shareWrapperVis: boolean  // 分享浮层是否可见
}

class PreSale extends React.Component<PreSaleProps, PreSaleState> {
  static defaultProps = {
    initialData: {}
  }

  constructor(props: PreSaleProps) {
    super(props)
    this.state = {
      shareWrapperVis: false,
    }
  }

  componentDidMount(): void {
    toggleGoodsDetailCartBarVis(true)
  }

  toggleShareVis = (visible: boolean) => {
    if (visible) {
      toggleGoodsDetailCartBarVis(false)
      const { product = {} } = this.props
      const detailData = product.resChannelStoreProductVO || {}
      track('Share', {
        Page_type: '商详页',
        Page_name: detailData.productName,
        product_id: detailData.productCode,
        product_name: detailData.productName,
        original_price: detailData.price,
        present_price: detailData.promotionPrice,
      })
    }
    this.setState({shareWrapperVis: visible})
  }

  afterShareVisAnimation = (visible: boolean) => {
    !visible && toggleGoodsDetailCartBarVis(true)
  }

  onActivityStatusChange = (status: ActivityStatus) => {
    setNativeBtmCart(status !== ActivityStatus.Processing)
  }

  renderTabContent = (tabContent, index) => {
    const {product, initialData} = this.props
    switch (index) {
      case 0:
        return (
          <ProductSection
            productData={product}
            initialData={initialData}
            onActivityStatusChange={this.onActivityStatusChange}
          />
        )
      case 1:
      default:
        return <DetailSection productData={product}/>
    }
  }

  static getProductInfoForSharing = memoized((data: BaseObj) => {
    const {
      resChannelStoreProductVO: detailInfo = {},
    } = data

    return {
      code: detailInfo.productCode,
      name: detailInfo.prodcutName,
      storeCode: detailInfo.storeCode,
      desc: data.subTitle,
      thumbnail: data.mainUrl,
    }
  })

  render() {
    const { product, poster } = this.props
    const {shareWrapperVis} = this.state
    const productInfoForSharing = PreSale.getProductInfoForSharing(product)

    return (
      <>
        <PageContainer
          tabs={['商品', '详情']}
          tabContentRenderer={this.renderTabContent}
          onSharePress={() => this.toggleShareVis(true)}
        />
        <ShareWrapper
          visible={shareWrapperVis}
          product={productInfoForSharing}
          poster={poster}
          onClose={() => this.toggleShareVis(false)}
          afterVisibleAnimation={this.afterShareVisAnimation}
        />
      </>
    )
  }
}

export default PreSale
