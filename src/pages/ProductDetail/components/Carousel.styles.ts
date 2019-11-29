/**
 * Created by 李华良 on 2019-11-26
 */
import {StyleSheet} from "react-native";
import theme from '@theme'
import {Global} from "@utils";

const FullWidth = Global.WindowWidth

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.10)'
  },
  activeDot: {
    backgroundColor: theme.primary,
  },
  paginationStyle: {
    bottom: 10,
  },
  image: {
    width: FullWidth,
    height: FullWidth,
  },

  defaultImage: {
    width: FullWidth,
    height: FullWidth,
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
})