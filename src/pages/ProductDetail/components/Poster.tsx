/**
 * Created by 李华良 on 2019-11-27
 */
import * as React from 'react'
import { PopUp } from '@components'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Poster.styles'
import FastImage from 'react-native-fast-image'
import { download } from '@utils/img'
import { showToast } from '@utils/native'
import Spin from '@components/Spin'

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
    download(image).then(
      data => {
        showToast('图片保存成功', '1')
        onClose instanceof Function && setTimeout(onClose, 500)
      },
      () => showToast('图片保存失败，请授权永辉买菜访问您的相册', '0')
    )

  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => setLoading(true), [image])
  const onImgLoadEnd = () => setLoading(false)
  const onImgLoadError = () =>
    !!image && showToast('Ops，海报被海豹吞了！', '0')

  return (
    <PopUp visible={visible} title="保存至相册" onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.posterBox}>
          {(!image || loading) && <Spin>图片加载中...</Spin>}
          <FastImage
            style={styles.poster}
            source={{ uri: image }}
            onLoadEnd={onImgLoadEnd}
            onError={onImgLoadError}
          />
        </View>
        <TouchableOpacity disabled={!image} onPress={saveImg}>
          <View style={styles.btnSave}>
            <Text style={styles.btnText}>保存图片</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.tips}>
          保存图片到手机相册后，将图片分享到您的圈子
        </Text>
      </View>
    </PopUp>
  )
}

export default Poster
