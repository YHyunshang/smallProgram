
/*
 * @Descripttion: 1元新人礼包广告图
 * @Author: yuwen.liu
 * @Date: 2019-10-15 16:53:39
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-10-21 20:30:09
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
      //this.getNewPersonBanner()
    }
    componentWillReceiveProps(nextProps) {
       this.getNewPersonBanner()
    }
    /**
     * @msg: 判断是否为新人身份，并展示首页新人礼包banner图
     */
    getNewPersonBanner(){
      CMSServices.getNewPersonBanner().then(
        ({result = {},message}) => {    
          if(result){//是新人身份
            this.setState({bannerUrl:result.bannerUrl,newcomerFlag:result.newcomerFlag} )
          }
          else{//不是新人身份
            this.setState({bannerUrl:'',newcomerFlag:false} )
          }
        }
      )
      .catch(({message})=>{
        Native.showToast(message,'0')
        this.setState({bannerUrl:'',newcomerFlag:false} )
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
