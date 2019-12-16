/**
 * Created by 李华良 on 2019-12-13
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  inventoryBox: {
    width: '58.4%',
    height: 50,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 20,
  },

  countdownBox: {
    height: 50,
    flexGrow: 1,
    backgroundColor: '#FFEAE8',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ltbTitle: {
    color: theme.white,
    fontSize: 14,
    paddingRight: 8,
  },

  triangleDivider: {
    borderTopColor: 'transparent',
    borderTopWidth: 25,
    borderBottomColor: 'transparent',
    borderBottomWidth: 25,
    borderRightColor: '#FFEAE8',
    borderRightWidth: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },

  countdownTitle: {
    color: '#F32E57',
    fontSize: 12,
    marginBottom: 4,
  },

  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timePad: {
    height: 22,
    minWidth: 22,
    paddingHorizontal: 2,
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePadText: {
    color: theme.white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: theme.monospacedFont,
    textAlign: 'center',
  },

  timeSeparator: {
    height: 22,
    paddingVertical: 6,
    width: 11,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeSeparatorDot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#F32E57',
  }
})