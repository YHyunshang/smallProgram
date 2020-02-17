import { StyleSheet } from 'react-native'
import { isiOS } from '@utils/native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    position: 'relative',
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  floorBox: {
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    borderRadius: 10,
    overflow: 'hidden',
    ...(isiOS
      ? {
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 11,
        }
      : {}),
  },
})
