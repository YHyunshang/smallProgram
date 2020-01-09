import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  whiteBackground: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  grayBackground: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tabBox: {
    paddingHorizontal: 14,
    position: 'relative',
    alignItems: 'center',
  },
  tabBoxDivider: {
    position: 'absolute',
    top: '50%',
    right: 0,
    width: 1,
    height: 14,
    transform: [{ translateY: -7 }],
    backgroundColor: '#FFF',
    opacity: 0.2948,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute',
    left: 14,
    // transform: [{ scale: 1.14 }],
  },
  firstTabTextActiveScroll: {
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute',
    left: 14,
    transform: [{ scale: 1.14 }],
    color: theme.primary,
  },
  firstTabTextInactiveScroll: {
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute',
    left: 14,
    color: '#000',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    borderRadius: 1,
    zIndex: 1,
  },
})
