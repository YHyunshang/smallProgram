/**
 * Created by 李华良 on 2019-12-10
 */
import * as React from 'react'
import History, {Route} from "@utils/history";

interface InjectedProps {
}

const withHistory = (route: Route): (<P extends object>(WrappedComp: React.ComponentType<P>) => React.FunctionComponent<P>) =>
  <P extends object>(WrappedComp: React.ComponentType<P>) => {
  const HOC: React.FunctionComponent<P & InjectedProps> = (props) => {
    React.useEffect(() => {
      // 路由入栈
      History.push(route)

      return History.pop
    })

    return <WrappedComp {...props as P} />
  }

  HOC.displayName = `withHistory(${WrappedComp.displayName || WrappedComp.name || 'Component'})`

  return HOC
}

export default withHistory