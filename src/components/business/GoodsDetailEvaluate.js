/*
 * @Description: 商品详情评价组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-12 16:18:48
 * @LastEditors: yuwen.liu
 * @LastEditTime: 2019-08-06 17:36:54
 */
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import Icon from '../../components/Icon'
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
              {/* <View style={styles.goodsMaxBorder}></View> */}
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  wrapperItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  goodsEvalute: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    paddingRight: 12
  },
  favorableRate: {
    fontSize: 15,
    color: '#EE4239'
  },
  seeAll: {
    fontSize: 15,
    color: '#9B9B9B',
    paddingRight: 9
  },
  noEvaluation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    fontSize: 14,
    color: '#a3a09b',
    backgroundColor: '#ffffff'
  },
  noEvaluationText: {
    fontSize: 14,
    color: '#a3a09b'
  },
  goodsMaxBorder: {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#FBFBFB'
  },
  evaluteWrapper: {
    flexDirection: 'row',
    marginTop: 5
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 15,
    marginLeft: 10
  },
  evaluteInfo: {
    flexDirection: 'row'
  },
  evaluteName: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    marginRight: 5
  },
  memberIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 16,
    backgroundColor: '#383530',
    borderRadius: 8,
    color: '#F6DDA1'
  },
  memberText: {
    marginLeft: 4,
    fontSize: 11,
    color: '#F6DDA1'
  },
  evaluteTime: {
    fontSize: 12,
    color: '#848791',
    marginTop: 4
  },
  evaluteContentBlock: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 20
  },
  evaluteContent: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600'
  }
})
