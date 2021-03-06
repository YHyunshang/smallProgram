/**
 * Created by 李华良 on 2019-08-19
 */
import { StyleSheet } from 'react-native'
import GlobalTheme from '@theme'

export default theme =>
  StyleSheet.create({
    container: {},

    productBox: {
      position: 'relative',
    },

    thumbnailBox: {
      position: 'relative',
      overflow: 'hidden',
      marginBottom:
        {
          '2x': 5,
          '3x': 0,
        }[theme] || 5,
    },
    thumbnail: {
      '2x': { width: 155, height: 155 },
      '3x': { width: 105, height: 105 },
    }[theme],

    thumbnailPlaceholderBox: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    thumbnailPlaceholder: {},

    infoBox: {},

    name: {
      marginBottom: 2,
      color: GlobalTheme.black,
      fontSize:
        {
          '2x': 14,
          '3x': 13,
        }[theme] || 14,
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

    inventoryBox: {
      position: 'absolute',
      top: {
        '2x': 66.5,
        '3x': 41.5,
      }[theme],
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    inventoryLabelBg: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      borderRadius: 11,
      overflow: 'hidden',
    },

    inventoryLabel: {
      fontSize: 11,
      lineHeight: 22,
      paddingHorizontal: 10,
      color: '#FFF',
    },

    priceRow: {},
    currentPrice: {
      color: '#FA8500',
      fontFamily: GlobalTheme.priceFFPrimary,
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
      height: 13,
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
