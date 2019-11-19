/**
 * Created by 李华良 on 2019-10-08
 */
import {StyleSheet} from "react-native";
import {isiPhoneX} from "../../utils/native";
import theme from '@theme'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingLeft: 18,
    backgroundColor: theme.white,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    // shadowColor: '#000000',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
  },

  cartBox: {
    position: 'relative',
  },
  amountBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  navBox: {
    backgroundColor: theme.primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },

  iconCart: {
    width: 24,
    height: 24,
  },
  budgetBox: {
    position: 'absolute',
    backgroundColor: theme.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 1,
    top: -10,
    right: -10,
  },
  budget: {
    fontSize: 10,
    color: theme.white,
    textAlign: 'center',
  },
  amount: {
    fontSize: 18,
    lineHeight: 25,
    textAlignVertical: 'bottom',
    fontFamily: theme.priceFFPrimary,
    color: theme.orange,
  },
  amountPrefix: {
    fontSize: 14,
  },
  navText: {
    fontSize: 16,
    color: theme.white,
  }
})