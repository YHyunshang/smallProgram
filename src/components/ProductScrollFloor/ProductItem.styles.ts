/**
 * Created by 李华良 on 2019-07-18
 */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
  },
  productImgBox: {
    marginBottom: 5,
    position: 'relative',
  },
  productDetailBox: {
  },
  productTagBox: {
    borderRadius: 2,
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  productTag: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: '400',
    lineHeight: 15,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  productName: {
    lineHeight: 18,
    fontSize: 13,
    color: '#555',
  },
  productDesc: {
    color: '#999',
    fontSize: 12,
    lineHeight: 17,
    height: 17,
    marginBottom: 2,
  },
  btmBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  slashedPrice: {
    lineHeight: 18,
    height: 18,
    color: '#999',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  productPrice: {
    color: '#EE4239',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
  },
  pricePrefix: {
    fontSize: 12,
    fontWeight: '400',
  },
  cartBtn: {
    borderRadius: 24,
    backgroundColor: '#EE4239',
    shadowColor: "rgba(238,66,57,0.23)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5,  // only for android
  },
  cartIcon: {
    width: 24,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFF',
  },
})