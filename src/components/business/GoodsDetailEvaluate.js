/*
 * @Description: 商品详情评价组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-07 14:08:42
 */
import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import Icon from '../../components/Icon'
import styles from './GoodsDetailEvaluate.styles'
import {formatYMDEn} from '../../utils/FormatUtil'
export default class GoodsDetailEvaluate extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  seeAll() {
    const {jumpToEvaluteList} = this.props
    if (jumpToEvaluteList) {
      jumpToEvaluteList()
    }
  }

  render() {
    const {evaluation, favorableRate} = this.props
    return (
      <View>
        {
          evaluation.id ?
            <View>
              <View style={styles.wrapper}>
                <View style={styles.wrapperItem}>
                  { evaluation.totalNum ?
                    <Text style={styles.goodsEvalute}>商品评价({evaluation.totalNum})</Text>
                    : <Text></Text>
                  }
                  { favorableRate ?
                    <Text style={styles.favorableRate}>好评度{favorableRate}%</Text>
                    : <Text></Text>
                  }
                </View>
                <TouchableOpacity onPress={() => {
                  this.seeAll()
                }} >
                  <View style={styles.wrapperItem}>
                    <Text style={styles.seeAll}>查看全部</Text>
                    <Icon name='right' size={10} color="#9B9B9B" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.evaluteWrapper}>
                <Image style={styles.image} source={{uri: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/default-portrait.png'}} resizeMode="cover"/>
                <View>
                  <View style={styles.evaluteInfo}>
                    <Text style={styles.evaluteName}>{evaluation.nickName}</Text>
                    <View style={styles.memberIcon}>
                      <Icon name='member' size={10} color="#F6DDA1" />
                      <Text style={styles.memberText}>超级会员</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.evaluteTime}>{formatYMDEn(evaluation.evaluateTime)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.evaluteContentBlock}>
                <Text style={styles.evaluteContent}>{evaluation.evaluateContext}</Text>
              </View>
            </View>
            :
            <View>
              <View style={styles.noEvaluation}>
                <Text style={styles.noEvaluationText}>暂无评价</Text>
              </View>
            </View>
        }
      </View>
    )
  }
}
