import { StyleSheet, Dimensions } from 'react-native';
import { COLOR, IMAGE_RATIO_16X9, SIZE } from '../../utils/Constants';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  uploadBoxContainer: {
  
  },
  uploadPlaceholderBox:{
    paddingHorizontal: SIZE.APP_BODY_PADDING,
    paddingVertical: SIZE.APP_BODY_PADDING,
    backgroundColor: COLOR.BG_GRAY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadContentBox:{
    position: 'relative',
    backgroundColor: COLOR.BG_GRAY,
  },
  image:{
    width: width - SIZE.APP_BODY_PADDING * 2,
    height: (width - SIZE.APP_BODY_PADDING * 2) * IMAGE_RATIO_16X9
  },
  uploadActionBox:{
    position: 'absolute',
    right: SIZE.APP_BODY_PADDING/3,
    top: SIZE.APP_BODY_PADDING/3,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  deleteIcon:{
    tintColor: COLOR.WHITE,
    width: SIZE.APP_ICON_SIZE,
    height: SIZE.APP_ICON_SIZE,
  },
});

export default styles;