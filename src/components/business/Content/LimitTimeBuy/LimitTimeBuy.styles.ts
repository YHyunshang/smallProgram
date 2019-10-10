/**
 * Created by 李华良 on 2019-09-29
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    backgroundColor: theme.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingLeft: 24,
    paddingRight: 15,
    borderBottomWidth: 0.25,
    borderBottomColor: '#EBEBEB',
  },
  title: {
    fontSize: 18,
    color: theme.black,
    fontWeight: '600',
    flex: 1,
  },
  more: {
    paddingLeft: 13,
    paddingRight: 3,
    fontSize: 13,
    color: '#BEBEBE',
  },
  iconArrowRight: {
    width: 10,
    height: 10,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productBox: {
    flexBasis: '50%',
    height: 110,
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderWidth: 0.25,
    borderColor: '#EBEBEB',
  }
})