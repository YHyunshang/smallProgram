/**
 * 1v1 广告图
 * Created by 李华良 on 2019-08-21
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View, Image } from 'react-native'
import { Native, Img } from '@utils'
import styles from './Ad1v1.styles'

interface Props {
  data: {
    image: string
    link: {}
  }[]
}

export default function Ad1v1({ data }: Props) {
  const imgLst = data.slice(0, 2)
  const [imgDim, setImgDim] = React.useState({ width: 0, height: 0 })

  const onImgBoxLayout = ({ nativeEvent }) => setImgDim(nativeEvent.layout)

  return (
    <View style={styles.container}>
      {imgLst.map(({ image, link }, index) => {
        const fitImg = Img.loadRatioImage(image, Img.FullWidth / 2)
        return (
          <View
            style={[styles.imgBoxL, styles.imgBoxR][index]}
            key={index}
            onLayout={onImgBoxLayout}
          >
            <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
              <Image
                source={{ uri: fitImg }}
                style={[styles.imgL, styles.imgR][index]}
                resizeMode="cover"
              />
            </TouchableWithoutFeedback>
          </View>
        )
      })}
    </View>
  )
}
