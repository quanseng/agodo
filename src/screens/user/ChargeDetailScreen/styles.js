import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    paddingVertical: SIZE.APP_BODY_PADDING,
    paddingHorizontal: SIZE.APP_BODY_PADDING,
  },
  avatarOverlayer: {
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
  welcomeTextWrapper: {
    marginTop: SIZE.APP_BODY_PADDING / 3,
  },
  homeHeader: {
    paddingVertical: SIZE.APP_BODY_PADDING,
    paddingHorizontal: SIZE.APP_BODY_PADDING,
  },
  homeBody: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLOR.WHITE,
    borderTopLeftRadius: SIZE.APP_BODY_PADDING * 4,
  },
  homeContent: {
    paddingHorizontal: SIZE.APP_BODY_PADDING,
    paddingVertical: SIZE.APP_BODY_PADDING / 2,
  },
  paymentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chargeAvatarBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: SIZE.APP_BODY_PADDING/3,
  },
  chargeNameBox: {
    flex: 1,
    paddingRight: SIZE.APP_BODY_PADDING,
  },

});

export default styles;
