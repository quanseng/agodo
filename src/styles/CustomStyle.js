import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import { COLOR, SIZE, STATUSBAR_HEIGHT } from "../utils/Constants";
const { width, height } = Dimensions.get("window");

const CustomStyle = StyleSheet.create({
    screenContainer: {
        paddingTop: STATUSBAR_HEIGHT,
        flex: 1,
    },
    screenHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: SIZE.APP_BODY_PADDING,
        paddingVertical: SIZE.APP_BODY_PADDING,
        // backgroundColor: COLOR.BG_GRAY,
    },
    logoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: SIZE.APP_BODY_PADDING
    },
    logo: {
        width: width / 3,
        height: (width / 3) * 108 / 540
    },
    iconBackArrow: {
        width: SIZE.APP_ICON_SIZE * 1,
        height: SIZE.APP_ICON_SIZE * 1,
    },
    appBox: {
        paddingVertical: SIZE.APP_BODY_PADDING,
        paddingHorizontal: SIZE.APP_BODY_PADDING,
    },
    appBox1: {
        paddingVertical: SIZE.APP_BODY_PADDING * 0.7,
        paddingHorizontal: SIZE.APP_BODY_PADDING,
    },
    formControl: {
        marginBottom: SIZE.APP_BODY_PADDING / 2,
    },
    avatarWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: Math.min(width / 2, height * 0.275),
        height: Math.min(width / 2, height * 0.275),
        borderRadius: Math.min(width / 2, height * 0.275),
    },
    avatarSm: {
        width: 70,
        height: 70,
        borderRadius: 70,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: SIZE.APP_BODY_PADDING,
        paddingTop: SIZE.APP_BODY_PADDING,
        paddingBottom: SIZE.APP_BODY_PADDING / 2,
    },
    headerTitle: {
        fontSize: 18,
        color: COLOR.FONT_DARK,
        fontWeight: '600',
        fontFamily: 'Proxima'
    },
    body: {
        paddingLeft: SIZE.APP_BODY_PADDING,
        paddingRight: SIZE.APP_BODY_PADDING,
        paddingBottom: SIZE.APP_BODY_PADDING,
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLOR.APP,
        paddingTop: 44
    },
    navTitle: {
        marginLeft: 16,
        fontSize: 18,
        color: 'white',
    },
    radioBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioInlineList: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        //width: '100%',
        justifyContent: 'space-between',
        paddingVertical: SIZE.APP_BODY_PADDING / 2,
        paddingHorizontal: SIZE.APP_BODY_PADDING / 2,
        marginLeft: -SIZE.APP_BODY_PADDING / 2,
        marginRight: -SIZE.APP_BODY_PADDING / 2,
        //backgroundColor: COLOR.BLACK,
    },
    searchText: {
        borderRadius: 20,
        backgroundColor: COLOR.BG_GRAY,
        color: COLOR.APP,
        textAlign: 'center',
    },
    hr: {
        width: '100%',
        height: 4,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        marginTop: 2,
        borderRadius: 3,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapSearchButton: {
        position: 'absolute',
        bottom: 20,
        right: 12,
        backgroundColor: COLOR.WHITE,
        width: 60,
        height: 60,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapSearchIcon: {
        width: SIZE.APP_ICON_SIZE,
        height: SIZE.APP_ICON_SIZE,
    },
    buttonPrimary: {
        borderColor: COLOR.APP,
        borderRadius: SIZE.BUTTON_RADIUS,
        minWidth: SIZE.BUTTON_MIN_SIZE,
    },

});

export default CustomStyle;
