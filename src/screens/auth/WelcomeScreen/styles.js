import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const mStyles = StyleSheet.create({
  welcomeScreen: {
    flex: 1,
    paddingVertical: SIZE.APP_BODY_PADDING,
    paddingHorizontal: SIZE.APP_BODY_PADDING,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarOverlayer : {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.TRANSPARENT,
  },
  welcomeText:{
    fontSize: 40,
    lineHeight: 50,
    fontWeight: '700',
    textTransform:'uppercase'
  },
    
  footerWapper:{
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around'
  },
});

export default mStyles;
