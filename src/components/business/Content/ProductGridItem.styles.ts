/**
 * Created by 李华良 on 2019-08-19
 */
import { StyleSheet } from 'react-native'

export default theme =>
  StyleSheet.create({
    container: {},

    productBox: {
      position: 'relative',
    },

    thumbnailBox: {
      position: 'relative',
      marginBottom:
        {
          '2x': 5,
          '3x': 0,
        }[theme] || 5,
    },
    thumbnail: {},

    infoBox: {},

    name: {
      fontSize:
        {
          '2x': 14,
          '3x': 13,
        }[theme] || 14,
      fontWeight: '700',
      marginBottom: 2,
      height:
        {
          '2x': 24,
          '3x': 23,
        }[theme] || 24,
    },

    tagRow: {
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    tag: {
      fontSize: 10,
      fontWeight: '400',
      lineHeight: 14,
      paddingHorizontal: 5,
      color: '#FF3914',
      backgroundColor: 'rgba(255,222,217,1)',
      borderRadius: 1,
      marginRight: 5,
    },
    spec: {
      fontSize: 10,
      fontWeight: '400',
      lineHeight: 14,
      paddingHorizontal: 3,
      color: '#6D7278',
      backgroundColor: 'rgba(245,245,245,1)',
      borderRadius: 1,
      marginRight: 5,
    },

    priceRow: {},
    currentPrice: {
      color: '#FA8500',
      fontWeight: '600',
      fontSize: 18,
    },
    slashedPrice: {
      color: '#B3B3B3',
      fontWeight: '400',
      fontSize:
        {
          '2x': 12,
          '3x': 11,
        }[theme] || 12,
      height: 12,
      textDecorationLine: 'line-through',
      marginBottom: 4,
    },
    pricePrefix: {
      fontSize: 12,
    },

    cartBox: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
  })
