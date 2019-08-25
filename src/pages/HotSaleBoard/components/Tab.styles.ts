import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    padding: 3,
    position: 'relative',
    marginBottom: 10,
  },
  tabItemBox: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tabItem: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#fff',
    zIndex: 1,
  },
})
