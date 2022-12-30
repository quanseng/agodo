import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  homeBody: {
    display: 'flex',
    flex: 1,
  },
  searchBtnBox: {
    marginTop: SIZE.APP_BODY_PADDING / 2,
    width: '100%',
    
  },
  searchingPlaceBox: {
    height: 110,
    backgroundColor: COLOR.BG_GRAY,
    justifyContent: 'center'
  },



});

export default styles;
