/**
 * 单张广告图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import {TouchableWithoutFeedback, View} from 'react-native'
import styles from './AdSingle.styles'
import { Native, Img } from '@utils'
import FastImage from 'react-native-fast-image'
import memorize from 'memoize-one'

const loadRatioImage = memorize((img, width) => Img.loadRatioImage(img, width))

export interface Props {
  image: string // 图片链接
  link: Native.Navigation // 跳转地址类型
}

function AdSingle({ image, link }: Props) {
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
    : { width: '100%' }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
        <FastImage
          onLayout={onImageLayout}
          style={[ styles.image, imgLayout ]}
          source={{ uri: fitImg }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

AdSingle.defaultProps = {
  customStyle: {}
}

export default AdSingle
