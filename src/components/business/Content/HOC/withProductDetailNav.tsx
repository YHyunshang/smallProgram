/**
 * Created by 李华良 on 2019-12-02
 */
import * as React from 'react'
import { Native } from '@utils'
import { Product } from '@common/typings'
import { Route, RouteContext } from '@utils/contextes'
import { track } from '@utils/tracking'
import { transPenny } from '@utils/FormatUtil'

interface InjectedProps extends Product {
  beforeNav: () => void
}

const withProductDetailNav = <P extends Product>(
  WrappedComp: React.ComponentType<P>
): React.ComponentClass<P & InjectedProps> =>
  class WithProductDetailNav extends React.Component<P & InjectedProps> {
    static contextType: React.Context<Route> = RouteContext
    context: Route

    public static displayName = `WithProductDetailNav(${WrappedComp.displayName ||
      WrappedComp.name ||
      'Component'})`

    navToProductDetail = (thumbnail: string) => {
      const {
        code,
        name,
        shopCode,
        type,
        desc,
        price,
        slashedPrice,
        spec,
        count,
        beforeNav,
        queryId,
        traceId,
        recTraceId,
      } = this.props

      return () => {
        beforeNav instanceof Function && beforeNav()

        // 推荐商品触发推荐商品点击埋点
        recTraceId &&
          track('RecommendClick', {
            scenerio_name: '首页-小辉推荐',
            rec_trace_id: recTraceId,
            product_id: code,
            product_name: name,
            original_price: transPenny(slashedPrice || price),
            present_price: transPenny(price),
            product_spec: spec,
            opration_type: '点击商品',
          })

        Native.navigateTo({
          type: Native.NavPageType.NATIVE,
          uri: 'A003,A003',
          params: {
            productCode: code,
            storeCode: shopCode,
            directTransmitParams: {
              type,
              name,
              subTitle: desc,
              price: price,
              slashedPrice: slashedPrice || price,
              spec,
              count,
              thumbnail,
              queryId: queryId,
              recTraceId: recTraceId,
              $$tracking: this.context,
            },
          },
        })
      }
    }

    render() {
      return (
        <WrappedComp
          {...(this.props as P)}
          getDetailNavigator={this.navToProductDetail}
        />
      )
    }
  }

export default withProductDetailNav
