import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {},
  scrollView: {
    position: 'relative',
  },
  tabItemBox: {
    paddingHorizontal: 12,
  },
  tabItem: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 35.2941,
    height: 35.2941,
    textAlignVertical: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 2,
    zIndex: 1,
  },
})
