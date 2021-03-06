import { StyleSheet } from 'react-native'
import theme from '@theme'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 11,
    elevation: 0.8,
  },
  tabItemBox: {
    padding: 18,
  },
  tabItemBoxFirst: {
    marginLeft: 4,
  },
  tabItemBoxLast: {
    marginRight: 4,
  },
  tabLabel: {
    fontSize: 14,
    color: '#4D4D4D',
    fontWeight: '400',
  },
  tabLabelActive: {
    color: theme.primary,
  },
})
