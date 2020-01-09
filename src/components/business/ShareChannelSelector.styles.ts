/**
 * Created by 李华良 on 2019-11-27
 */
import {StyleSheet} from "react-native";
import theme from "@theme";

export default StyleSheet.create({
  container: {},

  channelBox: {
    paddingTop: 30,
    paddingBottom: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelItem: {
    width: 100,
    height: 100,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelIcon: {
    width: 44,
    height: 44,
    marginBottom: 18,
  },
  channelText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.black,
  },
})