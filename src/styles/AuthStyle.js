import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import { COLOR, SIZE, STATUSBAR_HEIGHT } from "../utils/Constants";
const { width, height } = Dimensions.get("window");

const AuthStyle = StyleSheet.create({
    signupScreen: {
        flex: 1,
        paddingTop: SIZE.APP_BODY_PADDING * 0.5,
    },
    authFormContainer:{
        paddingHorizontal: SIZE.APP_BODY_PADDING,
        paddingVertical: SIZE.APP_BODY_PADDING * 0.5,
    },
    authFormWrapper: {
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: SIZE.APP_BODY_PADDING * 0.5,
    },
    authFormHeader: {

    },
    authFormBody: {
        marginTop: SIZE.APP_BODY_PADDING * 1,
    },
    authFormFooter:{

    },
    regStepBarContainer:{
        paddingTop: SIZE.APP_BODY_PADDING,
        paddingHorizontal: SIZE.APP_BODY_PADDING,
        //backgroundColor: 'red'
    }
});

export default AuthStyle;
