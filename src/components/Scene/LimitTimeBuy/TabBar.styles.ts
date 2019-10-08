/**
 * Created by 李华良 on 2019-09-29
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  tabBox: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#AAAAAA',
    paddingHorizontal: 3,
    backgroundColor: '#4A4A4A',
  },
  tabActive: {
    backgroundColor: '#38C95D',
  },
  tabTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#AAAAAA',
  },
  tabTitleActive: {
    color: theme.white,
  },
  tabStatus: {
    textAlign: 'center',
    fontSize: 12,
    color: '#AAAAAA',
  },
  tabStatusActive: {
    color: theme.white,
  },
  indicator: {
    position: 'absolute',
    top: 50,
    left: 0,
    borderTopWidth: 5,
    borderTopColor: '#38C95D',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    zIndex: 1,
  },
})