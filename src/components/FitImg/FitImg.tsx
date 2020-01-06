/**
 * Created by 李华良 on 2019-07-30
 */
import * as React from 'react'
import FastImage, { FastImageProperties } from 'react-native-fast-image'
import { LayoutChangeEvent, StyleSheet, View, Alert } from 'react-native'
import { Img } from '@utils'
import { isEqual } from 'lodash/isEqual'

export interface FitImgProps extends FastImageProperties {}

const _FitImg_: React.FunctionComponent<FitImgProps> = props => {
  const { style, ...restProps } = props

  const [width, setWidth] = React.useState(0)
  const [imgRatio, setImgRatio] = React.useState(0)

  React.useEffect(() => {
    Img.getRatio(props.source).then(setImgRatio)
    return () => {
      setImgRatio(0)
    }
  }, [props.source])

  const onLayout = (e: LayoutChangeEvent) => {
    const {
      nativeEvent: { layout },
    } = e
    if (layout.width !== width) setWidth(layout.width)
  }

  const dimStyle =
    imgRatio && width ? { width: width, height: width / imgRatio } : {}

  return (
    <View style={{ width: '100%' }} onLayout={onLayout}>
      <FastImage style={[style, dimStyle]} {...restProps} />
    </View>
  )
}

const FitImg: React.FunctionComponent<FitImgProps> = props => {
  const { style: passedStyle } = props

  const style = StyleSheet.flatten(passedStyle)
  if (style.width && style.height) {
    return <FastImage {...props} />
  } else {
    return <_FitImg_ {...props} />
  }
}

FitImg.defaultProps = {
  style: {},
}

export default React.memo(
  FitImg,
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
)
