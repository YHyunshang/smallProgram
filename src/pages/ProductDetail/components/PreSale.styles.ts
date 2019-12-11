/**
 * Created by 李华良 on 2019-11-26
 */
import {StyleSheet} from "react-native";
import theme from '@theme'

export default StyleSheet.create({
  section: {
    backgroundColor: theme.white,
    marginBottom: 10,
  },
  sectionLast: {
    marginBottom: 0,
  },

  h1: {
    fontSize: 18,
    lineHeight: 18 * 1.2,
    fontWeight: '600',
    color: '#4D4D4D',
    marginBottom: 6,
  },
  h2: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.black,
    lineHeight: 15 * 1.2,
    marginBottom: 13,
  },
  h5: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 14 * 1.2,
  },
  normalText: {
    fontSize: 14,
    color: '#8C8C8C',
  },
  ph15: {
    paddingHorizontal: 15,
  },

  mainInfoBox: {
    paddingVertical: 20,
  },

  detailBox: {
    paddingTop: 13,
  },

  preOrderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  preOrderCountBox: {
    flexShrink: 0,
    height: 16,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: '#B3B3B3',
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  preOrderCountText: {
    fontSize: 12,
    color: '#B3B3B3',
  },

  productPropertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPropertyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  productPropertyLastItem: {
    paddingRight: 0,
  },
  productPropertyIcon: {
    width: 16,
    height: 16,
    marginRight: 3
  },
  productPropertyText: {
    fontSize: 14,
    color: '#999999',
  },

  orderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  orderInfoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    overflow: 'hidden',
  },
  orderInfoItemSeparator: {
    flexShrink: 0,
    height: 50,
    width: 0.5,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 13,
  },
  orderInfoIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  orderInfoTextBox: {
    flex: 1,
    overflow: 'hidden'
  },
  orderInfoTitle: {
    fontSize: 14,
    color: '#666666'
  },
  orderInfoText: {
    fontSize: 12,
    color: '#666666'
  },
  orderAddOnInfoRow: {
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#EEEEEE',
  },
  orderAddOnText: {
    fontSize: 12,
    lineHeight: 12 * 1.2,
    color: '#B3B3B3',
  },

  detailInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailInfoTitle: {
    width: 90,
    fontSize: 13,
    lineHeight: 23,
    color: '#999999',
  },
  detailInfoText: {
    fontSize: 13,
    color: '#666666',
  },
})