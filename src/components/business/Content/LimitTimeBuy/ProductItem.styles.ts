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
    overflow: 'hidden',
  },
  waiting: {
    color: '#E74646',
    fontSize: 11,
    paddingRight: 5,
  },
  price: {
    color: '#E74646',
    fontSize: 18,
    textAlignVertical: 'bottom',
    fontFamily: theme.priceFFPrimary,
    paddingRight: 3,
  },
  pricePrefix: {
    fontSize: 11,
  },
  slashedPrice: {
    fontSize: 10,
    color: theme.slashedPrice,
    textDecorationLine: 'line-through',
    textAlignVertical: 'bottom',
    paddingBottom: 1.5,
  }
})