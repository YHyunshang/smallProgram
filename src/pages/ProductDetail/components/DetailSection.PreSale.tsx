/**
 * Created by 李华良 on 2019-11-26
 */
import * as React from 'react'
import {BaseObj} from "@common/typings";
import {Text, View} from "react-native";
import styles from './PreSale.styles'
import {FitImg} from "@components";
import memorize from "memoize-one";
import {Img} from "@utils";

const loadFitImg = memorize(imgSrc => Img.loadRatioImage(imgSrc, Img.FullWidth))

export interface DetailSectionProps {
  productData: BaseObj
}

const DetailSection: React.FunctionComponent<DetailSectionProps> = ({ productData }) => {
  const {
    resProductAdvanceSaleVO: preSaleData = {},
    resChannelStoreProductVO: detailData = {},
  } = productData

  let shopImages = []
  try {
    shopImages = JSON.parse(detailData.shopUrl || '[]')
  } catch (e) {
    console.error('parse shopUrl error', e)
  }
  const images = [
    ...(preSaleData.resProductDescPicVOList || [])
      .sort((a, b) => a.sort - b.sort).map(ele => ele.descPicUrl),
    ...shopImages
  ]

  return (
    <View style={[styles.section, styles.sectionLast, styles.ph15, styles.detailBox]}>
      <Text style={styles.h2}>商品详情</Text>
      {!!detailData.originPlace && (
        <View style={styles.detailInfoRow}>
          <Text style={styles.detailInfoTitle}>产地</Text>
          <Text style={styles.detailInfoText}>{detailData.originPlace}</Text>
        </View>
      )}
      {!!detailData.productSpecific && (
        <View style={styles.detailInfoRow}>
          <Text style={styles.detailInfoTitle}>规格</Text>
          <Text style={styles.detailInfoText}>{detailData.productSpecific}</Text>
        </View>
      )}
      {!!detailData.shelfLife && (
        <View style={styles.detailInfoRow}>
          <Text style={styles.detailInfoTitle}>保质期</Text>
          <Text style={styles.detailInfoText}>{detailData.shelfLife}</Text>
        </View>
      )}
      {images.map(ele => (
        <FitImg source={{ uri: loadFitImg(ele) }} key={ele} />
      ))}
    </View>
  )
};

DetailSection.defaultProps = {
};

export default DetailSection
