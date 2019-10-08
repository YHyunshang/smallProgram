/**
 * Created by 李华良 on 2019-09-29
 */
import {Platform, StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    paddingRight: 6
  },
  colon: {
    width: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  timerText: {
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'monospace',
    width: 20,
    lineHeight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: theme.white,
    backgroundColor: theme.black,
    borderRadius: 1,
    overflow: 'hidden',
  },
  timerTextMillisecond: {
    backgroundColor: '#999'
  }
})