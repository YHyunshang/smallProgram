import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  filterBtn: {
    flex: 1,
  },
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 76,
    paddingVertical: 10,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 0.5,
    flex: 1,
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    lineHeight: 17,
  },
  filterTextActive: {
    color: theme.primary,
    fontWeight: '600',
  },
  filterImg: {
    width: 10,
    height: 8,
    marginLeft: 4,
  },
  sortImg: {
    width: 7,
    height: 11,
    marginLeft: 4,
  },
})
