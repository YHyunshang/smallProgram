/**
 * Created by 李华良 on 2019-11-26
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 18.5,
    color: theme.gray1,
  },
  tabTextActive: {
    color: '#4D4D4D',
    fontWeight: '600',
  },
  shareContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  btnShare: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconShare: {
    width: 24,
    height: 24,
  }
})