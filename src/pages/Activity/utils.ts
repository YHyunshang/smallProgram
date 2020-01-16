import chunk from 'lodash/chunk'
import { BaseObj, Product } from '@common/typings'
import { CMSServices } from '@services'
import Carousel from '@components/business/Content/Carousel'
import AdTitle from '@components/business/Content/AdTitle'
import AdSingle from '@components/business/Content/AdSingle'
import { WindowWidth } from '@utils/global'
import Ad1v2 from '@components/business/Content/Ad1v2'
import Ad1v1 from '@components/business/Content/Ad1v1'
import ProductListItem from './components/ProductListItem'
import ProductRow from './components/ProductRow'
import ProductSwiper from '@components/business/Content/ProductSwiper'
import Box from '@components/business/Content/Box'
import Divider from '@components/business/Content/Divider'
import TopicActivity from './components/TopicActivity/TopicActivity'

export interface Floor {
  key: string | number
  component: React.ComponentType
  props: BaseObj
}

export function formatFloors(
  data: BaseObj[],
  hasMultiTab: boolean,
  shopCode: string,
  onProductCountChange: (c: number, productCode: string) => void,
  productCountMap: { [code: string]: number }
): Floor[] {
  let sortedData = data
    .sort((a, b) => a.pos - b.pos) // step 1: 排序
    .filter(
      // step 2: 过滤掉空数据
      ele =>
        ele.img ||
        (ele.tabVos && ele.tabVos.length > 0) ||
        (ele.templateDetailVOList && ele.templateDetailVOList.length > 0)
    )

  // step 3: 整合成组件
  let result = []
  let i = 0
  let length = sortedData.length
  while (i < length) {
    let floor = sortedData[i]
    if (floor.type === 1) {
      // 轮播图
      result.push({
        key: floor.id,
        component: Carousel,
        props: {
          imageHeight: 150,
          data: floor.templateDetailVOList.map(ele => ({
            key: ele.id,
            image: ele.imgUrl,
            link: CMSServices.formatLink(ele, shopCode),
          })),
        },
      })
    } else if (floor.type === 2) {
      // 广告标题
      if (floor.title && !(i === 0 && floor.subType === 1)) {
        result.push({
          key: `c-ad-${floor.id}-title`,
          component: AdTitle,
          props: {
            children: floor.title,
            link: CMSServices.formatLink(
              {
                linkType: floor.titleLinkType,
                link: floor.titleLink,
              },
              shopCode
            ),
            moreVisible: floor.isMore,
          },
        })
      }
      if (floor.subType === 1) {
        // 单张广告图
        const imgObj = floor.templateDetailVOList[0]
        result.push({
          key: floor.id,
          component: AdSingle,
          props: {
            image: imgObj.imgUrl,
            link: CMSServices.formatLink(imgObj, shopCode),
            width: i === 0 && hasMultiTab ? WindowWidth : undefined,
            height:
              i === 0 && hasMultiTab ? WindowWidth / (375 / 144) : undefined,
          },
        })
      } else if (floor.subType === 2) {
        // 1v2
        result.push({
          key: floor.id,
          component: Ad1v2,
          props: {
            data: (floor.templateDetailVOList || []).map(ele => ({
              image: ele.imgUrl,
              link: CMSServices.formatLink(ele, shopCode),
            })),
          },
        })
      } else if (floor.subType === 3) {
        // 1v1
        result.push({
          key: floor.id,
          component: Ad1v1,
          props: {
            data: floor.templateDetailVOList.slice(0, 2).map(ele => ({
              image: ele.imgUrl,
              link: CMSServices.formatLink(ele, shopCode),
            })),
          },
        })
      }
    } else if (floor.type === 3) {
      // 商品
      const { id: floorId, subType, templateDetailVOList } = floor
      const products = templateDetailVOList.map(ele => {
        const product = CMSServices.formatProduct(ele, shopCode)
        return {
          ...product,
          count: productCountMap[ele.code],
          afterModifyCount: c => onProductCountChange(c, ele.code),
        }
      })
      const productFloors =
        subType === 1 // 列表
          ? products.map((product, idx) => {
              return {
                key: `product-list/${floorId}/${product.code}`,
                component: ProductListItem,
                props: {
                  product,
                  isLast: idx === 0,
                },
              }
            })
          : subType === 2 || subType === 3 // 一行 2 个 / 一行 3 个
          ? chunk(products, subType === 2 ? 2 : 3).map((ele, idx) => {
              return {
                key: `product-grid/${floorId}/${ele[0].code}`,
                component: ProductRow,
                props: {
                  products: ele,
                  columns: subType === 2 ? 2 : 3,
                  isFirst: idx === 0,
                },
              }
            })
          : [
              // 横划
              {
                key: floor.id,
                component: ProductSwiper,
                props: {
                  products,
                  columnNumber:
                    [2, 3].indexOf(floor.subType) > -1
                      ? floor.subType
                      : undefined,
                  afterModifyCount: onProductCountChange,
                },
              },
            ]
      result = result.concat(productFloors)
    } else if (floor.type === 4 && [1, 2].indexOf(floor.subType) !== -1) {
      // 分类入口，宫格
      result.push({
        key: floor.id,
        component: Box,
        props: {
          columnNumber: { 1: 4, 2: 5 }[floor.subType],
          data: floor.templateDetailVOList.map(ele => ({
            key: ele.id,
            image: ele.imgUrl,
            title: ele.name,
            link: CMSServices.formatLink(ele),
          })),
        },
      })
    } else if (floor.type === 5) {
      // 分割图
      result.push({
        key: floor.id,
        component: Divider,
        props: {
          image: floor.img,
        },
      })
    } else if (floor.type === 8) {
      // 8:潮物达人,9:酒专题
      result.push({
        key: floor.id,
        component: TopicActivity,
        props: {
          currentTabVos: floor.tabVos,
          shopCode,
          type: floor.type,
          afterModifyCount: onProductCountChange,
        },
      })
    }
    i++
  }

  return result
}
