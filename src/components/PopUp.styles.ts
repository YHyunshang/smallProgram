/**
 * Created by 李华良 on 2019-11-27
 */
import {StyleSheet} from "react-native";
import theme from '@theme'
import {WindowWidth} from "@utils/global";
import {isiPhoneX} from "@utils/native";

export default StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    position: 'absolute',
    top: 0,
    width: WindowWidth,
  },
  safeArea: {
    paddingBottom: isiPhoneX ? 34 : 0
  },

  header: {
    height: 50,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  body: {},

  textTitle: {
    fontSize: 16,
    color: theme.black,
    textAlign: 'center',
  },

  btnClose: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iconClose: {
    width: 21,
    height: 21,
  },
})