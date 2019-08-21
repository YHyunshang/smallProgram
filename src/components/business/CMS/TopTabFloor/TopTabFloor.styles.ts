/**
 * Created by 李华良 on 2019-07-23
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {},
  contentContainer: {
    alignItems: 'center',
    height: 40,
  },
  tab: {
    position: 'relative',
    alignItems: 'center',
  },
  tabText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  firstTab: {
    marginLeft: 10,
  },
  lastTab: {
    marginRight: 10,
  },
  activeTabText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: '#FFFFFF',
    opacity: 0.2948,
  },

  tabTextCollapsed: {
    color: '#333',
  },
  activeTabTextCollapsed: {
    color: '#D8433B',
  },
  activeTabFooter: {
    backgroundColor: '#FFB2AE',
    width: 26,
    bottom: 0,
    height: 5,
    borderRadius: 5,
  },
})
