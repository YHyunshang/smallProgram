/**
 * Created by 李华良 on 2019-11-26
 */
import {StyleSheet} from "react-native";
import {isiOS, isiPhoneX} from "@utils/native";
import {WindowHeight} from "@utils/global";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    height: WindowHeight - (50 + (isiPhoneX ? 34 : 0)),
    overflow: 'hidden',
  },
  header: {  // safe area
    paddingTop: isiPhoneX ? 42 : isiOS ? 30 : 0,
  },
  body: {
    flex: 1,
    backgroundColor: theme.generalPageBG,
  },
})