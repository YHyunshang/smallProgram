/**
 * 商品图片，正方形，以容器宽度确定宽高
 * Created by 李华良 on 2019-11-05
 */
import * as React from 'react'
import {LayoutChangeEvent, View} from "react-native";
import Styles from './ProductImage.styles'
import {placeholderProduct} from "@const/resources";
import FitImg, {FitImgProps} from "@components/FitImg/FitImg";
import FastImage, {OnLoadEvent} from "react-native-fast-image";

export interface ProductImageProps extends FitImgProps {
  size?: number // 尺寸
}

const ProductImage: React.FunctionComponent<ProductImageProps> = ({ size, style, onLoad, ...restProps }) => {
  const [ isLoad, setIsLoad ] = React.useState(false)
  const [ containerSize, setContainerSize ] = React.useState(0)

  const onLayout = (e: LayoutChangeEvent) => {
    if (size) return

    const { nativeEvent: { layout } } = e
    if (containerSize !== layout.width) setContainerSize(layout.width)
  }

  const onImgLoad = (e: OnLoadEvent) => {
    setIsLoad(true)
    onLoad && onLoad(e)
  }

  console.log('rendering pI', restProps.source)

  const dimStyle = size && { width: size, height: size }

  return (
    <View style={[Styles.container, dimStyle]} onLayout={onLayout}>
      <FitImg
        style={[ style, dimStyle ]}
        onLoad={onImgLoad}
        {...restProps}
      />
      {!isLoad && (
        <FitImg
          source={placeholderProduct}
          style={[ Styles.placeholder, dimStyle ]}
        />
      )}
    </View>
  )
}

ProductImage.defaultProps = {
  resizeMode: FastImage.resizeMode.contain
}

export default ProductImage
