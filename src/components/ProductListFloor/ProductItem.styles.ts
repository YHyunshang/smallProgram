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
    height: imgHeight,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  btmBox: {
    flexDirection: 'row',
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
  productTagBox: {
    width: 'auto',
    height: 20,
    borderRadius: 2,
  },
  productTag: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  btmBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  productPriceBox: {
    color: '#EE4239',
    fontSize: 16,
  },
  pricePrefix: {
    fontSize: 12,
    paddingRight: 3,
  },
  cartBtn: {
    borderRadius: 15,
  },
  cartIcon: {
    width: 36,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
    color: '#FFF',
  },
})