/*
 * @Description: 预约门店弹窗组件
 * @Company: yh
 * @Author: yuwen.liu
 * @Date: 2019-07-15 14:02:19
 * @LastEditors  : yuwen.liu
 * @LastEditTime : 2020-01-14 17:13:36
 */
import {Native} from '@utils'
import {noStore} from '@const/resources'
import * as React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonModal from '../../common/CommonModal'
import {StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'

interface Props {
  storeList: {
    cityName: string
    resActivityStoreVOList:{
      storeName: string
    }[]
  }[] // 门店列表
}

interface State {
  show: boolean // 是否展示
  storeList: {
    cityName: string
    resActivityStoreVOList:{
      storeName: string
    }[]
  }[] // 门店列表
}

/**
 * 弹出层
 */
export default class StoreModal extends React.Component<Props, State> {
  commonModalRef: React.RefObject<any>
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      storeList: []
    }
    this.commonModalRef = React.createRef()
  }
  /**
  * @description: 显示弹层
  */
  showModal() {
    this.commonModalRef.current.show()
  }
  /**
* @description: 隐藏弹层
*/
  handleCloseModal() {
    this.commonModalRef.current.hide()
    Native.setNavigationBarEventSwitch('navigationBarEventSwitch', JSON.stringify({swithTag: '1'}))
  }
  render() {
    const {storeList} = this.props
    // 预约门店列表
    const storeListWrapper = storeList && storeList.length > 0 ? storeList.map((item, cityIndex) => (
      <View key={cityIndex}>
        <Text style={styles.cityText}>{item.cityName}</Text>
        <View style={styles.cityText}>
          {
            item.resActivityStoreVOList && item.resActivityStoreVOList.length > 0 && item.resActivityStoreVOList.map((storeItem, storeIndex) => (
              <Text key={storeIndex} style={styles.addressText}>{storeItem.storeName}</Text>
            ))
          }
        </View>
      </View>
    )) : <View style={styles.noStoreWrapper}>
      <Image style={styles.noStoreImage} source={noStore} resizeMode="contain"/>
      <Text style={styles.noStoteText}>暂无可预约门店</Text>
      <Text style={styles.seeOtherText}>看看其他的吧</Text>
    </View>
    return (
      <CommonModal ref={this.commonModalRef} modalBoxHeight={424} modalBoxWidth={325}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.storeList}>
            {storeListWrapper}
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => {
            this.handleCloseModal()
          }} >
          <LinearGradient
            style={[styles.knowButton]}
            colors={['#C1882C', '#E5B655']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            <Text style={styles.knowText}>好的</Text>
          </LinearGradient>
        </TouchableOpacity>
      </CommonModal>
    )
  }
}

const styles = StyleSheet.create({
  storeList: {
    marginTop: 40,
    marginLeft: 25,
    backgroundColor: '#fff'
  },
  cityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4D4D4D',
    marginBottom: 12
  },
  addressText: {
    fontSize: 15,
    color: '#808080',
    paddingBottom: 15
  },
  knowButton: {
    width: 275,
    height: 40,
    borderRadius: 2,
    marginBottom: 30,
    marginLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  knowText: {
    fontSize: 17,
    color: '#FFFFFF'
  },
  noStoreWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noStoreImage: {
    width: 150,
    height: 150,
    marginTop: 30
  },
  noStoteText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4A4A4A'
  },
  seeOtherText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    color: '#A4A4B4'
  }
})
