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
import { FitImg } from "@components";
import {placeholderHeadBanner} from "@const/resources";

const loadRatioImage = memorize((img, width) => Img.loadRatioImage(img, width))

export interface Props {
  image: string // 图片链接
  link: Native.Navigation // 跳转地址类型
  width?: number
  height?: number
}

function AdSingle({ image, link, width, height }: Props) {
  const fitImg = loadRatioImage(image, width)
  const [ placeholderVis, setPlaceholderVis ] = React.useState(true)
  React.useEffect(() => setPlaceholderVis(true), [fitImg])

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
        <View>
          <FitImg
            style={[ styles.image, { width, height } ]}
            source={{ uri: fitImg }}
            resizeMode="cover"
            onLoad={() => setPlaceholderVis(false)}
          />
          {(width && height && placeholderVis) && (
            <FastImage
              style={[ styles.placeholderImg, { width, height } ]}
              source={placeholderHeadBanner}
              resizeMode="cover"
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default AdSingle
