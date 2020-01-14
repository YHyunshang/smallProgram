import { WindowWidth } from '@utils/Global'
import { StyleSheet } from 'react-native'

export default theme =>
  StyleSheet.create(
    {
      '2x': {
        container: {
          flexDirection: 'row',
        },

        floorSeparator: {
          height: 10,
        },

        colInFirstRow: {
          paddingTop: 10,
        },

        col: {
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 10,
        },
        colFirst: {
          paddingRight: 5,
        },
        colLast: {
          paddingLeft: 5,
        },

        productCell: {
          padding: 10,
          backgroundColor: '#FFF',
          borderRadius: 5,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 11,
          elevation: 2,
        },
        productCellNotLast: {
          // marginRight: 10,
        },
      },
      '3x': {
        container: {
          backgroundColor: '#FFF',
          flexDirection: 'row',
        },

        floorSeparator: {
          borderTopWidth: 0.5,
          borderTopColor: '#EEE',
        },

        colInFirstRow: {
          borderTopWidth: 0.5,
          borderTopColor: '#EEE',
          borderBottomWidth: 0,
        },

        col: {
          borderLeftWidth: 0.25,
          borderLeftColor: '#EEE',
          borderRightWidth: 0.25,
          borderRightColor: '#EEE',
          borderBottomWidth: 0.5,
          borderBottomColor: '#EEE',
        },
        colFirst: {
          borderLeftWidth: 0,
        },
        colLast: {
          borderRightWidth: 0,
        },

        productCell: {
          padding: 10,
          backgroundColor: '#FFF',
        },
      },
    }[theme]
  )
