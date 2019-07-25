/**
 * Created by 李华良 on 2019-07-11
 */
import React from 'react'
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native'
import BannerFloor from './components/BannerFloor'
import BoxFloor from './components/BoxFloor'
import Icon from './components/Icon'

interface State {
  floorData: array<object>  // cms 数据
}

class App extends React.Component<object, State> {
  constructor(props) {
    super(props)

    this.state = {
      floorData: [{
        type: 'banner',
        data: [
          { image: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_1.jpg', url: '' },
          { image: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_2.jpg', url: '' },
          { image: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_3.jpg', url: '' },
          { image: 'https://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/banner_4.jpg', url: '' },
        ]
      }, {
        type: 'box',
        data: [
          { image: 'http://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/box_1.jpg', title: '夏凉馆', url: '' },
          { image: 'http://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/box_2.jpg', title: '种草馆', url: '' },
          { image: 'http://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/box_3.jpg', title: '名酒馆', url: '' },
          { image: 'http://static-yh.yonghui.cn/front/wxapp-fresh-delivery/imgs/home/box_4.jpg', title: '辉字号', url: '' },
        ]
      }, ]
    }
  }

  renderFloors = data => data.map(({ type, data }, idx) =>
    type === 'banner' ? <BannerFloor data={data} key={idx} />
      : type === 'box' ? <BoxFloor data={data} key={idx} />
      : null
  )

  render() {
    const { floorData } = this.state
    const floorComp = this.renderFloors(floorData)

    return (
      <ScrollView style={styles.wrapper}>
        {floorComp}
        {/*<Text style={styles.icon}>&#xe65b;</Text>*/}
        <Icon name="cart" />
        {/*<Icon name="ios-person" size={30} color="#4F8EF7" />*/}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  icon: {
    // fontFamily: 'iconfont'
  }
})

export default App
