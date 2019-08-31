import * as React from 'react'
import styles from './Page.styles'
import { Native } from '@utils'
import { CMSServices } from '@services'
import { FlatList } from 'react-native-gesture-handler'
import ActivityWithIPS from '@components/business/Content/ActivityWithIPS'
import { RefreshControl, View } from 'react-native'

interface State {
  loading: boolean
  floorData: {}[]
  shopCode: string
}

export default class Page extends React.Component<Object, State> {
  state = {
    loading: false,
    floorData: [],
    shopCode: '',
  }

  nativeSubscription: { remove: Function }

  async componentDidMount() {
    const shopCode = await Native.getConstant('storeCode')
    this.setState({ shopCode })
    this.requestPageData(shopCode)
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
      .filter(floor => floor.type === 2 || floor.type === 3)
      .sort((a, b) => a.pos - b.pos)

    let floorData = []
    const total = validData.length
    let i = 0
    while (i < total) {
      const curFloor = validData[i]
      const nextFloor = validData[i + 1]

      if (curFloor.type === 2 && nextFloor && nextFloor.type === 3) {
        const imgObj = (curFloor.templateDetailVOList || [{ imgUrl: null }])[0]
        floorData.push({
          key: curFloor.id,
          image: imgObj.imgUrl,
          products: nextFloor.templateDetailVOList.map(this.productFormatter),
          activityCode: imgObj.link,
        })
        i += 2
        continue
      } else if (curFloor.type === 2) {
        const imgObj = (curFloor.templateDetailVOList || [{ imgUrl: '' }])[0]
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
          products: curFloor.templateDetailVOList.map(this.productFormatter),
          link: {},
        })
      }
      i += 1
    }
    this.setState({ floorData })
  }

  productFormatter = data => {
    const price = Math.min(data.price || 0, data.promotionPrice || 0)
    const slashedPrice = price < (data.price || 0) ? data.price : 0
    return {
      thumbnail: data.imgUrl,
      name: data.name,
      code: data.code,
      price,
      slashedPrice,
    }
  }

  renderFlatItem = ({ item }) => (
    <View style={styles.floorBox}>
      <ActivityWithIPS {...item} />
    </View>
  )

  render() {
    const { floorData, loading, shopCode } = this.state
    return (
      <FlatList
        data={floorData}
        keyExtractor={item => `${item.key}`}
        renderItem={this.renderFlatItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => this.requestPageData(shopCode)}
            colors={['rgba(238, 66, 57, 1)', 'rgba(238, 66, 57, 0)']}
            tintColor={'rgba(238, 66, 57, 1)'}
          />
        }
      />
    )
  }
}
