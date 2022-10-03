import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { COLOR, SIZE } from "../../../utils/Constants";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  userTypeBox:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',    
    marginBottom: SIZE.APP_BODY_PADDING,
  },
  userTypeItem:{
    flex: 1,
    backgroundColor: COLOR.BG_GRAY,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZE.APP_BODY_PADDING,
  },
  userTypeIcon:{
    width: 0.5 * (width - SIZE.APP_BODY_PADDING * 3) / 2,
    height: 0.5 * (width - SIZE.APP_BODY_PADDING * 3) / 2
  },
  userTypeText:{
    color: COLOR.APP
  },
  userTypeItemActive:{
    backgroundColor: COLOR.APP,
  },
  userTypeIconActive:{
    tintColor: COLOR.WHITE
  },
  userTypeTextActive:{
    color: COLOR.WHITE
  },
  userTypeDescBox:{
    marginTop: SIZE.APP_BODY_PADDING * 0.5,
  },
  userTypeDescImage:{
    width: width - SIZE.APP_BODY_PADDING * 2,
    height: (width - SIZE.APP_BODY_PADDING * 2) * 430 / 694,
    marginBottom: SIZE.APP_BODY_PADDING * 0.5,
  },
});

export default styles;