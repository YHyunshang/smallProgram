/**
 * Created by 李华良 on 2019-07-16
 */
import { StyleSheet } from 'react-native'

const imgHeight = 75

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  productImgBox: {
    paddingRight: 15,
  },
  productDetailBox: {
    flex: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  btmBox: {
    position: 'relative',
  },
  productImg: {
    width: imgHeight,
    height: imgHeight,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  productDesc: {
    color: '#999',
    fontSize: 12,
    lineHeight: 17,
    height: 17,
    marginBottom: 2,
  },
  productTagBox: {
    alignSelf: 'flex-start',
    height: 15,
    borderRadius: 2,
    marginBottom: 2,
  },
  productTag: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: '400',
    lineHeight: 15,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  priceBox: {
    flexDirection: 'row',
  },
  productPrice: {
    color: '#EE4239',
    fontSize: 16,
    lineHeight: 18,
    marginRight: 5,
  },
  pricePrefix: {
    fontSize: 12,
    paddingRight: 3,
  },
  slashedPrice: {
    lineHeight: 18,
    height: 18,
    color: '#999',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  cartBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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