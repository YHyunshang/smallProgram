/**
 * 分享弹窗
 * 支持 微信好友、微信朋友圈
 * Created by 李华良 on 2019-11-27
 */
import * as React from 'react'
import {ShareChannel} from "@common/typings";
import {Text, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import {wechatFriend, iconWeChatMoment} from "@const/resources";
import {PopUp} from "@components";
import styles from './ShareChannelSelector.styles'

export interface ShareChannelSelectorProps {
  visible: boolean  // 展示/隐藏
  onClose: () => void  // 关闭回调
  onSelect: (channel: ShareChannel) => void  // 选择分享渠道回调
}

const ShareChannelSelector: React.FunctionComponent<ShareChannelSelectorProps> = ({ visible, onClose, onSelect }) => {
  return (
    <PopUp visible={visible} title="分享至" onClose={onClose} autoSafeArea={false}>
      <View style={styles.channelBox}>
        <TouchableOpacity onPress={() => onSelect(ShareChannel.WeChatFriends)}>
          <View style={styles.channelItem}>
            <FastImage style={styles.channelIcon} source={wechatFriend} />
            <Text style={styles.channelText}>微信好友</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelect(ShareChannel.Poster)}>
          <View style={styles.channelItem}>
            <FastImage style={styles.channelIcon} source={iconWeChatMoment} />
            <Text style={styles.channelText}>朋友圈</Text>
          </View>
        </TouchableOpacity>
      </View>
    </PopUp>
  )
}

export default ShareChannelSelector
