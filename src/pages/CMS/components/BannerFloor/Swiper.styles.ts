/**
 * Created by 李华良 on 2019-07-22
 */
import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    height: 180,
    position: 'relative'
  },
  scrollView: {
    position: 'absolute',
    top: -15,
    left: 0,
    width: '100%'
  },
  slider: {
    width: 288,
    height: '100%',
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 15,
    shadowColor: "rgba(0,0,0,0.12)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 9,
    elevation: 5,  // only for android
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  indicatorBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    position: 'absolute',
    top: 140,
    left: 0,
    width: '100%',
  },
  indicator: {
    width: 5,
    height: 5,
    marginHorizontal: 2.5,
    backgroundColor: '#EE4239',
    opacity: 0.302,
    borderRadius: 5,
  },
  activeIndicator: {
    width: 10,
    opacity: 1,
  },
})
