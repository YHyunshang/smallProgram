/**
 * 1v1 广告图
 * Created by 李华良 on 2019-08-21
 */
import * as React from 'react'
import { TouchableWithoutFeedback, View, Image } from 'react-native'
import { Native } from '@utils'
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
      {imgLst.map(({ image, link }, index) => (
        <View
          style={[styles.imgBoxL, styles.imgBoxR][index]}
          key={index}
          onLayout={onImgBoxLayout}
        >
          <TouchableWithoutFeedback onPress={() => Native.navigateTo(link)}>
            <Image
              source={{ uri: image }}
              style={{
                width: imgDim.width,
                height: imgDim.height,
                borderRadius: 5,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
      ))}
    </View>
  )
}
