/**
 * Created by 李华良 on 2019-07-30
 */
import * as React from 'react'
import FastImage, {FastImageProperties} from 'react-native-fast-image'
import {LayoutChangeEvent, StyleSheet, View} from "react-native";
import {Img} from "@utils";

export interface FitImgProps extends FastImageProperties {
}

const _FitImg_ : React.FunctionComponent<FitImgProps> = (props) => {
  const {
    style,
    onLayout,
    ...restProps
  } = props

  const [width, setWidth] = React.useState(0)
  const [imgRatio, setImgRatio] = React.useState(0)

  React.useEffect(() => {
    Img.getRatio(props.source)
      .then(setImgRatio)
    return () => {
      setImgRatio(0)
    }
  }, [props.source])

  const onImgLayout = (e: LayoutChangeEvent) => {
    const { nativeEvent: { layout } } = e
    if (layout.width !== width) setWidth(layout.width)
    onLayout && onLayout(e)
  }

  const dimStyle = (imgRatio && width) ? { width: width, height: width / imgRatio } : {}

  // @ts-ignore: FlexStyle does not exist in @types/react-native, but was imported by react-native-fast-image
  return <FastImage style={[ style, dimStyle ]} onLayout={onImgLayout} {...restProps} />
}

const FitImg: React.FunctionComponent<FitImgProps> = (props) => {
  const {
    style: passedStyle,
  } = props

  const style = StyleSheet.flatten(passedStyle)
  // @ts-ignore: FlexStyle does not exist in @types/react-native, but was imported by react-native-fast-image
  if (style.width && style.height) {
    return <FastImage {...props} />
  } else {
    return <_FitImg_ {...props} />
  }
}

export default FitImg
