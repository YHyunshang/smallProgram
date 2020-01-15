/**
 * Created by 李华良 on 2019-08-21
 */
import { StyleSheet, Dimensions } from 'react-native'

const imgWidth = (Dimensions.get('window').width - 30 - 3) / 2
const imgHeight = (imgWidth * 155) / 171

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBoxL: {
    alignItems: 'flex-end',
    marginRight: 1.5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    overflow: 'hidden',
  },
  imgBoxR: {
    alignItems: 'flex-start',
    marginLeft: 1.5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
  },
  imgL: {
    width: imgWidth,
    height: imgHeight,
  },
  imgR: {
    width: imgWidth,
    height: imgHeight,
  },

  innerImgBox: {
    position: 'relative',
  },

  placeholderBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
  },
  placeholder: {
    width: 145,
    height: 40,
  },
})
