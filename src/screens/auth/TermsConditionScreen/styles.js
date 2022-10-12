import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  termsWrapper:{
    paddingHorizontal: SIZE.APP_BODY_PADDING,
    paddingVertical : SIZE.APP_BODY_PADDING,
    backgroundColor: COLOR.BG_GRAY,
    borderRadius: 3,
  },
 
});

export default styles;