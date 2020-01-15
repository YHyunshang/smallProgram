import { BaseObj } from '@common/typings'
/*
 * @Author: 李华良
 * @Date: 2019-09-26 17:48:52
 * @Last Modified by: 李华良
 * @Last Modified time: 2020-01-14 10:59:12
 */
import * as React from 'react'
import { CMSServices } from '@services'
import CarouselC from '@components/business/Content/Carousel'
import AdTitleC from '@components/business/Content/AdTitle'
import ProductSwiperWithBg from '@components/business/Content/ProductSwiperWithBg'
import AdSingleC from '@components/business/Content/AdSingle'
import NewPersonGiftAdSingle from '@components/business/Content/NewPersonGiftAdSingle'
import Ad1v2C from '@components/business/Content/Ad1v2'
import Ad1v1C from '@components/business/Content/Ad1v1'
import ProductListC from '@components/business/Content/ProductList'
import ProductGridC from '@components/business/Content/ProductGrid'
import ProductSwiperC from '@components/business/Content/ProductSwiper'
import BoxC from '@components/business/Content/Box'
import DividerC from '@components/business/Content/Divider'
import LimitTimeBuy from '@components/business/Content/LimitTimeBuy'
import { Global, Native } from '@utils'
import { WindowWidth } from '@utils/global'

const Carousel = React.memo(CarouselC)
const AdTitle = React.memo(AdTitleC)
const ProductList = React.memo(ProductListC)
const ProductGrid = React.memo(ProductGridC)
const ProductSwiper = React.memo(ProductSwiperC)
const AdSingle = React.memo(AdSingleC)
const Ad1v1 = React.memo(Ad1v1C)
const Ad1v2 = React.memo(Ad1v2C)
const Box = React.memo(BoxC)
const Divider = React.memo(DividerC)

