/*
 * @Descripttion: 1元新人礼包广告图
 * @Author: yuwen.liu
 * @Date: 2019-10-15 16:53:39
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-16 14:36:04
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View, Dimensions } from 'react-native'
import FitImage from 'react-native-fit-image'
import styles from './NewPersonGiftAdSingle.styles'
import { Native, Img } from '@utils'
import { CMSServices } from '@services'
interface State {
    bannerUrl: string
    newcomerFlag: boolean
}
export default class NewPersonGiftAdSingle extends React.Component<State>  {
    constructor(props) {
      super(props)
    }
    state = {
      //http://static-yh.yonghui.cn/app/assets/xszt-RN/new-person-giftpackage.png
      bannerUrl: '',
      newcomerFlag: false
    }
    componentDidMount() {
      CMSServices.getNewPersonBanner().then(
        ({result = {}}) => {    
          if(result){
            this.setState({bannerUrl:result.bannerUrl,newcomerFlag:result.newcomerFlag} )
          }
        }
      )
      .catch(error=>{
        Native.showToast(error,'0')
      })
    }

    render() {
      const {bannerUrl,newcomerFlag}=this.state
      const fitImg = Img.loadRatioImage(bannerUrl, Img.FullWidth)
        return (
          newcomerFlag && (
            <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Native.jumpToNativeDialog('showPromotionProductListDialog','')}>
              <FitImage
                style={styles.image}
                source={{ uri: fitImg }}
                resizeMode="cover"
                indicator={false}
              />
            </TouchableWithoutFeedback>
          </View>
          )
        )
    }
}
