/**
 * Created by 李华良 on 2019-09-29
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
  },
  detailBox: {
    paddingLeft: 15,
    flex: 1,
    height: 60,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 13,
    color: theme.black,
  },
  spec: {
    fontSize: 13,
    color: theme.gray1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  waiting: {
    color: '#E74646',
    fontSize: 11,
    paddingRight: 5,
  },
  price: {
    color: '#E74646',
    fontSize: 20,
    textAlignVertical: 'bottom',
    fontFamily: theme.priceFFPrimary,
    paddingRight: 5,
  },
  pricePrefix: {
    fontSize: 11,
  },
  slashedPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through'
  }
})