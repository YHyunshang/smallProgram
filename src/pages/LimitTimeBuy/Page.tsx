/**
 * Created by 李华良 on 2019-10-08
 */
import * as React from 'react'
import { View } from 'react-native'
import styles from './Page.styles'
import CartFooter from '@components/business/CartFooter'
import { LimitTimeBuy as LimitTimeBuyScene } from '@components/Scene'
import { CMSServices } from '@services'
import withHistory from '@HOC/withHistory'
import { RouteContext } from '@utils/contextes'

interface Props {
  shopCode: string
}

interface State {
  count: number
  amount: number
}

export default class Page extends React.Component<Props, State> {
  state = {
    count: 0,
    amount: 0,
  }

  componentDidMount(): void {
    this.requestCartInfo()
  }

  requestCartInfo = async () => {
    const { shopCode } = this.props
    const { result } = await CMSServices.getCartInfo(shopCode)
    this.setState({
      count: result.totalNum,
      amount: result.totalAmount,
    })
  }

  render() {
    const { count, amount } = this.state
    const { shopCode } = this.props

    return (
      <RouteContext.Provider
        value={{ path: '限时抢购活动页', name: '限时抢购活动页' }}
      >
        <CartFooter count={count} amount={amount}>
          <LimitTimeBuyScene
            shopCode={shopCode}
            afterAddCart={this.requestCartInfo}
          />
        </CartFooter>
      </RouteContext.Provider>
    )
  }
}
