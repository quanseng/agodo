import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  logoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: SIZE.APP_BODY_PADDING,
  },
  formContainer: {
    flex: 1,
    paddingVertical: SIZE.APP_BODY_PADDING,
    paddingHorizontal: SIZE.APP_BODY_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBox: {
    paddingVertical: SIZE.APP_BODY_PADDING,
    paddingHorizontal: SIZE.APP_BODY_PADDING,
    backgroundColor: COLOR.WHITE,
    borderRadius: 4,
    width: width - 2 * SIZE.APP_BODY_PADDING,
    alignItems: 'center',
    marginBottom: SIZE.APP_BODY_PADDING * 2,
  },
  earchIcon: {
    width: Math.min(width - 8 * SIZE.APP_BODY_PADDING, 160),
    height: Math.min(width - 8 * SIZE.APP_BODY_PADDING, 160),
  },
});

export default styles;
