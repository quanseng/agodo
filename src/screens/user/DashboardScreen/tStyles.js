import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import { COLOR, SIZE } from '../../../utils/Constants';

const { width, height } = Dimensions.get("window");

const tStyles = StyleSheet.create({
  screenWrapper:{
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  mainContentWrapper:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
    borderRightWidth: 1,
    borderRightColor: COLOR.LIGHT_GRAY
  },
  headerBox: {
    display: 'flex',
    justifyContent: "center",
    flex: 1,
  },
  videoBox: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recommendedChallengeWrapper:{
    flex: 2
  },
  /// recommended challenge box
  recommendedChallengeBox:{
    backgroundColor: COLOR.WHITE
  },
  recommendedChallengeBoxDesc:{
    marginBottom: SIZE.APP_BODY_PADDING
  },
  recommendedChallengeItemList: {

  },
  recommendedChallengeItem: {
    display:'flex',
    flexDirection: 'row',
    marginBottom: SIZE.APP_BODY_PADDING * 0.5
  },
  recommendedChallengeThumbBox: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: SIZE.APP_BODY_PADDING/2,
    paddingTop: 6,
  },
  recommendedChallengeTextBox: {
    flex: 1,
  },
});

export default tStyles;