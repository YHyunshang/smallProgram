/**
 * Created by 李华良 on 2019-11-11
 */
import * as React from 'react'

interface InjectedProps {
  initialData: string
}

export default <P extends object>(
  ProductComponent: React.ComponentType<P>
): React.FunctionComponent<P & InjectedProps> =>
  ({initialData, ...restProps}: InjectedProps) => {
    console.log('initialData:', initialData)
    let productBriefInfo = {}
    try {
      productBriefInfo = JSON.parse(initialData)
    } catch (e) {
      console.warn(`initial data parse failed: not json string: "${initialData}"`)
    }
    return <ProductComponent initialData={productBriefInfo} {...restProps as P} />
  }