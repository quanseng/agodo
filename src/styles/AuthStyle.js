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
    },
    idSideTabBarWrapper:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',      
    },
    idSideTabBarContainer:{
        paddingHorizontal: 6,
        paddingVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.BG_GRAY,
        borderRadius: 4,
        width: '100%',
        maxWidth: 240,
    },
    idSideTabItemContainer:{   
        flex: 1,   
    },
    idSideTabItem:{   
        flex: 1, 
        borderRadius: 4,
        paddingHorizontal: SIZE.APP_BODY_PADDING/3,
        paddingVertical: SIZE.APP_BODY_PADDING/3,
        backgroundColor: COLOR.TRANSPARENT,
    },
    idSideTabItemActive:{   
        backgroundColor: COLOR.APP,
    },
    idSideTabItemText:{
        textAlign: 'center',
        color: COLOR.APP,
        fontSize: 12
    },
    idSideTabItemTextActive:{
        color: COLOR.WHITE
    },
    paymentMethodListWrapper:{
       
    },
});


export default AuthStyle;
