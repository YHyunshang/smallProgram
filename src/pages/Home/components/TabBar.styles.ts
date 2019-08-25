import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {},
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
    paddingVertical: 10,
    paddingHorizontal: 14,
    position: 'relative',
  },
  tabBoxDivider: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 1,
    bottom: 10,
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
    top: 10,
    left: 14,
    transform: [{ scale: 1.14 }],
  },
  firstTabTextActiveScroll: {
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute',
    top: 10,
    left: 14,
    transform: [{ scale: 1.14 }],
    color: '#FF3914',
  },
  firstTabTextDeactiveScroll: {
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute',
    top: 10,
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
