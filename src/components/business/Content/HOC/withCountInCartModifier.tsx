import * as React from 'react'
import { Product } from '../typings'
import debounce from 'lodash/debounce'
import { CMSServices } from '@services'

interface Props extends Product {
  shopCode: string // 门店编码
  afterModifyCount?: Function
}

interface State {
  count: number // 商品在购物车中的数量
  modifiedCount: number
}

export default function withCartCountModify(WrappedComponent) {
  return class extends React.Component<Props, State> {
    state = {
      count: this.props.count || 0,
      modifiedCount: this.props.count || 0,
    }

    requestUpdateCount = debounce(function(count) {
      const { code, price, shopCode, afterModifyCount } = this.props
      CMSServices.updateProductCountInCart(code, count, price, '', shopCode)
        .then(() => {
          this.setState({ count })
          afterModifyCount && afterModifyCount(count)
        })
        .catch(err => {
          this.setState(({ count: preCount }) => ({ modifiedCount: preCount }))
          throw err
        })
    }, 500)

    onModifyCount = count => {
      this.setState({ modifiedCount: count })
      this.requestUpdateCount(count)
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          count={this.state.modifiedCount}
          onModifyCount={this.onModifyCount}
        />
      )
    }
  }
}
