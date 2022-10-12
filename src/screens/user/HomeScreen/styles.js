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
    paddingTop: SIZE.APP_BODY_PADDING,
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
  idSideTabBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  idSideTabBarContainer: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BG_GRAY,
    borderRadius: 20,
    width: '100%',
    maxWidth: 240,
  },
  idSideTabItemContainer: {
    flex: 1,
  },
  idSideTabItem: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: SIZE.APP_BODY_PADDING / 3,
    paddingVertical: SIZE.APP_BODY_PADDING / 3,
    backgroundColor: COLOR.TRANSPARENT,
  },
  idSideTabItemActive: {
    backgroundColor: COLOR.APP,
  },
  idSideTabItemText: {
    textAlign: 'center',
    color: COLOR.APP,
    fontSize: 12
  },
  idSideTabItemTextActive: {
    color: COLOR.WHITE
  },
});

export default styles;
