/**
 * Created by 李华良 on 2019-12-13
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
  },

  strokeBar: {},

  textBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
  },
})