/**
 * Created by 李华良 on 2019-07-22
 */
import * as React from 'react'
import { ScrollView, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Native } from '@utils'
import styles from './Swiper.styles'

interface Props {
  data: {
    imgUrl: string  // 图片地址
    link: string  // 跳转地址
    linkType: string  // 跳转地址类型
    id: string  // id
  }[]
}

interface State {
  index: number  // 当前 slider index
}

class Swiper extends React.Component<Props, State> {
  readonly state = {
    index: 0,
  }

  scrollViewRef = React.createRef()
  autoplayInterval = -1
  dragBeginOffset = { x: 0 }

  constructor(props: Props) {
    super(props)
  }

  componentDidMount(): void {
    if (this.props.data.length > 0) {
      this.scrollTo(this.state.index)
      if (this.autoplayInterval <= 0) this.autoplay()
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (this.props.data.length > 0 && prevProps.data.length === 0) {
      this.scrollTo(this.state.index)
      if (this.autoplayInterval <= 0) this.autoplay()
    }
  }

  componentWillUnmount(): void {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval)
  }

  autoplay = () => {
    this.autoplayInterval = setInterval(() => {
      const { data } = this.props
      const { index } = this.state
      this.setState(
        { index: (index + 1 >= data.length) ? 0 : index + 1},
        () => this.scrollTo(index + 1)
      )
    }, 2500)
  }

  scrollTo = (index) => {
    // @ts-ignore
    this.scrollViewRef.current.scrollTo({ x: (1 + index) * 288, animated: true })
  }

  onMomentumScrollEnd = () => {
    const {index} = this.state
    const {data} = this.props
    const sv = this.scrollViewRef.current
    if (index === 0) {
      // @ts-ignore
      sv.scrollTo({ x: 288, animated: false })
    } else if (index === data.length - 1) {
      // @ts-ignore
      sv.scrollTo({ x: data.length * 288, animated: false })
    }
  }

  onScrollBeginDrag = ({ nativeEvent }) => {
    this.dragBeginOffset = nativeEvent.contentOffset
    if (this.autoplayInterval > 0) {
      clearInterval(this.autoplayInterval)
      this.autoplayInterval = -1
    }
  }

  onScrollEndDrag = ({ nativeEvent }) => {
    const { data } = this.props
    const total = data.length
    const { contentOffset } = nativeEvent
    const indexOffset = (contentOffset.x > this.dragBeginOffset.x) ? 1 : -1
    // @ts-ignore
    this.scrollViewRef.current.scrollTo({ x: 288 * (1 + this.state.index + indexOffset), animated: true })
    this.setState(({ index }) => ({ index: (total + index + indexOffset) % total }), () => {
      this.autoplay()
    })
  }

  renderSlider = () => {
    const { data } = this.props
    const sliders = [
      ...data.slice(-1),
      ...data,
      ...data.slice(0, 2),
    ]
    return sliders.map((ele, idx) => (
      <View style={styles.slider} key={`${idx}-${ele.id}`}>
        <TouchableWithoutFeedback onPress={() => Native.navigateTo(ele.linkType, ele.link)}>
        <Image style={styles.image} source={{ uri: ele.imgUrl }} />
        </TouchableWithoutFeedback>
      </View>
    ))
  }

  renderIndicator = () => {
    const { index } = this.state

    return this.props.data
      .map((ele, idx) => (
        <View key={idx} style={[ styles.indicator, index === idx ? styles.activeIndicator : {} ]}/>
      ))
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          height={170}
          style={styles.scrollView}
          ref={this.scrollViewRef}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}
          showsHorizontalScrollIndicator={false}
        >
          {this.renderSlider()}
        </ScrollView>
        <View style={styles.indicatorBox}>
          {this.renderIndicator()}
        </View>
      </View>
    )
  }
}

export default Swiper
