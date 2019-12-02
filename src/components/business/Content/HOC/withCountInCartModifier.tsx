/*
 * @Author: 李华良
 * @Date: 2019-09-17 01:20:36
 * @Last Modified by: 李华良
 * @Last Modified time: 2019-09-20 18:19:13
 */
import * as React from 'react'
import {Product} from '../../../../common/typings'
import debounce from 'lodash/debounce'
import {CMSServices} from '@services'
import {Log, Native} from '@utils'

interface Props extends Product {
  shopCode: string // 门店编码
  afterModifyCount?: Function
  disableSync?: boolean // 是否同步上层 count
}

interface State {
  count: number // 商品在购物车中的数量
  modifiedCount: number
  disableAdd: boolean // 无法购物买更多
}

export default function withCartCountModify(WrappedComponent) {
  return class extends React.Component<Props, State> {
    constructor(props) {
      super(props)
      this.state = {
        count: props.count || 0,
        modifiedCount: props.count || 0,
        disableAdd: false
      }
    }

    componentWillReceiveProps(
      nextProps: Readonly<Props>,
      nextContext: any
    ): void {
      Log.debug(
        `count changed from parent: current - ${this.state.count}, next - ${nextProps.count}, disableSync - ${this.props.disableSync}`
      )
      if (nextProps.count !== this.state.count && !this.props.disableSync) {
        this.setState({
          count: nextProps.count,
          modifiedCount: nextProps.count,
        })
      }
    }

    requestUpdateCount = debounce(count => {
      const { code, price, shopCode, afterModifyCount } = this.props
      CMSServices.updateProductCountInCart(code, count, price, '', shopCode)
        .then(res => {
          Log.debug(`change count success: current is ${count}`, res)
          this.setState({ count, disableAdd: false })
          afterModifyCount && afterModifyCount(count, res)
        })
        .catch(err => {
          this.setState(({ count: preCount }) => ({ modifiedCount: preCount, disableAdd: err === '无法购买更多了' }))
          throw err
        })
    }, 500)

    showRemarksBeforeAddToCart = () => {
      const { afterModifyCount } = this.props
      Native.showRemarkPickerBeforeAddToCart(this.props).then(
        ({ count, extraData }) => {
          this.setState(
            { count, modifiedCount: count },
            () => afterModifyCount && afterModifyCount(count, extraData)
          )
        },
        () => this.setState({ count: 0, modifiedCount: 0 })
      )
    }

    onModifyCount = count => {
      if (
        count === 1 &&
        this.state.count === 0 &&
        this.props.remarks.length > 0
      ) {
        this.showRemarksBeforeAddToCart()
      } else {
        this.setState({ modifiedCount: count })
        this.requestUpdateCount(count)
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          count={this.state.modifiedCount}
          disableAdd={this.state.disableAdd}
          onModifyCount={this.onModifyCount}
        />
      )
    }
  }
}
