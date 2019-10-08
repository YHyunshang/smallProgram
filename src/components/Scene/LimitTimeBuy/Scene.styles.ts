/**
 * Created by 李华良 on 2019-10-07
 */
import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBox: {
    paddingBottom: 5,
    backgroundColor: '#FFF'
  },
  timerBox: {
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#FFF',
    paddingBottom: 5,
  },
  timerBoxDivider: {
    marginHorizontal: 8,
    height: 1,
    backgroundColor: '#EEEEEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  productList: {
    flex: 1,
  },
  productListItem: {
    position: 'relative',
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
  },
  productDivider: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#EEEEEE',
    top: 0,
    left: 100,
    right: 15,
  }
})