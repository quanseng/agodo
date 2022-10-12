import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  homeBody:{
    display: 'flex',
    flex: 1,
  },

});

export default styles;
