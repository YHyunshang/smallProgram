/**
 * Created by 李华良 on 2019-12-03
 */
import {StyleSheet} from "react-native";
import theme from "@theme";

export default StyleSheet.create({
  productBox: {
    alignItems: 'center',
    paddingHorizontal: 7.5,
    paddingTop: 10,
    paddingBottom: 15,
  },
  thumbnail: {
    width: 92,
    height: 92,
    marginBottom: 5,
  },
  name: {
    fontSize: 13,
    fontWeight: '400',
    color: theme.black,
    maxWidth: 92,
    height: 23,
    lineHeight: 23,
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#FA8500',
    fontWeight: '700',
  },
  pricePrefix: {
    fontSize: 12,
  },
})