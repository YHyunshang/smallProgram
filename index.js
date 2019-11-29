/*
 * @Description:
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-08-26 09:41:18
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-11-26 10:45:46
 */
import { AppRegistry, Text } from 'react-native'
import Home from './src/pages/Home'
import ProductDetailPage from './src/pages/ProductDetail/ProductDetailPage'
import HotSaleBoard from './src/pages/HotSaleBoard'
import Found from './src/pages/Found'
import Activity from './src/pages/Activity'
import HelpFeedBackQuestion from './src/pages/HelpFeedBack/HelpFeedBackQuestion'
import HelpFeedBackAnswer from './src/pages/HelpFeedBack/HelpFeedBackAnswer'
import LimitTimeBuy from './src/pages/LimitTimeBuy'
import PreviewPurchase from './src/pages/MouTai/PreviewPurchase'
import QualificationsQuery from './src/pages/MouTai/QualificationsQuery'

// 隐藏 RN yellowBox warning 提示
console.disableYellowBox = true

// 默认字体不随系统设置变化
// TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {defaultProps: false})
Text.defaultProps = Object.assign({}, Text.defaultProps, {allowFontScaling: false})

AppRegistry.registerComponent('RNProductDetail', () => ProductDetailPage)
AppRegistry.registerComponent('RNHome', () => Home)
AppRegistry.registerComponent('RNFound', () => Found)
AppRegistry.registerComponent('RNActivity', () => Activity)
AppRegistry.registerComponent('RNHotSaleBoard', () => HotSaleBoard)
AppRegistry.registerComponent('RNHelpFeedBackQuestion', () => HelpFeedBackQuestion)
AppRegistry.registerComponent('RNHelpFeedBackAnswer', () => HelpFeedBackAnswer)
AppRegistry.registerComponent('LimitTimeBuy', () => LimitTimeBuy)
AppRegistry.registerComponent('RNPreviewPurchase', () => PreviewPurchase)
AppRegistry.registerComponent('RNQualificationQuery', () => QualificationsQuery)