export function formatFloorData(
  data: BaseObj[],
  shopCode: string,
  currentTabIdx: number,
  onLimitTimeBuyExpire: () => void
) {
  let sortedData = CMSServices.filterData(data)

  // 整合成组件
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
        wrapperStyle: { paddingHorizontal: 0 },
        props: {
          imageHeight:
            currentTabIdx === 0 && i === 0
              ? (Global.WindowWidth * 290) / 375
              : (Global.WindowWidth * 150) / 375,
          data: floor.templateDetailVOList.map(ele => ({
            key: ele.id,
            image: ele.imgUrl,
            link:
              ele.name && ele.name.indexOf('茅台') != -1
                ? CMSServices.mouTaiActivityLink(ele.name, shopCode)
                : CMSServices.formatLink(ele, shopCode),
          })),
        },
      })
    } else if (floor.type === 2) {
      // 广告图
      // 有广告标题
      if (floor.title) {
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
        const nextFloor = sortedData[i + 1]
        // 首页第一个 tab：单张广告图 + 商品横向滑动 则 合并为合成组件
        if (
          imgObj.name === '半包图' &&
          nextFloor &&
          nextFloor.type === 3 &&
          nextFloor.subType === 4
        ) {
          result.push({
            key: `c-${floor.id}&${nextFloor.id}`,
            component: ProductSwiperWithBg,
            wrapperStyle: {
              paddingHorizontal: 0,
              marginBottom: 10,
            },
            props: {
              backgroundImage: imgObj.imgUrl,
              backgroundImageLink: CMSServices.formatLink(imgObj, shopCode),
              products: nextFloor.templateDetailVOList.map(ele => ({
                ...CMSServices.formatProduct(ele),
                shopCode,
              })),
            },
          })
          i += 2
          continue
        }
        const dimensionProps =
          imgObj.name === '查看更多' || imgObj.name === '标题' // 查看更多、区位标题
            ? {}
            : i === 0 && currentTabIdx > 0 // 非首位 tab 的头图
            ? { width: WindowWidth, height: WindowWidth / (375 / 144) }
            : nextFloor && nextFloor.type === 3 // 商品位头图
            ? {
                initialWidth: WindowWidth - 20,
                initialHeight: (WindowWidth - 20) / (375 / 118),
              }
            : {
                // 通栏广告
                initialWidth: WindowWidth,
                initialHeight: WindowWidth / (375 / 108),
              }
        result.push({
          key: floor.id,
          component: AdSingle,
          wrapperStyle: [
            currentTabIdx > 0 && i === 0 // 首页非首位 tab 下的头图
              ? {}
              : imgObj.name === '查看更多' // 查看更多图片
              ? { marginBottom: 10 }
              : nextFloor && nextFloor.type === 3 // 商品位头图
              ? {
                  paddingTop: 15,
                  paddingHorizontal: 10,
                  backgroundColor: '#FFF',
                }
              : {},
          ],
          props: {
            image: imgObj.imgUrl,
            link:
              imgObj.name && imgObj.name.indexOf('茅台') != -1
                ? CMSServices.mouTaiActivityLink(imgObj.name, shopCode)
                : CMSServices.formatLink(imgObj, shopCode),
            borderRadius: nextFloor && nextFloor.type === 3 ? 5 : 0,
            ...dimensionProps,
          },
        })
      } else if (floor.subType === 2) {
        // 1v2
        result.push({
          key: floor.id,
          component: Ad1v2,
          wrapperStyle: {
            backgroundColor: '#FFF',
            marginBottom: 10,
            paddingBottom: 10,
          },
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
          wrapperStyle: {
            backgroundColor: '#FFF',
            marginBottom: 10,
            paddingBottom: 10,
          },
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
      const component =
        {
          1: ProductList,
          2: ProductGrid,
          3: ProductGrid,
          4: ProductSwiper,
        }[floor.subType] || ProductSwiper
      if (component)
        result.push({
          key: floor.id,
          component,
          wrapperStyle: {
            paddingHorizontal: 0,
            marginBottom: component === ProductSwiper ? 10 : 0,
          },
          props: {
            products: floor.templateDetailVOList.map(ele => ({
              ...CMSServices.formatProduct(ele),
              shopCode,
            })),
            columnNumber:
              floor.subType === 2 ? 2 : floor.subType === 3 ? 3 : undefined,
          },
        })
    } else if (floor.type === 4 && [1, 2].indexOf(floor.subType) !== -1) {
      // 分类入口，宫格
      const boxItemPropsFormatter = data =>
        data.templateDetailVOList.map(ele => ({
          key: ele.id,
          image: ele.imgUrl,
          title: ele.name,
          link: CMSServices.formatLink(ele),
        }))
      let boxData = [...boxItemPropsFormatter(floor)]
      while (true) {
        i += 1
        const nextFloor = sortedData[i]
        if (
          nextFloor &&
          nextFloor.type === floor.type &&
          nextFloor.subType === floor.subType
        ) {
          boxData = boxData.concat(boxItemPropsFormatter(nextFloor))
        } else {
          i -= 1
          break
        }
      }
      const columnNumber = { 1: 4, 2: 5 }[floor.subType]
      result.push({
        key: floor.id,
        component: Box,
        wrapperStyle: {
          paddingTop: 18,
          paddingBottom: Math.ceil(boxData.length / columnNumber) > 2 ? 0 : 18,
          backgroundColor: '#FFF',
        },
        props: {
          columnNumber,
          data: boxData,
          maxRow: 2,
        },
      })
      //首页1元新人礼包广告图入口
      result.push({
        key: '$$comp-newPersonGiftAdSingle',
        component: NewPersonGiftAdSingle,
        wrapperStyle: [
          {
            marginHorizontal: 10,
          },
          currentTabIdx === 0 && {
            borderRadius: 5,
            overflow: 'hidden',
          },
        ],
        props: {
          updateTime: new Date().getSeconds(),
        },
      })
    } else if (floor.type === 5) {
      // 分割图
      result.push({
        key: floor.id,
        component: Divider,
        wrapperStyle: { paddingHorizontal: 0 },
        props: {
          image: floor.img,
        },
      })
    } else if (floor.type === 7) {
      const { activityBeginTime, activityEndTime } = floor
      if (activityBeginTime && activityEndTime) {
        // 限时抢购
        result.push({
          key: floor.id,
          component: LimitTimeBuy,
          props: {
            startTime: Number(activityBeginTime),
            endTime: Number(activityEndTime),
            products: floor.templateDetailVOList
              .slice(0, 4)
              .map(ele => CMSServices.formatProduct(ele)),
            onExpired: onLimitTimeBuyExpire,
          },
          wrapperStyle: { marginBottom: 10 },
        })
      }
    }
    i++
  }
  return result
}

// 预留给 native 的最大高度
export const NativePlaceHeightMax = Native.StatusBarHeight + 56
// 预留给 native 的最小高度
export const NativePlaceHeightMin = Native.StatusBarHeight + 36
// 预留给 native 的高度变化范围
export const NativePlaceHeightDelta =
  NativePlaceHeightMax - NativePlaceHeightMin
// tab 高度
export const TabHeight = 40
