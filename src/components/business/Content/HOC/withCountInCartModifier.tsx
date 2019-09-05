import * as React from 'react'
import { Product } from '../typings'
import debounce from 'lodash/debounce'
import { CMSServices } from '@services'
import { Log } from '@utils'
import { Alert } from 'react-native'

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
    constructor(props) {
      super(props)
      this.state = {
        count: props.count || 0,
        modifiedCount: props.count || 0,
      }
    }

    componentWillReceiveProps(
      nextProps: Readonly<Props>,
      nextContext: any
    ): void {
      if (nextProps.count !== this.state.count) {
        Log.debug(
          `count changed from parent: current - ${this.state.count}, next - ${nextProps.count}`
        )
        this.setState({
          count: nextProps.count,
          modifiedCount: nextProps.count,
        })
      }
    }

    requestUpdateCount = debounce(count => {
      const { code, price, shopCode, afterModifyCount } = this.props
      CMSServices.updateProductCountInCart(code, count, price, '', shopCode)
        .then(() => {
          Log.debug(`change count success: current is ${count}`)
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
