/**
 * Created by 李华良 on 2019-07-17
 */
import { StyleSheet } from 'react-native'

const StylesFor2Col = {
  container: {
    padding: 5,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    padding: 5,
    width: '50%',
  },
  productBox: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.06)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 11,
    elevation: 1,  // only for android
  },
}

const StylesFor3Col = {
  container: {},
  row: {
    flexDirection: 'row',
  },
  col: {
    padding: 10,
    width: '33.33%',
    borderWidth: 0.25,
    borderColor: '#F2F4F5',
  }
}

export default function getStyles(colNum: number = 2) {
  return StyleSheet.create({
    2: StylesFor2Col,
    3: StylesFor3Col,
  }[colNum] || {})
}