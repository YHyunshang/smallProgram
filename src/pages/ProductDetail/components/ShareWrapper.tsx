/**
 * Created by 李华良 on 2019-11-27
 */
import * as React from 'react'
import {Animated, Easing, TouchableWithoutFeedback, View} from "react-native";
import styles from './ShareWrapper.styles'
import ShareChannelSelector from "@components/business/ShareChannelSelector";
import {ShareChannel} from "@common/typings";
import Poster from "./Poster";
import { shareToWxFriends } from '@services/goodsDetail'
import Wrapper from "@components/Wrapper";
import {track} from "@utils/tracking";

interface ProductInfo {
  code: string
  name: string
  desc: string
  thumbnail: string
  storeCode: string
}

export interface ShareWrapperProps {
  visible: boolean
  product: ProductInfo
  poster: string
  onClose: () => void
  afterVisibleAnimation?: (visible: boolean) => void
}

const ShareWrapper: React.FunctionComponent<ShareWrapperProps> =
  ({ visible, product, poster, onClose, afterVisibleAnimation}) => {
  const [ channelSelectorVis, setChannelSelectorVis ] = React.useState(false)
  const [ posterVis, setPosterVis ] = React.useState(false)

  React.useEffect(() => {
    visible && setChannelSelectorVis(true)
  }, [ visible ])

  const onChannelSelected = (channel: ShareChannel) => {
    switch (channel) {
      case ShareChannel.WeChatFriends:
        track('ShareChanel', { Share_Chanel: '微信好友', page_type: '商详页' })
        shareToWxFriends({
          name: product.name,
          code: product.code,
          storeCode: product.storeCode,
          thumbnail: product.thumbnail,
          desc: product.desc,
        })
        break
      case ShareChannel.Poster:
      default:
        track('ShareChanel', { Share_Chanel: '分享海报', page_type: '商详页' })
        setChannelSelectorVis(false)
        setPosterVis(true)
        break
    }
  }

  const onWrapperClose = () => {
    setChannelSelectorVis(true)
    setPosterVis(false)
    onClose()
  }

  return (
    <Wrapper visible={visible} onClose={onWrapperClose} afterVisibleAnimation={afterVisibleAnimation}>
      <ShareChannelSelector visible={channelSelectorVis} onSelect={onChannelSelected} onClose={onWrapperClose} />
      <Poster visible={posterVis} onClose={onWrapperClose} image={poster} />
    </Wrapper>
  )
}

export default ShareWrapper

