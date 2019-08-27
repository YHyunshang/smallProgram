/**
 * Created by 李华良 on 2019-08-22
 */
import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

export default theme =>
  StyleSheet.create(
    {
      '2x': {
        container: {},
        row: {
          paddingHorizontal: 5,
          flexDirection: 'row',
        },
        rowNotLast: {
          marginBottom: 10,
        },
        column: {
          width: (windowWidth - 5 * 2) / 2,
          paddingHorizontal: 5,
        },
        productBox: {
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 5,
          paddingHorizontal: 10,
          paddingTop: 8,
          paddingBottom: 12,
          overflow: 'hidden',
          shadowColor: 'rgba(0,0,0,0.06)',
          shadowRadius: 11,
        },
      },
      '3x': {
        container: {
          backgroundColor: '#FFF',
        },
        row: {
          flexDirection: 'row',
        },
        rowNotLast: {
          borderBottomWidth: 0.5,
          borderBottomColor: '#EEEEEE',
        },
        column: {
          padding: 10,
          width: windowWidth / 3,
        },
        columnNotLast: {
          borderRightWidth: 0.5,
          borderRightColor: '#EEEEEE',
        },
        productBox: {},
      },
    }[theme]
  )
