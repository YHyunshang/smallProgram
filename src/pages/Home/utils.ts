/*
 * @Author: 李华良
 * @Date: 2019-09-26 17:48:52
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-26 18:23:07
 */
import { CMSServices } from '@services'
import Carousel from '@components/business/Content/Carousel'
import AdTitle from '@components/business/Content/AdTitle'
import ProductSwiperWithBg from '@components/business/Content/ProductSwiperWithBg'
import AdSingle from '@components/business/Content/AdSingle'
import Ad1v2 from '@components/business/Content/Ad1v2'
import Ad1v1 from '@components/business/Content/Ad1v1'
import ProductList from '@components/business/Content/ProductList'
import ProductGrid from '@components/business/Content/ProductGrid'
import ProductSwiper from '@components/business/Content/ProductSwiper'
import Box from '@components/business/Content/Box'
import Divider from '@components/business/Content/Divider'
import LimitTimeBuy from "@components/business/Content/LimitTimeBuy";

export function formatFloorData(
  data: { [index: string]: any },
  shopCode: string,
  currentTabIdx: number
) {
  let sortedData = data
    .sort((a, b) => a.pos - b.pos) // step 1: 排序
    .filter(
      // step 2: 过滤掉空数据
      ele =>
        ele.img ||
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
        wrapperStyle: { paddingHorizontal: 0 },
        props: {
          imageHeight: currentTabIdx === 0 && i === 0 ? 290 : 150,
          data: floor.templateDetailVOList.map(ele => ({
            key: ele.id,
            image: ele.imgUrl,
            link: CMSServices.formatLink(ele),
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
            link: CMSServices.formatLink({
              linkType: floor.titleLinkType,
              link: floor.titleLink,
            }),
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
            wrapperStyle: { paddingHorizontal: 0 },
            props: {
              backgroundImage: imgObj.imgUrl,
              products: nextFloor.templateDetailVOList.map(ele => ({
                ...CMSServices.formatProduct(ele),
                shopCode,
              })),
            },
          })
          i += 2
          continue
        }
        result.push({
          key: floor.id,
          component: AdSingle,
          wrapperStyle: [
            {
              marginHorizontal:
                currentTabIdx === 0 && imgObj.name !== '查看更多' ? 10 : 0,
            },
            currentTabIdx === 0 && {
              borderRadius: 5,
              overflow: 'hidden',
            },
          ],
          props: {
            image: imgObj.imgUrl,
            link: CMSServices.formatLink(imgObj),
          },
        })
      } else if (floor.subType === 2) {
        // 1v2
        result.push({
          key: floor.id,
          component: Ad1v2,
          wrapperStyle: { paddingHorizontal: currentTabIdx === 0 ? 15 : 0 },
          props: {
            data: (floor.templateDetailVOList || []).map(ele => ({
              image: ele.imgUrl,
              link: CMSServices.formatLink(ele),
            })),
          },
        })
      } else if (floor.subType === 3) {
        // 1v1
        result.push({
          key: floor.id,
          component: Ad1v1,
          wrapperStyle: { paddingHorizontal: currentTabIdx === 0 ? 10 : 0 },
          props: {
            data: floor.templateDetailVOList.slice(0, 2).map(ele => ({
              image: ele.imgUrl,
              link: CMSServices.formatLink(ele),
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
          wrapperStyle: { paddingHorizontal: 0 },
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
          paddingTop: 25,
          paddingBottom: Math.ceil(boxData.length / columnNumber) > 2 ? 0 : 25,
          backgroundColor: '#FFF',
        },
        props: {
          columnNumber,
          data: boxData,
          maxRow: 2,
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
      // 限时抢购
      result.push({
        key: floor.id,
        component: LimitTimeBuy,
        props: {
          // startTime: Number(floor.activityBeginTime),
          startTime: 1569559859424,
          // endTime: Number(floor.activityEndTime),
          endTime: 1569832808096,
          // products: floor.templateDetailVOList.slice(0, 4).map(ele => CMSServices.formatProduct(ele)),
          products: [
            { name: '新鲜进口脐橙新鲜进口脐橙新鲜进口脐橙', code: '1', spec: '100g/包', price: 18.9, thumbnail: 'http://hotfile-cdn.yonghui.cn/files/%7Ccephdata%7Cfilecache%7CYHYS%7CYHYS%7C2019-06-28%7C6717838386972848128' },
            { name: '新鲜进口脐橙新鲜进口脐橙新鲜进口脐橙', code: '2', spec: '100g/包', price: 18.9, thumbnail: 'http://hotfile-cdn.yonghui.cn/files/%7Ccephdata%7Cfilecache%7CYHYS%7CYHYS%7C2019-06-28%7C6717838386972848128' },
            { name: '新鲜进口脐橙新鲜进口脐橙新鲜进口脐橙', code: '3', spec: '100g/包', price: 18.9, thumbnail: 'http://hotfile-cdn.yonghui.cn/files/%7Ccephdata%7Cfilecache%7CYHYS%7CYHYS%7C2019-06-28%7C6717838386972848128' },
            { name: '新鲜进口脐橙新鲜进口脐橙新鲜进口脐橙', code: '4', spec: '100g/包', price: 18.9, thumbnail: 'http://hotfile-cdn.yonghui.cn/files/%7Ccephdata%7Cfilecache%7CYHYS%7CYHYS%7C2019-06-28%7C6717838386972848128' },
          ]
        }
      })
    }
    i++
  }
  return result
}
