/**
 * Created by 李华良 on 2019-07-22
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Image } from 'react-native'
import styles from './Swiper.styles'

interface Props {
  data: Array<object>
}

class Swiper extends React.Component<Props> {
  readonly state = {
    index: 0,
  }

  scrollView = React.createRef()

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.autoplay()
    window.scrollView = this.scrollView
  }

  autoplay = () => {
    setInterval(() => {
      const { index } = this.state
      const { data } = this.props
      if (index + 1 >= data.length) {
        this.setState({ index: 0 })
        // this.scrollView.current.scrollTo({ x: (1 + data.length) * 288, animated: true })
        // setTimeout(() => this.scrollView.current.scrollTo({ x: 1 * 288, animated: false }), 0)
      } else {
        this.setState({ index: index + 1})
        this.scrollTo(index + 1)
      }
    }, 2500)
  }

  scrollTo = (index) => {
    const { data } = this.props
    // this.scrollView.current.scrollTo({ x: (1 + index) * 288, animated: true })
  }

  renderSlider = () => {
    const {
      data,
    } = this.props
    const sliders = [
      ...data.slice(-1),
      ...data,
      ...data.slice(0, 2),
    ]
    return sliders.map((ele, idx) => (
      <View style={styles.slider} key={idx}>
        <Image style={styles.image} source={{ uri: ele.imgUrl }} />
      </View>
    ))
  }

  render() {
    return (
      <ScrollView
        horizontal
        height={140}
        style={styles.constructor}
        ref={this.scrollView}
      >
        {this.renderSlider()}
      </ScrollView>
    )
  }
}

export default Swiper
