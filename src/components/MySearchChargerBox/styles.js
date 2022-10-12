import { StyleSheet } from 'react-native';
import { COLOR, SIZE } from '../../utils/Constants';

const styles = StyleSheet.create({
    searchChargerBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //width: '100%',
        marginLeft: -SIZE.APP_BODY_PADDING / 4,
        marginRight: -SIZE.APP_BODY_PADDING / 4,
    },
    searchChargerItem: {
        flex: 1,
        paddingHorizontal: SIZE.APP_BODY_PADDING / 4,
    },
    searchChargerItemContent:{
        flex: 1,
        backgroundColor: COLOR.BG_GRAY,
        borderRadius: 3,
        paddingHorizontal: SIZE.APP_BODY_PADDING / 2,
        paddingVertical: SIZE.APP_BODY_PADDING / 2,
        alignItems: 'center',
    },
    searchChargerItemContentActive:{
        backgroundColor: COLOR.APP,
    },
    searchChargerItemText:{
        color: COLOR.APP,
        textAlign: 'center',
    },
    searchChargerItemTextActive:{
        color: COLOR.WHITE,
    },
});

export default styles;