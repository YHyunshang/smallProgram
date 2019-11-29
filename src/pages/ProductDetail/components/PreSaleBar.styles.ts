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
    paddingLeft: 10,
  },
  pricePrefix: {
    color: theme.white,
    fontSize: 12,
    lineHeight: 28,
    alignSelf: 'flex-end',
    textAlignVertical: 'bottom',
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
  },
  processingTimer: {
    paddingHorizontal: 3,
    minWidth: 22,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: theme.white,
    backgroundColor: '#706EF9',
  },
  processingTimerSeparator: {
    width: 11,
    color: '#9796FC',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  processingSeconds: {
    backgroundColor: '#8A6BFD',
  }
})