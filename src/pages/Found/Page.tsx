import * as React from 'react'
import styles from './Page.styles'
import { Native } from '@utils'
import { CMSServices } from '@services'
import ActivityWithIPSC from '@components/business/Content/ActivityWithIPS'
import { RefreshControl, View, FlatList } from 'react-native'
import theme from '@theme'
import Loading from '@components/Loading'
import { RouteContext } from '@utils/contextes'

const ActivityWithIPS = React.memo(ActivityWithIPSC)

interface State {
  loading: boolean
  floorData: {}[]
  shopCode: string
  enablePageScroll: boolean
}

// @ts-ignore: hoc can wrap class-styled components
export default class Page extends React.PureComponent<Object, State> {
  state = {
    loading: false,
    floorData: [],
    shopCode: '',
    enablePageScroll: true,
  }

  nativeSubscription: { remove: Function }

  async componentDidMount() {
    const shopCode = await Native.getConstant('storeCode')
    if (shopCode) {
      this.setState({ shopCode })
      this.requestPageData(shopCode)
    }
    this.nativeSubscription = CMSServices.subscriptShopChange(
      this.onNativeShopChange
    )
  }

  componentWillUnmount(): void {
    this.nativeSubscription && this.nativeSubscription.remove()
  }

  onNativeShopChange = ({ storeCode }) => {
    if (storeCode !== this.state.shopCode) {
      this.setState({ shopCode: storeCode })
      this.requestPageData(storeCode)
    }
  }

  requestPageData = async shopCode => {
    this.setState({ loading: true })
    let res
    try {
      res = await CMSServices.getFoundPageData(shopCode)
    } finally {
      this.setState({ loading: false })
    }
    const { result } = res
    const validData = result.templateVOList
      .filter(
        floor =>
          (floor.type === 2 || floor.type === 3) &&
          (floor.templateDetailVOList && floor.templateDetailVOList.length > 0)
      )
      .sort((a, b) => a.pos - b.pos)

    let floorData = []
    const total = validData.length
    let i = 0
    while (i < total) {
      const curFloor = validData[i]
      const nextFloor = validData[i + 1]

      if (curFloor.type === 2 && nextFloor && nextFloor.type === 3) {
        const imgObj = curFloor.templateDetailVOList[0]
        floorData.push({
          key: curFloor.id,
          image: imgObj.imgUrl,
          products: nextFloor.templateDetailVOList.map(
            this.productFormatter,
            shopCode
          ),
          activityCode: imgObj.link,
        })
        i += 2
        continue
      } else if (curFloor.type === 2) {
        const imgObj = curFloor.templateDetailVOList[0]
        floorData.push({
          key: curFloor.id,
          image: imgObj.imgUrl,
          products: [],
          activityCode: imgObj.link,
        })
      } else if (curFloor.type === 3) {
        floorData.push({
          key: curFloor.id,
          image: null,
          products: curFloor.templateDetailVOList.map(
            this.productFormatter,
            shopCode
          ),
          link: {},
        })
      }
      i += 1
    }
    this.setState({ floorData })
  }

  productFormatter = (data, shopCode) => {
    const price = Math.min(data.price || 0, data.promotionPrice || 0)
    const slashedPrice = price < (data.price || 0) ? data.price : 0
    return {
      thumbnail: data.imgUrl,
      name: data.name,
      code: data.code,
      price,
      slashedPrice,
      shopCode,
      _key_: data.id,
    }
  }

  renderFlatItem = ({ item }) => (
    <View style={styles.floorBox}>
      <ActivityWithIPS {...item} />
    </View>
  )

  render() {
    const { floorData, loading, shopCode, enablePageScroll } = this.state
    return (
      <RouteContext.Provider value={{ path: '?????????', name: '?????????' }}>
        <View style={styles.container}>
          {loading && floorData.length === 0 && (
            <View style={styles.loadingContainer}>
              <Loading />
            </View>
          )}

          <FlatList
            data={floorData}
            keyExtractor={item => `${item.key}`}
            renderItem={this.renderFlatItem}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading && floorData.length > 0}
                onRefresh={() => this.requestPageData(shopCode)}
                colors={[theme.refreshColor]}
                tintColor={theme.refreshColor}
              />
            }
            scrollEnabled={enablePageScroll}
          />
        </View>
      </RouteContext.Provider>
    )
  }
}
