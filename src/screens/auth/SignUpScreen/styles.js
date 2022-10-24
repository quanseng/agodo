import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  flag:{
    width: SIZE.APP_ICON_SIZE,
    height: SIZE.APP_ICON_SIZE * 38 / 72     
  }, 
});

export default styles;