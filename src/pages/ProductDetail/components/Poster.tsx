/**
 * Created by 李华良 on 2019-11-27
 */
import * as React from 'react'
import { PopUp } from '@components'
import { View, Text } from 'react-native'
import styles from './Poster.styles'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { download } from '@utils/img'
import { showToast } from '@utils/native'

export interface PosterProps {
  visible: boolean
  onClose: () => void
  image: string
}

const Poster: React.FunctionComponent<PosterProps> = ({
  visible,
  image,
  onClose,
}) => {
  const saveImg = () =>
    download(image).then(() => {
      showToast('图片保存成功', '1')
      onClose instanceof Function && setTimeout(onClose, 500)
    })

  return (
    <PopUp visible={visible} title="保存至相册" onClose={onClose}>
      <View style={styles.container}>
        <FastImage style={styles.poster} source={{ uri: image }} />
        <TouchableOpacity disabled={!image} onPress={saveImg}>
          <View style={styles.btnSave}>
            <Text style={styles.btnText}>保存图片</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.tips}>
          保存到手机相册后，将图片分享到您的朋友圈
        </Text>
      </View>
    </PopUp>
  )
}

export default Poster
