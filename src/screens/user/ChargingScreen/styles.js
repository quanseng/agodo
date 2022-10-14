import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  formContainer:{
    paddingHorizontal: SIZE.APP_BODY_PADDING,
    paddingVertical: SIZE.APP_BODY_PADDING * 0.5,
    justifyContent: 'space-between',
  },
  placeholderImage:{
    width: width - SIZE.APP_BODY_PADDING * 2,
    height: width - SIZE.APP_BODY_PADDING * 2,
    borderRadius: 4,
  },
  timeBg:{
    paddingHorizontal: SIZE.APP_BODY_PADDING * 2,
    paddingVertical: SIZE.APP_BODY_PADDING * 0.1,
    backgroundColor: COLOR.BG_GRAY,
    borderRadius: 2,
  },
  timeText:{
     
  },
});

export default styles;