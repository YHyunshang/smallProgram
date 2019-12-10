/**
 * Created by 李华良 on 2019-12-02
 */
import * as React from 'react'
import {Native} from "@utils";
import {Product} from "@common/typings";

interface InjectedProps extends Product {
  getDetailNavigator: (thumbnail: string) => () => void
}

const withProductDetailNav = <P extends object>(
  WrappedComp: React.ComponentType<P>
):React.ComponentClass<P & InjectedProps> =>
  class WithProductDetailNav extends React.Component<P & InjectedProps> {
    public static displayName = `WithProductDetailNav(${WrappedComp.displayName || WrappedComp.name || 'Component'})`

    navToProductDetail = (thumbnail: string) => {
      const { code, name, shopCode, type, desc, price, slashedPrice, spec, count } = this.props
      return () => {
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
