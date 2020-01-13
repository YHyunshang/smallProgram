/**
 * Created by 李华良 on 2019-07-30
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    position: 'relative',
    flex: 1,
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: -50,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  sceneBox: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
})
