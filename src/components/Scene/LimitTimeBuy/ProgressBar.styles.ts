/**
 * Created by 李华良 on 2019-09-30
 */
import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#FF9D8B',
  },

  filled: {
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFEEEB',
  },

  textBox: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 8,
    color: '#FF3914',
  },
})