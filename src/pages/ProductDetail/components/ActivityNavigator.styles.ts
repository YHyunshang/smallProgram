/**
 * Created by 李华良 on 2019-12-26
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 12,
  },

  tagBox: {
    height: 18,
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 2,
    overflow: 'hidden',
  },
  tagText: {
    color: theme.white,
    fontSize: 10,
    flexShrink: 0,
  },

  title: {
    color: '#4D4D4D',
    fontSize: 14,
    marginHorizontal: 5,
    flex: 1
  },

  icon: {
    width: 12,
    height: 12,
    flexShrink: 0,
  },
})