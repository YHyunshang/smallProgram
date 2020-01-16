/**
 * Created by 李华良 on 2019-09-29
 */
import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    backgroundColor: theme.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingLeft: 24,
    paddingRight: 15,
    borderBottomColor: '#EBEBEB',
  },
  title: {
    fontSize: 18,
    color: theme.black,
    fontWeight: '600',
    flex: 1,
  },
  more: {
    paddingLeft: 13,
    paddingRight: 3,
    fontSize: 13,
    color: '#BEBEBE',
  },
  iconArrowRight: {
    width: 10,
    height: 10,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#EBEBEB',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  productBox: {
    flexBasis: '50%',
    paddingVertical: 20,
    paddingLeft: 10,
    paddingRight: 15,
    borderColor: '#EBEBEB',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  productBoxInLastRow: {
    borderBottomWidth: 0,
  },
  productBoxInLastCol: {
    borderRightWidth: 0,
    paddingLeft: 15,
    paddingRight: 10,
  },
})
