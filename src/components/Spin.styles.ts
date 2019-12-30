/**
 * Created by 李华良 on 2019-12-17
 */
import theme from '@theme'
import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },

  img: {
    width: 24,
    height: 24,
  },

  text: {
    marginTop: 15,
    fontSize: 12,
    color: theme.primary,
    lineHeight: 20,
  }
})