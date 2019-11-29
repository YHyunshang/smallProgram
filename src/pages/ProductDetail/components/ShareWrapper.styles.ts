/**
 * Created by 李华良 on 2019-11-27
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  closeArea: {
    flex: 1,
  },

  contentArea: {
    flexShrink: 0,
  },
})