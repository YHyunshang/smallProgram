/**
 * Created by 李华良 on 2019-07-22
 */
import * as React from "react"
import { ScrollView, View, Image, TouchableWithoutFeedback } from "react-native"
import { Native, Log } from "@utils"
import styles from "./Swiper.styles"

interface Props {
  sliderWidth: number // slider 宽
  data: {
    imgUrl: string // 图片地址
    link: string // 跳转地址
    linkType: string // 跳转地址类型
    id: string // id
  }[]
}

interface State {
  index: number // 当前 slider index
}

class Swiper extends React.Component<Props, State> {
  static defaultProps = {
    sliderWidth: 288,
  }

  readonly state = {
    index: 0,
  }

  scrollViewRef = React.createRef<ScrollView>()
  autoplayInterval = -1
  dragBeginOffset = { x: 0 }

  constructor(props: Props) {
    super(props)
  }

  componentDidMount(): void {
    if (this.props.data.length > 0) {
      // todo: 优化点，setTimeout 不一定是一个好的方法，可以考虑 scrollView 的 onLayout
      setTimeout(() => this.scrollTo(this.state.index), 0)
      if (this.autoplayInterval <= 0) this.autoplay()
    }
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (this.props.data.length > 0 && prevProps.data.length === 0) {
      this.scrollTo(this.state.index)
      if (this.autoplayInterval <= 0) this.autoplay()
    }
  }

  componentWillUnmount(): void {
    if (this.autoplayInterval > 0) clearInterval(this.autoplayInterval)
  }

  autoplay = () => {
    this.autoplayInterval = setInterval(() => {
      const { data } = this.props
      const { index } = this.state
      this.setState({ index: index + 1 >= data.length ? 0 : index + 1 }, () =>
        this.scrollTo(index + 1)
      )
    }, 2500)
  }

  scrollTo = index => {
    Log.debug("scroll to", index)
    const { sliderWidth } = this.props
    this.scrollViewRef.current.scrollTo({
      x: (1 + index) * sliderWidth,
      animated: true,
    })
  }

  onMomentumScrollEnd = () => {
    const { index } = this.state
    const { data, sliderWidth } = this.props
    const sv = this.scrollViewRef.current
    if (index === 0) {
      sv.scrollTo({ x: sliderWidth, animated: false })
    } else if (index === data.length - 1) {
      sv.scrollTo({ x: data.length * sliderWidth, animated: false })
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
    const { data, sliderWidth } = this.props
    const total = data.length
    const { contentOffset } = nativeEvent
    const indexOffset = contentOffset.x > this.dragBeginOffset.x ? 1 : -1
    this.scrollViewRef.current.scrollTo({
      x: sliderWidth * (1 + this.state.index + indexOffset),
      animated: true,
    })
    this.setState(
      ({ index }) => ({ index: (total + index + indexOffset) % total }),
      () => {
        this.autoplay()
      }
    )
  }

  renderSlider = () => {
    const { data } = this.props
    const sliders = [...data.slice(-1), ...data, ...data.slice(0, 2)]
    return sliders.map((ele, idx) => (
      <View style={styles.slider} key={`${idx}-${ele.id}`}>
        <TouchableWithoutFeedback
          onPress={() => Native.navigateTo(ele.linkType, ele.link)}
        >
          <Image style={styles.image} source={{ uri: ele.imgUrl }} />
        </TouchableWithoutFeedback>
      </View>
    ))
  }

  renderIndicator = () => {
    const { index } = this.state

    return this.props.data.map((ele, idx) => (
      <View
        key={idx}
        style={[styles.indicator, index === idx ? styles.activeIndicator : {}]}
      />
    ))
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          style={styles.scrollView}
          ref={this.scrollViewRef}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}
          showsHorizontalScrollIndicator={false}
        >
          {this.renderSlider()}
        </ScrollView>
        <View style={styles.indicatorBox}>{this.renderIndicator()}</View>
      </View>
    )
  }
}

export default Swiper
