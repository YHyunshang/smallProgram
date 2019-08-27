import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  scrollView: {
    flexDirection: 'row',
    position: 'relative',
    zIndex: 1,
  },
  background: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
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
    transform: [{ scale: 1.14 }],
  },
  firstTabTextActiveScroll: {
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute',
    left: 14,
    transform: [{ scale: 1.14 }],
    color: '#FF3914',
  },
  firstTabTextInactiveScroll: {
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute',
    left: 14,
    color: '#4D4D4D',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    borderRadius: 1,
    zIndex: 1,
  },
})
