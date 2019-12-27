/**
 * Created by 李华良 on 2019-12-02
 */
import * as React from 'react'
import {Native} from "@utils";
import {Product} from "@common/typings";
import {Route, RouteContext} from "@utils/contextes";

interface InjectedProps extends Product {
  beforeNav: () => void
}

const withProductDetailNav = <P extends Product>(
  WrappedComp: React.ComponentType<P>
):React.ComponentClass<P & InjectedProps> =>
  class WithProductDetailNav extends React.Component<P & InjectedProps> {
    static contextType:React.Context<Route> = RouteContext
    context: Route

    public static displayName = `WithProductDetailNav(${WrappedComp.displayName || WrappedComp.name || 'Component'})`

    navToProductDetail = (thumbnail: string) => {
      const { code, name, shopCode, type, desc, price, slashedPrice, spec, count, beforeNav } = this.props
      return () => {
        beforeNav instanceof Function && beforeNav()

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
              price,
              slashedPrice: slashedPrice || price,
              spec,
              count,
              thumbnail,
              $$tracking: this.context
            }
          },
        })
      }
    }

    render() {
      return <WrappedComp {...this.props as P} getDetailNavigator={this.navToProductDetail} />
    }
  }

export default withProductDetailNav
