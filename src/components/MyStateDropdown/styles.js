import { StyleSheet } from 'react-native';
import { COLOR, SIZE } from '../../utils/Constants';

const styles = StyleSheet.create({
    flag: {
        width: SIZE.APP_ICON_SIZE,
        height: SIZE.APP_ICON_SIZE * 38 / 72
    },
    dropdown3BtnStyle: {
        width: '100%',
        height: 56,
        backgroundColor: COLOR.BG_GRAY,
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: COLOR.BG_GRAY,
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    dropdown3BtnChildLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover' },
    dropdown3BtnTxt: {
        color: COLOR.APP,
        textAlign: 'left',
        marginHorizontal: 16,
        fontSize: 16,
    },
    dropdown3BtnPlaceholderTxt: {
        color: COLOR.FONT_GRAY,
        textAlign: 'left',
        marginHorizontal: 16,
        fontSize: 16,
    },
    dropdown3BtnDownIcon: {
        color: COLOR.FONT_GRAY,
    },
    dropdown3DropdownStyle: {
        backgroundColor: COLOR.BG_GRAY,
    },
    dropdown3RowStyle: {
        backgroundColor: COLOR.BG_GRAY,
        borderBottomColor: COLOR.GRAY,
        height: 50,
    },
    dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover' },
    dropdown3RowTxt: {
        color: COLOR.FONT_GRAY,
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 16,
    },
});

export default styles;