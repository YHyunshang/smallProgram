import { StyleSheet } from 'react-native'
import {Global} from "@utils";

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  bgImg: {
    width: '100%',
    height: Global.WindowWidth * 264 / 375,
    paddingBottom: 56,
  },
  swiper: {
    position: 'absolute',
    bottom: 0,
    left: 7,
    right: 7,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowRadius: 11,
  },
})
