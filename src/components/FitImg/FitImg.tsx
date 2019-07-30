/**
 * Created by 李华良 on 2019-07-30
 */
import * as React from 'react'
import { View, Image } from 'react-native'
import styles from './FitImg.styles'

interface Props {
  imageProps: any
}

export default class FitImg extends React.Component<Props, any> {
  constructor(props) {
    super(props)
  }

  state = {
    containerWidth: 0
  }

  onLayout = ({ nativeEvent: { layout } }) => {
    this.setState({ containerWidth: layout.width })
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const { imageProps: { style, ...resetImgProps } } = this.props
    const { containerWidth } = this.state

    const imgProps = {
      ...resetImgProps,
      style: {
        ...style,
        width: containerWidth,
        height: containerWidth,
      }
    }

    console.log(containerWidth)

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <Image {...imgProps} />
      </View>
    )
  }
}