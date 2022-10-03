import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../utils/Constants";
const { width, height } = Dimensions.get("window");

const mStyles = StyleSheet.create({
  introScreen: {
    flex: 1,
    paddingTop: SIZE.APP_BODY_PADDING,
  },
  sliderContainer: {
    flex: 1,
  },
  slideItem:{
    flex: 1,
  },
  slideImageWrapper:{
    width: '100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'flex-end',
  },
  slideImage: {
    width: width - SIZE.APP_BODY_PADDING,
    height: (width - SIZE.APP_BODY_PADDING) * 1812 / 1536,
    maxHeight: height/2
  },
  slideTextWrapper:{
    width: '100%',
    display:'flex',
    alignItems:"center",
    marginTop:SIZE.APP_BODY_PADDING
  },
  slidePrimaryTextWrapper:{
    marginBottom:SIZE.APP_BODY_PADDING
  },
  slideSecondaryTextWrapper:{
    marginBottom:SIZE.APP_BODY_PADDING * 2
  },
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 1)',     
  },

});

export default mStyles;