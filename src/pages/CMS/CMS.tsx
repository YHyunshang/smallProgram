/**
 * Created by 李华良 on 2019-07-23
 */
import React from 'react'
import { StyleSheet, FlatList, Text } from 'react-native'
import TopTabFloor from './components/TopTabFloor'
import BannerFloor from './components/BannerFloor'
import BoxFloor from './components/BoxFloor'
import AdSingleFloor from './components/AdSingleFloor'
import Ad1v2Floor from './components/Ad1v2Floor'
import DividerFloor from './components/DividerFloor'
import ProductListFloor from './components/ProductListFloor'
import ProductGridFloor from './components/ProductGridFloor'
import ProductScrollFloor from './components/ProductScrollFloor'
import { CMSService } from '../../services'
import { Log } from '@utils'

interface State {
  floorData: Array<object>  // cms 数据
}

class CMS extends React.Component<object, State> {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,

      shopCode: '',

      floorData: [],
      tabData: [],

      currentTabId: '',
    }
  }

  async componentDidMount() {
    const shopCode = await CMSService.getNativeConstant('storeCode')
    if (shopCode) {
      this.setState({ shopCode })
      this.requestInitData(shopCode)
    }
  }

  requestInitData = (shopCode) => {
    CMSService.getInitialData(shopCode)
      .then(({ result: data }) => {
        const tabData = [...data]
        const floorData = data[0] ? data[0].templateVOList : []
        this.setState({tabData, floorData})
      })
  }
  requestFloorData = tabId =>
    CMSService.getFloorDataByTab(tabId, this.state.shopCode)
      .then(json => {
        this.setState({ floorData: json.result.templateVOList })
      })

  setShopData = shopCode => {
    Log.debug(`received shopData from native ${shopCode}`)
    this.setState({ shopCode })
    this.requestInitData(shopCode)
  }

  onPageScroll = ({ nativeEvent: { contentOffset: { x, y } } }) => {
    CMSService.pushScrollToNative(x, y)
  }

  onTabSelect = tabObj => {
    this.setState({ currentTabId: tabObj.id })
    this.requestFloorData(tabObj.id)
  }

  renderFloors = data => data
    .sort((a, b) => a.pos - b.pos)
    .filter(ele => ele.img || ele.templateDetailVOList.length > 0)
    .map(({ id, type, subType, templateDetailVOList: tplDetailData, img }) => {
      return type === 1 ? <BannerFloor data={tplDetailData} key={id}/>  // 1: banner floor
        : type === 2 ? (  // 2: img-ad floor
          subType === 1 ? (  // 1v2 img add floor
            <AdSingleFloor
              key={id}
              image={tplDetailData[0].imgUrl}
              uriType={tplDetailData[0].linkType}
              uri={tplDetailData[0].link}
              onPress={CMSService.navigateTo}
            />)
            : subType === 2 ? <Ad1v2Floor key={id} data={tplDetailData} onImgPress={CMSService.navigateTo} />  // 1 line img add floor
            : null)
        : type === 3 ? (  // 3: product floor
            subType === 1 ? <ProductListFloor data={tplDetailData} />  // product list floor
              : subType === 2 ? <ProductGridFloor key={id} data={tplDetailData} columnNum={2}/>  // product 2xn floor
              : subType === 3 ? <ProductGridFloor key={id} data={tplDetailData} columnNum={3}/>  // product 3xn floor
                : subType === 4 ? <ProductScrollFloor key={id} data={tplDetailData}/>  // product scroll floor
                  : null)
          : type === 4 ? (  // 4: category floor
              subType === 1 ? <BoxFloor data={tplDetailData} key={id}/>  // 4 per row
                : subType === 2 ? <BoxFloor data={tplDetailData} key={id}/>  // 5 per row
                : null)
            : type === 5 ? <DividerFloor key={id} image={img}/>  // divider floor
              : null
    })

  renderFlatItems = ({ item: { type, data } }) =>
    type === 'topTab' ? (
      data.length > 0 && (
        <TopTabFloor
          data={data}
          onTabSelect={this.onTabSelect}
          currentActiveTabId={this.state.currentTabId}
        />
      ))
    : type === 'cmsFloors' ? this.renderFloors(data)
    : null

  render() {
    const {
      tabData,
      floorData,
    } = this.state

    const flatData = [
      { type: 'topTab', data: tabData },
      { type: 'cmsFloors', data: floorData }
    ]

    return (
      <FlatList
        data={flatData}
        horizontal={false}
        refreshing={true}
        keyExtractor={item => item.type}
        renderItem={this.renderFlatItems}
      />
    )
  }
}

export default CMS
