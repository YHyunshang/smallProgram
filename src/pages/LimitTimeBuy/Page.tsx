/**
 * Created by 李华良 on 2019-10-08
 */
import * as React from 'react'
import {View} from "react-native";
import styles from './Page.styles'
import CartFooter from "@components/business/CartFooter";
import {LimitTimeBuy as LimitTimeBuyScene} from "@components/Scene";
import {CMSServices} from "@services";

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
    this.requestCartInfo(this.props.shopCode)
  }

  requestCartInfo = async shopCode => {
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
      <CartFooter count={count} amount={amount}>
        <LimitTimeBuyScene shopCode={shopCode} afterAddCart={() => this.requestCartInfo(shopCode)} />
      </CartFooter>
    )
  }
}