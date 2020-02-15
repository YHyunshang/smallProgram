/**
 * Created by 李华良 on 2020-02-12
 */
import * as React from 'react'
import { Product } from '@common/typings'
import { Route, RouteContext } from '@utils/contextes'
import { track } from '@utils/tracking'
import { transPenny } from '@utils/FormatUtil'

interface InjectedProps extends Product {}

const withProductVisChange = <P extends Product>(
  WrappedComp: React.ComponentType<P>
): React.ComponentClass<P & InjectedProps> =>
  class WithProductVisChange extends React.Component<P & InjectedProps> {
    static contextType: React.Context<Route> = RouteContext
    context: Route

    public static displayName = `WithProductVisChange(${WrappedComp.displayName ||
      WrappedComp.name ||
      'Component'})`

    // 已展示过的商品编码（当前只针对推荐商品）
    private visitedProducts = new Set()

    onViewableItemsChanged = ({ viewableItems }) =>
      viewableItems.forEach(({ index, item }) => {
        if (this.visitedProducts.has(item.code)) return

        // 推荐商品触发浏览事件
        if (item.queryId && item.recTraceId) {
          this.visitedProducts.add(item.code)
          track('RecommendView', {
            scenerio_name: '首页-小辉推荐',
            rec_trace_id: item.recTraceId,
            query_id: item.queryId,
            product_id: item.code,
            product_name: item.name,
            result_no: index + 1,
            original_price: transPenny(item.slashedPrice || item.price),
            present_price: transPenny(item.price),
            product_spec: item.spec,
          })
        }
      })

    render() {
      return (
        <WrappedComp
          {...(this.props as P)}
          onViewableItemsChanged={this.onViewableItemsChanged}
        />
      )
    }
  }

export default withProductVisChange
