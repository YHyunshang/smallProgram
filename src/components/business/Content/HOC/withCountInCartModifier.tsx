/*
 * @Author: 李华良
 * @Date: 2019-09-17 01:20:36
 * @Last Modified by: 李华良
 * @Last Modified time: 2020-01-14 19:35:22
 */
import * as React from 'react'
import { Product } from '@common/typings'
import debounce from 'lodash/debounce'
import { CMSServices } from '@services'
import { Log, Native } from '@utils'
import { track } from '@utils/tracking'
import { Route, RouteContext } from '@utils/contextes'
import { transPenny } from '@utils/FormatUtil'

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
  return class extends React.PureComponent<Props, State> {
    static contextType: React.Context<Route> = RouteContext
    context: Route

    constructor(props) {
      super(props)
      this.state = {
        count: props.count || 0,
        modifiedCount: props.count || 0,
        disableAdd: false,
      }
    }

    componentWillReceiveProps(
      nextProps: Readonly<Props>,
      nextContext: any
    ): void {
      Log.debug(
        `[${nextProps.code}] count changed from parent: current - ${this.state.count}, next - ${nextProps.count}, disableSync - ${this.props.disableSync}`
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
          this.setState({ modifiedCount: count, count, disableAdd: false })
          afterModifyCount instanceof Function && afterModifyCount(count, res)
        })
        .catch(err => {
          this.setState(({ count: preCount }) => ({
            modifiedCount: preCount,
            disableAdd: err === '无法购买更多了',
          }))
          throw err
        })
    }, 500)

    showRemarksBeforeAddToCart = () => {
      const { afterModifyCount } = this.props
      Native.showRemarkPickerBeforeAddToCart(this.props).then(
        ({ count, extraData }) => {
          this.setState(
            { count, modifiedCount: count },
            () =>
              afterModifyCount instanceof Function &&
              afterModifyCount(count, extraData)
          )
        },
        () => this.setState({ count: 0, modifiedCount: 0 })
      )
    }

    onModifyCount = count => {
      const { code, name, price, slashedPrice, spec, recTraceId } = this.props

      // 推荐商品加购先触发推荐点击事件
      if (recTraceId) {
        track('RecommendClick', {
          scenerio_name: '首页-小辉推荐',
          rec_trace_id: recTraceId,
          product_id: code,
          product_name: name,
          original_price: transPenny(slashedPrice || price),
          present_price: transPenny(price),
          product_spec: spec,
          opration_type: '加入购物车',
        })
      }

      if (
        count === 1 &&
        this.state.count === 0 &&
        this.props.remarks.length > 0
      ) {
        this.showRemarksBeforeAddToCart()
      } else {
        const currentScene = this.context
        const { modifiedCount } = this.state
        count > modifiedCount &&
          track('addToShoppingcart', {
            $screen_name: currentScene.name,
            page_type: currentScene.path,
            product_id: code,
            product_name: name,
            original_price: transPenny(slashedPrice || price),
            present_price: transPenny(price),
            product_spec: spec,
            tab_name: currentScene.extraData
              ? currentScene.extraData.currentTab || ''
              : '',
            rec_trace_id: recTraceId,
          })

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
