/**
 * Created by 李华良 on 2019-12-02
 */
import * as React from 'react'

interface InjectedProps {
  initialData: string
}

const withInitialData = <P extends object>(
  WrappedComp: React.ComponentType<P>
): React.FunctionComponent<P> => {
  const HOC: React.FunctionComponent<P & InjectedProps> = ({initialData: initialDataStr, ...restProps}) => {
    let initialData = {}
    try {
      initialData = JSON.parse(initialDataStr)
    } catch (e) {
      console.error('parse initial data failed', e)
    }
    return <WrappedComp initialData={initialData} {...restProps as P} />
  }

  HOC.displayName = `withInitialData(${WrappedComp.displayName || WrappedComp.name || 'Component'})`

  return HOC
}

export default withInitialData