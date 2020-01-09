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

        floorSeparator: {
          height: 10,
        },

        rowFirst: {
          paddingTop: 10,
        },
        rowLast: {
          paddingBottom: 10,
        },

        col: {
          paddingHorizontal: 10,
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
        }
      },
      '3x': {
        container: {
          backgroundColor: '#FFF',
        },

        floorSeparator: {
          borderTopWidth: 0.5,
          borderTopColor: '#EEE'
        },

        rowFirst: {
          borderTopWidth: 0.5,
          borderTopColor: '#EEE',
        },
        rowLast: {
          borderBottomWidth: 0.5,
          borderBottomColor: '#EEE',
        },

        col: {
          borderLeftWidth: 0.25,
          borderLeftColor: '#EEE',
          borderRightWidth: 0.25,
          borderRightColor: '#EEE',
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