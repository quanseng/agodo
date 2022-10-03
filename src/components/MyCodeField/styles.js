import { StyleSheet } from 'react-native';
import { COLOR, SIZE } from '../../utils/Constants';

const styles = StyleSheet.create({
    codeFieldContainer:{
        display:'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.BG_GRAY,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 3,
    },
    codeFieldRoot: {
        paddingHorizontal: SIZE.APP_BODY_PADDING,
    },
    cell: {
        width: 48,
        height: 28,
        lineHeight: 32,
        fontSize: 32,
        // borderWidth: 2,
        // backgroundColor: '#00000030',
        textAlign: 'center',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"column",
        
    },
    focusCell: {
       // borderColor: '#000',
    },
    dotIcon:{
        fontSize: 50,
        lineHeight: 56,
        color: COLOR.FONT_LIGHT_GRAY
    },
    cursorFont:{
        fontSize: 28,
        lineHeight: 26,
    },
});

export default styles;
