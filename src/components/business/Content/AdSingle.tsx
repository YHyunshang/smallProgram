/**
 * 单张广告图
 * Created by 李华良 on 2019-07-12
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import styles from './AdSingle.styles'
import { Native, Img } from '@utils'
import FastImage from 'react-native-fast-image'
import memorize from 'memoize-one'
import { FitImg } from '@components'
import { placeholderHeadBanner } from '@const/resources'
import { WindowWidth } from '@utils/global'

const loadRatioImage = memorize((img, width) => Img.loadRatioImage(img, width))

export interface Props {
  image: string // 图片链接
  link: Native.Navigation // 跳转地址类型
  width?: number
  height?: number
}

const AdSingle: React.FunctionComponent<Props> = ({
  image,
  link,
  width,
  height,
}) => {
  const fitImg = loadRatioImage(image, width || WindowWidth)
  const hasPlaceholder: boolean = width > 0 && height > 0
  const [placeholderVis, setPlaceholderVis] = React.useState(true)
  React.useEffect(() => setPlaceholderVis(true), [fitImg])

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
        <View>
          <FitImg
            style={[styles.image, { width, height }]}
            source={{ uri: fitImg }}
            resizeMode="contain"
            onLoad={() => setPlaceholderVis(false)}
          />
          {hasPlaceholder && placeholderVis && (
            <FastImage
              style={[styles.placeholderImg, { width, height }]}
              source={placeholderHeadBanner}
              resizeMode="contain"
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default AdSingle
