import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 76,
    paddingVertical: 10,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    lineHeight: 17,
  },
  filterTextActive: {
    color: '#FF3914',
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
