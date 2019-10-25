/**
 * 分割图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './Divider.styles'
import { Img } from '@utils'
import memorize from "memoize-one";

interface Props {
  image: string
}

const loadRatioImage = memorize((img, width) => Img.loadRatioImage(img, width))

export default function Divider({ image }: Props) {
  const fitImg = loadRatioImage(image, Img.FullWidth)

  const [ imgLayoutW, setImgLayoutW ] = React.useState(0)
  const [ imgRatio, setImgRatio ] = React.useState(-1)
  React.useEffect(() => {
    Img.getRatio({ uri: fitImg })
      .then(ratio => setImgRatio(ratio))
    return () => setImgRatio(-1)
  }, [ fitImg ])
  const onImageLayout = e => {
    const { width } = e.nativeEvent.layout
    if (width !== imgLayoutW) setImgLayoutW(width)
  }

  const imgLayout = (imgLayoutW && imgRatio)
    ? { width: '100%', height: imgLayoutW / imgRatio }
    : { width: '100%', }

  return (
    <View style={styles.container}>
      <FastImage
        style={imgLayout}
        onLayout={onImageLayout}
        source={{ uri: fitImg }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  )
}
