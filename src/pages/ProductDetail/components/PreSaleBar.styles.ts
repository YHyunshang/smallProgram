/**
 * Created by 李华良 on 2019-11-25
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#3A3649',
  },
  frontBg: {
    height: 50,
    width: '53.47%',
    flexDirection: 'row'
  },
  linearBox: {
    flex: 1,
  },
  blockImg: {
    width: 56,
    height: 50,
    flexShrink: 0,
  },
  contentBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  textBox: {
    flex: 1,
    flexShrink: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBoxFirst: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  pricePrefix: {
    color: theme.white,
    fontSize: 12,
    fontFamily: theme.priceFFPrimary,
    alignSelf: 'flex-end',
    textAlignVertical: 'bottom',
    paddingBottom: 3,
  },
  price: {
    color: theme.white,
    fontSize: 28,
    fontFamily: theme.priceFFPrimary,
  },

  statusIcon: {
    width: 24,
    height: 24,
    marginRight: 11,
  },
  statusText: {
    color: theme.white,
    fontSize: 16,
  },

  processingText: {
    fontSize: 12,
    color: theme.white,
    marginRight: -2,
  },

  timerPadBox: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  timerPadText: {
    fontSize: 14,
    fontFamily: theme.monospacedFont,
    fontWeight: '600',
    color: theme.white,
    textAlign: 'center',
  },

  timerSeparatorBox: {
    width: 11,
    height: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  timerSeparatorDot: {
    width: 3,
    height: 3,
    backgroundColor: '#9796FC',
    borderRadius: 3,
  },
})