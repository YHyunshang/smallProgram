/**
 * Created by 李华良 on 2019-12-13
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  section: {
    backgroundColor: theme.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  row: {
    flexDirection: 'row',
  },

  priceRow: {
    marginBottom: 5,
  },
  pricePrimaryBoxNormal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pricePrimaryNormal: {
    color: theme.orange,
    fontSize: 24,
    fontFamily: theme.priceFFPrimary,
  },
  pricePrimaryPrefixNormal: {
    fontSize: 18,
  },
  priceSlashedNormal: {
    fontSize: 12,
    color: theme.gray1,
    textDecorationLine: 'line-through',
  },

  tagRow: {
    marginBottom: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tagItem: {
    marginBottom: 3,
  },

  nameRow: {
    marginBottom: 10,
    fontSize: 18,
    color: '#4D4D4D',
    fontWeight: '600',
  },

  subTitleRow: {
    marginBottom: 13,
    fontSize: 14,
    color: '#666',
  },

  productPropertyRow: {
    flexDirection: 'row',
  },
  productPropertyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  productPropertyIcon: {
    width: 16,
    height: 16,
    marginRight: 3,
  },
  productPropertyText: {
    fontSize: 14,
    color: '#999',
  }
})