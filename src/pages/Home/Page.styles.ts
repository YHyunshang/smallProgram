/**
 * Created by 李华良 on 2019-07-30
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    // backgroundColor: '#D33A34',
    position: 'relative',
    flex: 1,
  },

  tabBarContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  tabBar: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },

  sceneBox: {},
})
