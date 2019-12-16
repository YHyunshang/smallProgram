/**
 * Created by 李华良 on 2019-12-16
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {},

  titleBox: {
    height: 55,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.black,
  },

  content: {
    paddingHorizontal: 10,
  },

  productWrapper: {
    width: '50%',
  },
  productWrapperEvenCol: {
    paddingRight: 6,
  },
  productWrapperOddCol: {
    paddingLeft: 6,
  },
  productBox: {
    marginBottom: 11,
    padding: 10,
    backgroundColor: theme.white,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 11,
  },
})