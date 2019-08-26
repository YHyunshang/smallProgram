/**
 * @format
 */
import { AppRegistry } from 'react-native'
import Home from './src/pages/Home'
import Root from './src/Root'
import HotSaleBoard from './src/pages/HotSaleBoard'
import Found from './src/pages/Found'
import Activity from './src/pages/Activity'

AppRegistry.registerComponent('RNProductDetail', () => Root)
AppRegistry.registerComponent('RNHome', () => Home)
AppRegistry.registerComponent('RNFound', () => Found)
AppRegistry.registerComponent('RNActivity', () => Activity)
AppRegistry.registerComponent('RNHotSaleBoard', () => HotSaleBoard)
