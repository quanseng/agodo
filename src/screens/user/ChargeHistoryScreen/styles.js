import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  homeBody:{
    paddingHorizontal: SIZE.APP_BODY_PADDING,
    paddingVertical: SIZE.APP_BODY_PADDING/2,
  },
  historyRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: SIZE.APP_BODY_PADDING/2,
  },
  chargeAvatarBox:{
    backgroundColor: COLOR.GRAY,
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chargeAvatar:{
    width: 30,
    height: 30,
  },

});

export default styles;
